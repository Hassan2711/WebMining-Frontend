"use client";
import React from "react";
import Link from "next/link";
import TableDemo from "@/components/ui/TableDemo";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "@/components/ui/animated-modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BottomGradient, LabelInputContainer } from "@/components/ui/Login";
import { useState } from "react";
import PageTitle from "@/components/PageTitle";
import PageTables from "@/components/ui/PageTables";
import UsersList from "@/components/ui/GetUsers";
import CreateNewUser from "@/components/CreateNewUser";

export default function Page() {
  const tableData = [
    {
      businessName: "Business Name",
      address: "Address",
      type: "Passport",
      receiveDate: "18 Dec, 2019 01:02 PM",
      status: "Approved",
      checkedBy: { initials: "JS", name: "Janet Snyder" },
    },
    // ... more data objects
  ];
  return (
    <div className="bg-slate-100/70">
      <PageTitle text={"Admin Settings"} />
      <div className="bg-white m-8 border rounded-md">
        <div className="flex justify-between  items-center py-6 px-6">
          <h3 className="scroll-m-20 text-xl sm:font-bold tracking-wider text-primaryColor"> Users List</h3>
          {/* <button className="">
            <Modal>
              <ModalTrigger className="px-8 py-2 rounded-md bg-primaryColor text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-primaryColor">
                Add Admin
              </ModalTrigger>
              <ModalBody>
                <ModalContent>
                  <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                    Add User
                  </h4>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="Name">User Name</Label>
                    <Input id="name" placeholder="John" type="name" />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">User Email</Label>
                    <Input
                      id="email"
                      placeholder="example@mail.com"
                      type="email"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                    />
                  </LabelInputContainer>
                  <button
                    className="bg-gradient-to-br relative group/btn from-primaryColor dark:from-primaryColor dark:to-primaryColor to-neutral-600 block dark:bg-primaryColor w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--primaryColor)_inset,0px_-1px_0px_0px_var(--primaryColor)_inset]"
                    type="submit"
                  >
                    Add User &rarr;
                    <BottomGradient />
                  </button>
                </ModalContent>
              </ModalBody>
            </Modal>
          </button> */}
          <CreateNewUser/>
        </div>
        {/* <TableDemo data={tableData} /> */}
        {/* <PageTables/> */}
      </div>
      <UsersList />
      {/* <div className="py-6 zero:py-14  bg-primaryColor space-y-6">
        <div className="flex justify-center px-8 items-center">
          <div>
            <h1 className="text-lg zero:text-5xl font-medium text-white text-center leading-relaxed scroll-m-20 tracking-wider ">
              Admin Settings
            </h1>
            <p className="text-sm text-white text-center zero:text-lg leading-relaxed scroll-m-20 zero:tracking-wide">
              <Link href={"/dashboard"}>Dashboard &nbsp; &#62; &nbsp; </Link>
              <span className="text-greennn">Admin Settings </span>{" "}
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
