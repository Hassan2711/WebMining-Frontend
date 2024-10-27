// src/app/ClientComponent.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Ensure you import Cookies if using it
import Loader from "@/components/ui/Loader";

export default function ClientComponent({ children }) {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);

  // useEffect(() => {
  //   const token = Cookies.get("token");

  //   if (!token) {
  //     router.push("/login");
  //   } else {
  //     setAccessToken(token); // Adjust this as needed
  //   }
  // }, [router]);

  // if (!accessToken) {
  //   console.log("no token access")
  //   // return <Loader />;
  // }

  return <>{children}</>;
}
