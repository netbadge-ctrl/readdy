import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GradientPanel from "./components/GradientPanel";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="flex h-screen w-full bg-[#faf9f7] font-sans">
      {/* Left: Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-[52%] px-8 sm:px-16 xl:px-28">
        {/* Logo */}
        <div className="mb-10">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 4C18 4 8 10 8 20C8 25.523 12.477 30 18 30C23.523 30 28 25.523 28 20C28 10 18 4Z" fill="url(#paint0_linear)"/>
              <defs>
                <linearGradient id="paint0_linear" x1="8" y1="4" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF6B6B"/>
                  <stop offset="0.5" stopColor="#FF4757"/>
                  <stop offset="1" stopColor="#C0392B"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">Log in</h1>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => handleSocialLogin("google")}
            className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2045C17.64 8.5663 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.2045Z" fill="#4285F4"/>
                <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z" fill="#34A853"/>
                <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.5931 3.68182 9C3.68182 8.4069 3.78409 7.83 3.96409 7.29V4.9582H0.957275C0.347727 6.1731 0 7.5477 0 9C0 10.4523 0.347727 11.8269 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
                <path d="M9 3.5795C10.3214 3.5795 11.5077 4.0336 12.4405 4.9254L15.0218 2.344C13.4632 0.8918 11.4259 0 9 0C5.48182 0 2.43818 2.0168 0.957275 4.9582L3.96409 7.29C4.67182 5.1627 6.65591 3.5795 9 3.5795Z" fill="#EA4335"/>
              </svg>
            </span>
            Continue with Google
          </button>

          <button
            onClick={() => handleSocialLogin("github")}
            className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-lg py-2.5 px-4 text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9 0C4.0275 0 0 4.1302 0 9.2275C0 13.3002 2.5785 16.7477 6.1545 17.9837C6.6045 18.0675 6.7725 17.7937 6.7725 17.5575C6.7725 17.3437 6.765 16.7025 6.7612 15.8587C4.2548 16.4175 3.7237 14.6325 3.7237 14.6325C3.315 13.5487 2.7225 13.2787 2.7225 13.2787C1.9087 12.705 2.7825 12.7162 2.7825 12.7162C3.681 12.7762 4.1535 13.6537 4.1535 13.6537C4.9537 15.0787 6.273 14.6625 6.789 14.4337C6.8715 13.8337 7.1115 13.4175 7.3762 13.1812C5.358 12.9412 3.2363 12.1537 3.2363 8.655C3.2363 7.6275 3.5888 6.7875 4.1737 6.1275C4.0762 5.8875 3.7688 4.9275 4.2637 3.6225C4.2637 3.6225 5.0137 3.3675 6.7537 4.5975C7.4812 4.3875 8.2462 4.2825 9.0075 4.2787C9.7688 4.2825 10.5338 4.3875 11.2613 4.5975C12.9938 3.3675 13.7438 3.6225 13.7438 3.6225C14.2388 4.9275 13.9313 5.8875 13.8338 6.1275C14.4188 6.7875 14.7713 7.6275 14.7713 8.655C14.7713 12.1612 12.6458 12.9375 10.6238 13.1737C10.9538 13.4625 11.2463 14.0325 11.2463 14.9025C11.2463 16.1475 11.235 17.1525 11.235 17.4637C11.235 17.7037 11.4 17.9812 11.8575 17.8912C15.4275 16.6512 18 13.2075 18 9.2275C18 4.1302 13.9725 0 9 0Z" fill="#24292F"/>
              </svg>
            </span>
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium tracking-widest">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email Form */}
        <form onSubmit={handleContinue} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-lg py-2.5 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60"
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>

        {/* Sign up link */}
        <p className="mt-5 text-sm text-gray-500 text-center">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-gray-900 font-medium underline underline-offset-2 hover:text-gray-700 cursor-pointer">
            Create your account
          </a>
        </p>

        {/* SSO */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <span className="w-4 h-4 flex items-center justify-center">
            <i className="ri-lock-line text-gray-400 text-sm" />
          </span>
          <span>
            SSO available on{" "}
            <a href="#" className="underline underline-offset-1 hover:text-gray-600 cursor-pointer">
              Business and Enterprise
            </a>{" "}
            plans
          </span>
        </div>
      </div>

      {/* Right: Gradient Panel */}
      <div className="hidden lg:flex w-[48%] h-full">
        <GradientPanel />
      </div>
    </div>
  );
}
