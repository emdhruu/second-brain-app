import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const Signin = () => {
  const { signin, googleLogin } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signin(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Signin</h2>

        <form onSubmit={handleSignin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
          <button type="submit" className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Signin
          </button>
        </form>

        <button onClick={googleLogin} className="w-full py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600">
          Signin with Google
        </button>
      </div>
    </div>
  );
};

export default Signin;
