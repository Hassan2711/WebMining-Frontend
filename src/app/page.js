"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import BigModal from "@/components/ui/BigModal";




export default function Home() {
  const router = useRouter();


  useEffect(() => {
    const token = Cookies.get("token");
    // router.push("/dashboard");


    if (!token) {
      router.push("/login");
    } else {
      router.push("/dashboard");

    }
  }
  , [router]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  );
}
