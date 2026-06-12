import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // later: API login logic goes here

    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#faf7f5] px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-lg text-center">
        <h1 className="text-[#4a1625] text-4xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 mb-8">
          Sign in to continue booking venues
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3.5 border border-gray-200 rounded-xl text-[15px] focus:outline-none focus:border-[#8b1e2d] focus:ring-4 focus:ring-[#8b1e2d]/15"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3.5 border border-gray-200 rounded-xl text-[15px] focus:outline-none focus:border-[#8b1e2d] focus:ring-4 focus:ring-[#8b1e2d]/15"
          />

          <button
            type="submit"
            className="w-full p-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-[#8b1e2d] to-[#4a1625] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;