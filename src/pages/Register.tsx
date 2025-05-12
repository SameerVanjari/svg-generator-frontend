import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/authContext";

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = (e.target as HTMLFormElement).username.value;
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;

    try {
      const result = await register(email, password, username);
      if (result.success) {
        navigate("/dashboard");
      } else {
        alert(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const redirectToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="flex flex-col">
          <Label htmlFor="username" className="text-sm font-medium">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            name="username"
            required
            placeholder="Ram Sundaram"
            className="mt-1 placeholder:text-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            placeholder="ramsundaram@gmail.com"
            className="mt-1 placeholder:text-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            name="password"
            required
            placeholder="********"
            className="mt-1 placeholder:text-gray-400"
          />
        </div>
        <Button
          type="submit"
          className="w-full px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-lg hover:opacity-90 transition-all transform hover:scale-105"
        >
          Register
        </Button>
      </form>
      <Button
        variant="link"
        onClick={redirectToLogin}
        className="w-full mt-4 text-pink-500 hover:underline"
      >
        Already have an account? Login
      </Button>
    </div>
  );
};

export default Register;
