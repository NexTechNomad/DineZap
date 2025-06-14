import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const IndividualSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/auth-bg/auth-bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-xl px-6 py-12 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <img
            src="/logos/logo.png"
            alt="Sign up Restaurant"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-medium text-main-darkPurple/70 mb-2">
            Log In
          </h1>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="contact@pizzapalaceabuja.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 mt-1 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-main-darkPurple/70 text-white py-2 px-4 rounded-md hover:bg-main-darkPurple transition-colors duration-200"
          >
            Log In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            to="/auth/signup/individual"
            className="text-purple-600 hover:text-purple-700 font-semibold ml-1"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndividualSignIn;
