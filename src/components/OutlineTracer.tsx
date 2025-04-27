// OutlineTracer.tsx
import React, { useEffect, useRef, useState } from "react";
import potrace from "potrace";
import cv from "@techstark/opencv-js"; // installed via npm i opencv-js

interface OutlineTracerProps {
  url: string | null;
}

const OutlineTracer: React.FC<OutlineTracerProps> = ({ url }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [svg, setSvg] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [cvReady, setCvReady] = useState<boolean>(false);

  //   const handleTraceImage = async () => {
  //     if (!imageUrl || !cvReady) {
  //       alert("OpenCV or Potrace not ready yet.");
  //       return;
  //     }

  //     const img = new Image();
  //     img.crossOrigin = "anonymous"; // allow cross-origin images
  //     img.src = imageUrl;

  //     img.onload = async () => {
  //       const canvas = canvasRef.current!;
  //       const ctx = canvas.getContext("2d")!;
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       ctx.drawImage(img, 0, 0);

  //       const src = cv.imread(canvas); // load image into OpenCV Mat
  //       const gray = new cv.Mat();
  //       const edges = new cv.Mat();

  //       cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0); // convert to grayscale
  //       cv.Canny(gray, edges, 50, 150); // edge detection (threshold1, threshold2)

  //       cv.imshow(canvas, edges); // visualize edges

  //       // Create a Blob from the canvas edges
  //       const dataUrl = canvas.toDataURL("image/png");
  //       const response = await fetch(dataUrl);
  //       const blob = await response.blob();
  //       const buffer = await blob.arrayBuffer();

  //       // Trace edges into SVG
  //       const tracedSvg = potrace.trace(dataUrl, function (err, svg) {
  //         if (err) throw err;
  //         // fs.writeFileSync('./output.svg', svg);
  //         console.log("SVG output:", svg);
  //         return svg;
  //       });
  //       //   setSvg(tracedSvg);
  //       console.log("Traced SVG output:", tracedSvg);

  //       // Cleanup
  //       src.delete();
  //       gray.delete();
  //       edges.delete();
  //     };

  //     img.onerror = () => {
  //       alert("Failed to load image. Check the URL and CORS settings.");
  //     };
  //   };

  const handleTraceImage = async () => {
    setProcessing(true);
    if (!imageUrl || !cvReady) {
      alert("OpenCV or Potrace not ready yet.");
      return;
    }

    try {
      // 1. Fetch the image via your proxy
      const proxyUrl = `${
        import.meta.env.VITE_API_URL
      }/proxy?url=${encodeURIComponent(imageUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Failed to fetch image from proxy.");

      const blob = await response.blob();
      const imgBitmap = await createImageBitmap(blob);

      // 2. Draw image on canvas
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = imgBitmap.width;
      canvas.height = imgBitmap.height;
      ctx.drawImage(imgBitmap, 0, 0);

      // 3. Read image into OpenCV
      const src = cv.imread(canvas); // original image
      const gray = new cv.Mat(); // grayscale version
      const binary = new cv.Mat(); // final binary version (after threshold + invert)

      // Step 1: Convert to Grayscale
      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

      // Step 2: Threshold to black/white
      cv.threshold(gray, binary, 127, 255, cv.THRESH_BINARY);

      // Step 3: Invert black ↔️ white (because your lines are originally white)
      cv.bitwise_not(binary, binary);

      // Step 4: Draw it back to canvas
      cv.imshow(canvas, binary);

      // 6. Convert edges canvas to DataURL
      const dataUrl = canvas.toDataURL("image/png");

      // 7. Use Potrace to trace and generate SVG
      potrace.trace(
        dataUrl,
        { background: "transparent", color: "black" },
        (err, svg) => {
          if (err) {
            console.error(err);
            alert("Tracing failed.");
            return;
          }
          console.log("Generated SVG:", svg);

          // Here you can either:
          // - set it to state to show in UI
          // - or create a download link
          const blob = new Blob([svg], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = "traced.svg";
          link.click();

          URL.revokeObjectURL(url);
        }
      );

      // Cleanup OpenCV Mats
      src.delete();
      gray.delete();
      binary.delete();
      setProcessing(false);
    } catch (err) {
      console.error(err);
      alert("Error occurred during tracing: " + err);
    }
  };

  const handleDownloadSVG = () => {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "outline.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // OpenCV loads asynchronously, we wait
    if (!!cv.getBuildInformation) {
      setCvReady(true);
    } else {
      cv["onRuntimeInitialized"] = () => {
        setCvReady(true);
      };
    }
  }, []);

  useEffect(() => {
    if (url && url !== imageUrl) {
      setImageUrl(url);
    }
  }, [url]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        disabled={true}
        onChange={(e) => setImageUrl(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleTraceImage}
        disabled={!cvReady}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {cvReady ? "Trace Image" : processing ? "Processing..." : "Loading..."}
      </button>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {svg && (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">SVG Outline Preview:</h2>
          <div
            dangerouslySetInnerHTML={{ __html: svg }}
            className="border p-2 bg-gray-100"
          />
          <button
            onClick={handleDownloadSVG}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Download SVG
          </button>
        </div>
      )}
    </div>
  );
};

export default OutlineTracer;
