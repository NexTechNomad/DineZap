import { Link } from "react-router-dom";

const GetStarted = () => {
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
            alt="Join Us"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-medium text-main-darkPurple/70 mb-2">
            Get Started As
          </h1>
          <p className="text-gray-500">
            To begin this journey, tell us what type of account you'd be
            opening.
          </p>
        </div>

        <div className="space-y-4">
          <button
            className="w-full p-4 border-2 border-purple-100 rounded-lg hover:border-purple-500 transition-colors duration-200 flex items-center space-x-4 group"
            onClick={() => (window.location.href = "/auth/signup/individual")}
          >
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-500 transition-colors duration-200">
              <svg
                className="w-6 h-6 text-purple-500 group-hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Individual</h3>
              <p className="text-sm text-gray-500">
                Personal account to manage all you activities.
              </p>
            </div>
          </button>

          <button
            className="w-full p-4 border-2 border-purple-100 rounded-lg hover:border-purple-500 transition-colors duration-200 flex items-center space-x-4 group"
            onClick={() => (window.location.href = "/auth/signup/restaurant")}
          >
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-500 transition-colors duration-200">
              <svg
                className="w-6 h-6 text-purple-500 group-hover:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Restaurant</h3>
              <p className="text-sm text-gray-500">
                Own or belong to a company, this is for you.
              </p>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to="/auth/login/restaurant"
            className="text-purple-600 hover:text-purple-700 font-semibold ml-1"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
