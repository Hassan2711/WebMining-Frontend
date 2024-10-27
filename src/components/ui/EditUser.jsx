"use client";
import { useState } from "react";

import Cookies from "js-cookie";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "@/components/ui/animated-modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { BACKEND_URL, BottomGradient, LabelInputContainer } from "@/components/ui/Login";
import { Pencil } from "lucide-react";

export default function EditUser({user_name,user_role, _id}) {
  const [username, setUsername] = useState(user_name);
  const [id, setID] = useState(_id);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user_role);

  const router = useRouter("");

  const token = Cookies.get("token");

  const submitData = async () => {
    try {
      let response = await fetch(`${BACKEND_URL}/update_user?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name:username,
          password: password,
          role: role,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add Bearer token to the headers
        },
      });

      if (!response.ok) {
        // Handle non-2xx responses
        const errorData = await response.json();
        console.error("Error:", errorData);
        // alert(`Error: ${errorData.message || "An error occurred"}`);
        return;
      }

      const data = await response.json();
      router.push('/dashboard/admin_settings')
      window.location.reload();
    //   alert("User created successfully!");
    
    } catch (error) {
      console.error("Fetch error:", error);
    //   alert("An unexpected error occurred.");
    }
  };

  return (
    <button className="">
      <Modal >
        <ModalTrigger className="">
          <Pencil size={20} />
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h1 className="scroll-m-20 text-xl font-extrabold sm:mb-8 tracking-tight lg:text-2xl">
             Edit User Detail
            </h1>
            <LabelInputContainer className="mb-4 text-start">
              <Label className="px-2" htmlFor="username">
                User Name
              </Label>
              <Input
                id="username"
                placeholder="Umer"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4 text-start">
              <Label className="px-2" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="***************"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputContainer>
            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="bordered-radio-1"
                type="radio"
                checked={role === "user"}
                onChange={() => setRole("user")}
                className="w-5 h-5 text-primaryColor bg-gray-100 focus:ring-primaryColor"
              />
              <label
                htmlFor="bordered-radio-1"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                User Role
              </label>
            </div>
            <div className="flex items-center sm:mt-4 sm:mb-4 ps-4 border border-gray-200 rounded dark:border-gray-700">
              <input
                id="bordered-radio-2"
                type="radio"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
                className="w-5 h-5 text-primaryColor bg-gray-100 focus:ring-primaryColor"
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Admin Role
              </label>
            </div>
            <button
              onClick={submitData}
              className="bg-gradient-to-br relative group/btn from-primaryColor dark:from-primaryColor dark:to-primaryColor to-neutral-600 block dark:bg-primaryColor w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--primaryColor)_inset,0px_-1px_0px_0px_var(--primaryColor)_inset]"
              type="button"
            >
              Save Changes &rarr;
              <BottomGradient />
            </button>
          </ModalContent>
        </ModalBody>
      </Modal>
    </button>
  );
}
