"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

// export const  BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
// export const BACKEND_URL =
//   "http://127.0.0.1:8000";
export const BACKEND_URL = "http://mining-production.up.railway.app";


export function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const handleSubmited = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted", e);
  //   console.log("Form submitted", e.target.value);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Construct the data payload for the POST request
  //     const data = new URLSearchParams();
  //     data.append("username", email); // Assuming 'username' is the expected field name
  //     data.append("password", password);

  //     // Make the POST request to the FastAPI backend
  //     const response = await axios.post(`${BACKEND_URL}/token`, data, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     });
  //     // const getDetail = await axios.get(`${BACKEND_URL}/get_user_detail`, {
  //     //   headers: {
  //     //     'Authorization': `Bearer ${response.data.access_token}`, // Assuming the token needs to be passed here
  //     //   }
  //     // });
  //     // console.log("user detail", getDetail.data);
  //     // Handle successful authentication here
  //     // go to /dashboard page
  //     const thirtyMinutesFromNow = new Date(
  //       new Date().getTime() + 30 * 60 * 1000
  //     );

  //     const oneMinuteFromNow = new Date(new Date().getTime() + 1 * 60 * 1000);

  //     Cookies.set("token", response.data.access_token, {
  //       expires: 2,
  //       path: "/",
  //     });

  //     router.push("/dashboard");
  //     // Redirect to another page or update the UI based on the response
  //   } catch (error) {
  //     // Handle errors here
  //     //
  //     console.error(error.response?.data || error.message);
  //     setError(true);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${BACKEND_URL}/token`, {
        username: email,
        password: password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      Cookies.set("token", response.data.access_token, {
        expires: 2,
        path: "/",
      });
  
      router.push("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError(true);
    }
  };
  

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome Back!
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please login Here!
      </p>

      <form className="my-8">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="text"
            onChange={handleEmailChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            onChange={handlePasswordChange}
          />
        </LabelInputContainer>
        <p className="my-2 text-red-500">
          {error ? "Email or Password is Incorrect" : ""}
        </p>
        <button
          className="bg-gradient-to-br relative group/btn from-primaryColor dark:from-primaryColor dark:to-primaryColor to-neutral-600 block dark:bg-primaryColor w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--primaryColor)_inset,0px_-1px_0px_0px_var(--primaryColor)_inset]"
          type="submit"
          onClick={handleSubmit}
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-primaryColor to-transparent" />
    </>
  );
};

export const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
