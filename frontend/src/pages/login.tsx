// Importing necessary components and hooks
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

// Component for the Login page
const Login = () => {
  // State to manage input data (username and password)
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  // Accessing the login function from the AuthContext
  const { login } = useAuth();

  // Function to update state when input data changes
  const handleDataChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [name]: e.target.value,
      });
    };

  // Function to handle the login process
  const handleLogin = async () => await login(data);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <nav className="bg-white dark:bg-gray-800 shadow-sm fixed top-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">ChatApp</span>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fas fa-moon"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or
            <a href="/register" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
             {' '} create a new account
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            User Name
          </label>
          <Input
            placeholder="Enter the username..."
            value={data.username}
            onChange={handleDataChange("username")}
          />
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <Input
            placeholder="Enter the password..."
            type="password"
            value={data.password}
            onChange={handleDataChange("password")}
          />
          <Button
            disabled={Object.values(data).some((val) => !val)}
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
