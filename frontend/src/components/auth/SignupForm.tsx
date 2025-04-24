
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const SignupForm = () => {
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validation for password fields
    if (name === "password" || name === "confirmPassword") {
      validatePasswords(name, value);
    }
  };

  const validatePasswords = (fieldName: string, value: string) => {
    if (fieldName === "password") {
      setErrors((prev) => ({
        ...prev,
        password: value.length < 8 ? "Password must be at least 8 characters" : "",
      }));
    } else if (fieldName === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value !== formData.password ? "Passwords do not match" : "",
      }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreeTerms: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    if (errors.password || errors.confirmPassword) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password);
      // Auth context will handle redirect and success message
    } catch (error) {
      // Auth context will handle error message
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Developer Name"
          required
          className="input-field"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="developer@gmail.com"
          required
          className="input-field"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className={`input-field ${errors.password ? "border-red-500" : ""}`}
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
          className={`input-field ${errors.confirmPassword ? "border-red-500" : ""}`}
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="agree-terms"
          checked={formData.agreeTerms}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="agree-terms" className="text-sm font-medium leading-none cursor-pointer">
          I agree to the{" "}
          <Link to="/terms" className="text-devblue-600 hover:text-devblue-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-devblue-600 hover:text-devblue-700">
            Privacy Policy
          </Link>
        </Label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full btn-primary" 
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
      
      <div className="text-center text-sm">
        <p className="text-devgray-600 dark:text-devgray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-devblue-600 hover:text-devblue-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
