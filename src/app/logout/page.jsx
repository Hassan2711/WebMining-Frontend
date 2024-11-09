"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

export default function Page(){
    const router = useRouter();
  useEffect(() => {
    // Remove the token cookie when the component mounts
    Cookies.remove("token");
    router.push("/login");
  }, [router]); // Empty dependency array means this effect runs once on mount

  return <Loader/>
};


