import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const RestaurantOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "") {
      if (element.nextElementSibling) {
        (element.nextElementSibling as HTMLInputElement).focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically verify the OTP
    // For now, we'll just navigate to pricing
    navigate("/pricing");
  };

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
            alt="OTP Verification"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-medium text-main-darkPurple/70 mb-2">
            OTP Verification Code
          </h1>
          <p className="text-gray-600 text-sm">
            We have sent OTP code verification to your email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-main-darkPurple/70 text-white py-2 px-4 rounded-md hover:bg-main-darkPurple transition-colors duration-200"
          >
            Submit
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/auth/signin/restaurant"
            className="text-purple-600 hover:text-purple-700 text-sm"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantOTP;
