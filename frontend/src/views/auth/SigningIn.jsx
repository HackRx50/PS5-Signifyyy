import { useState } from "react";
import axios from "../utils/axiosInstance.js"; 
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import { Link, useNavigate } from "react-router-dom";

export default function SigningIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [terms, setTerms] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {
        name,
        email,
        password,
        password_conf: passwordConf,
        tc: terms,
      });

      if (response.data.status === "success") {
        alert("Registration successful");
        navigate("/auth/sign-in");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration", error);
      alert("Failed to register");
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your details to create an account!
        </p>

        <form onSubmit={handleSignUp}>
          <InputField
            variant="auth"
            extra="mb-3"
            label="Name*"
            placeholder="Your full name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@example.com"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputField
            variant="auth"
            extra="mb-3"
            label="Confirm Password*"
            placeholder="Re-enter password"
            id="confirm-password"
            type="password"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />

          <div className="mb-4 flex items-center px-2">
            <Checkbox
              checked={terms}
              onChange={() => setTerms(!terms)}
            />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              I have reviewed everything is correct
            </p>
          </div>

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            Already have an account?
          </span>
          <Link
            to="/auth/sign-in"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
