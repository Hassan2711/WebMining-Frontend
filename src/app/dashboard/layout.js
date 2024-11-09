"use client";
import { Inter } from "next/font/google";
import Cookies from "js-cookie";
import ResponsiveDrawer from "@/components/ResponsiveDrawer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DrawerMobile from "@/components/ui/DrawerMobile";
import Loader from "@/components/ui/Loader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();

  const [accessToken,setAccessToken] = useState(null)

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      // Redirect to login if no token is found
      
    } else {
      setAccessToken(token)
   
    }
  }, [router]); // Add router as dependency

  if (!accessToken){
    return <Loader/>
    
  }

  return (
    <>
      <div className="sm:flex">
        <div className="hidden sm:block sm:w-[240px]">
          <ResponsiveDrawer />
        </div>
        <div className="relative block sm:hidden w-28 ">
          <div className="absolute   h-8   ">
            <DrawerMobile />
          </div>
        </div>
            <div className="w-full">{children}</div>
      </div>
    </>
  );
}
