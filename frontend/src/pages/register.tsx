// Import necessary components and hooks
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

// Component for user registration
const Register = () => {
  // State to manage user registration data
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

  // Access the register function from the authentication context
  const { register } = useAuth();

  // Handle data change for input fields
  const handleDataChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // Update the corresponding field in the data state
      setData({
        ...data,
        [name]: e.target.value,
      });
    };

  // Handle user registration
  const handleRegister = async () => await register(data);

  return (
    // Register form UI
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
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or
            <a href="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
              {' '}sign in to your account
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email address
          </label>
          <Input
            placeholder="Enter the email..."
            type="email"
            value={data.email}
            onChange={handleDataChange("email")}
          />
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
          {/* Register button */}
          <Button
            fullWidth
            disabled={Object.values(data).some((val) => !val)}
            onClick={handleRegister}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
