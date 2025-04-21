/**
 * Sanitizes an SVG string to prevent potential security vulnerabilities.
 *
 * This function performs several sanitization steps:
 * 1. HTML Entity Encoding: Replaces &, <, and > with their HTML entity equivalents.
 * 2. Remove Comments: Removes all HTML comments from the SVG string.
 * 3. Remove or Escape Unsafe Attributes: Removes attributes like onload, onerror, onclick, and other event handlers. Also removes <script> tags.
 * 4. CSS Sanitization: Neutralizes potentially harmful CSS expressions and URLs.
 *
 * @param svgString - The SVG string to sanitize.
 * @returns The sanitized SVG string.
 */
export function sanitizeSVG(svgString: string) {
  // 1.  HTML Entity Encoding (Basic)
  svgString = svgString
    ?.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Remove Comments (More robust)
  svgString = svgString?.replace(/<!--[\s\S]*?-->/g, "");

  // 3. Remove or Escape Unsafe Attributes (Example: script)
  svgString = svgString?.replace(
    /<[^>]*\s(onload|onerror|onclick|on\w+)\s*=\s*['"][^'"]*['"][^>]*>/gi,
    ""
  );
  svgString = svgString?.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

  // 4.  CSS Sanitization (basic - more complex would need CSS parser)
  svgString = svgString?.replace(/style="[^"]*"/gi, (match) => {
    let sanitizedStyle = match.replace(/expression\s*:/gi, "SAFE_EXPRESSION:"); // try to neutralize expressions
    sanitizedStyle = sanitizedStyle.replace(/url\s*\(/gi, "SAFE_URL(");
    return sanitizedStyle;
  });

  return svgString;
}

/**
 * Decodes an SVG string, replacing HTML entities and UTF-8 character codes with their corresponding characters.
 *
 * @param svgString - The SVG string to decode.
 * @returns The decoded SVG string.
 */
export function decodeSVG(svgString: string) {
  // Use a regular expression to find HTML entities and UTF-8 character codes
  return svgString
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (match, numStr) => {
      const num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
}
