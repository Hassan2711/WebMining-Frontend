"use client";
import Cookies from "js-cookie";
import { Login } from "@/components/ui/Login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page(){
  const [accessToken, setAccessToken] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setAccessToken(token)
      // Redirect to login if no token is found
     
    }
  }, [router]); // Add router as dependency

  if (accessToken) {
    router.push("/dashboard");
  }

  return (
    <section>
      <div className="main-content mt-6 sm:m-4">
        <div className="grid grid-cols-12 gap-y-7 sm:gap-7 card px-4 sm:px-10 2xl:px-[70px] py-15 lg:items-center lg:min-h-[calc(100vh_-_32px)]">
          {/* Start Overview Area */}
          <div className="col-span-full lg:col-span-6">
            <div className="flex flex-col items-center justify-center gap-10 text-center">
              <div className="hidden sm:block">
                <Image
                  src="/loti-auth.svg"
                  alt="loti"
                  className="group-data-[theme-mode=dark]:hidden"
                  width={500}
                  height={500}
                />
              </div>
              <div className="sm:hidden block  ">
                <Image
                  src="/logo.png"
                  alt="loti"
                  className="rounded-full mx-auto"
                  width={100}
                  height={100}
                />
                <p className="mt-2 text-primaryColor font-bold tracking-widest text-lg text-center">Mining App</p>
              </div>

            </div>
          </div>
          {/* End Overview Area */}
          {/* Start Form Area */}
          <div className="col-span-full lg:col-span-6 w-full lg:max-w-[600px]">
            <div className="">
              <Login />
            </div>
          </div>
          {/* End Form Area */}
        </div>
      </div>
    </section>
  );
};

export default Page;
