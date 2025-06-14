import { useState } from "react";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const basicPrice = 39999;
  const proPrice = 79999;
  const yearlyDiscount = 0.2; // 20% discount for yearly plans

  const calculateYearlyPrice = (monthlyPrice: number) => {
    const yearlyPrice = monthlyPrice * 12;
    const discountedPrice = yearlyPrice * (1 - yearlyDiscount);
    return Math.round(discountedPrice);
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
      <div className="relative z-10 w-full max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-main-darkPurple mb-4">
            Find Your Perfect Plan
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the ideal plan to fuel your business growth. Our pricing
            options are carefully crafted to cater to businesses.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center mb-12">
          <div className="bg-purple-50 p-1 rounded-full flex items-center">
            <button
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly billing
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-3 ${
                billingCycle === "yearly"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Annual billing
              {billingCycle === "yearly" && (
                <span className="bg-purple-200 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">
                  Save 20%
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-100 rounded-xl">
                <div className="w-8 h-8 bg-purple-600 rounded-lg" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Basic</h3>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet dolori sitae consecteur adipiscing
              elit.
            </p>
            <div className="mb-8">
              <span className="text-4xl font-bold">
                ₦
                {billingCycle === "monthly"
                  ? basicPrice.toLocaleString()
                  : calculateYearlyPrice(basicPrice).toLocaleString()}
              </span>
              <span className="text-gray-500">/{billingCycle}</span>
              {billingCycle === "yearly" && (
                <div className="text-green-600 text-sm mt-2">
                  Save 20% with yearly billing
                </div>
              )}
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>All analytics features</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Up to 250,000 tracked visits</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Normal support</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Up to 3 team members</span>
              </div>
            </div>
            <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Get started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-purple-600 rounded-2xl p-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-6 right-6 bg-white/20 px-3 py-1 rounded-full text-white text-sm">
              Popular
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-xl">
                <div className="w-8 h-8 bg-white rounded-lg" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Pro</h3>
              </div>
            </div>
            <p className="text-white/80 mb-6">
              Lorem ipsum dolor sit amet dolori sitae consecteur adipiscing
              elit.
            </p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">
                ₦
                {billingCycle === "monthly"
                  ? proPrice.toLocaleString()
                  : calculateYearlyPrice(proPrice).toLocaleString()}
              </span>
              <span className="text-white/80">/{billingCycle}</span>
              {billingCycle === "yearly" && (
                <div className="text-white/90 text-sm mt-2">
                  Save 20% with yearly billing
                </div>
              )}
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>All analytics features</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Up to 1,000,000 tracked visits</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Premium support</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Up to 10 team members</span>
              </div>
            </div>
            <button className="w-full py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-colors">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
