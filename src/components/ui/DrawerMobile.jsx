// "use client";

// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogPanel,
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Popover,
//   PopoverButton,
//   PopoverGroup,
//   PopoverPanel,
// } from "@headlessui/react";
// import {
//   ArrowPathIcon,
//   Bars3Icon,
//   ChartPieIcon,
//   CursorArrowRaysIcon,
//   FingerPrintIcon,
//   SquaresPlusIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import {
//   ChevronDownIcon,
//   PhoneIcon,
//   PlayCircleIcon,
// } from "@heroicons/react/20/solid";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu } from "lucide-react";
// import Cookies from "js-cookie";
// import { BACKEND_URL } from "./Login";

// const products = [
//   {
//     name: "DASHBOARD",

//     href: "/dashboard",
//     icon: ChartPieIcon,
//   },
//   {
//     name: "YELLOW PAGES",

//     href: "dashboard/yellowpages",
//     icon: CursorArrowRaysIcon,
//   },
//   {
//     name: "ARTICLE FACTORY",

//     href: "dashboard/article_factory",
//     icon: FingerPrintIcon,
//   },
// ];
// const products1 = [
//   {
//     name: "DASHBOARD",

//     href: "/dashboard",
//     icon: ChartPieIcon,
//   },
//   {
//     name: "PROCUREMENT",

//     href: "/dashboard/procurement",
//     icon: CursorArrowRaysIcon,
//   },
//   {
//     name: "GRANTS GOV",

//     href: "/dashboard/grants_gov",
//     icon: FingerPrintIcon,
//   },
// ];
// // const callsToAction = [
// //   { name: "Watch demo", href: "#", icon: PlayCircleIcon },
// //   { name: "Contact sales", href: "#", icon: PhoneIcon },
// // ];

// export default function DrawerMobile() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [admin,setAdmin] = useState(false)

//   async function fetchUserData() {
//     try {
//       const token = Cookies.get("token");
//       const response = await fetch(`${BACKEND_URL}/users/me/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//       return { error: error.message };
//     }
//   }

//   useEffect(() => {
//     async function loadData() {
//       const result = await fetchUserData();
//       if (result.error) {
//         console.log(result.error);
//       } else {
//         console.log("resformobile", result);
//         if (result.role === "admin") {
//           setAdmin(true);
//         }
//       }
//     }

//     loadData();
//   }, [fetchUserData]);

//   return (
//     <header className="bg-primaryColor">
//       <nav
//         aria-label="Global"
//         className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
//       >
//         <div className="flex space-x-4 lg:hidden ">
//           <button
//             type="button"
//             onClick={() => setMobileMenuOpen(true)}
//             className="-m-2.5 inline-flex items-center justify-center rounded-md py-2.5  text-gray-700 "
//           >
//             <span className="sr-only ">Open main menu</span>
//             <div className="">
//               <Menu className="text-white " size={30} />
//             </div>
//           </button>
//           {/* <Link href={"/dashboard"}>
//               <div className="flex justify-center items-center text-center py-1  bg-white">
             

//                 <Image src={"/logo.png"} alt="Logo" width={69} height={69} />

//                 <p className="font-sans font-semibold tracking-widest leading-relaxed">
//                   Mining Web
//                 </p>
//               </div>
//             </Link> */}
//         </div>
//         <PopoverGroup className="hidden lg:flex lg:gap-x-12">
//           <Popover className="relative">
//             <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
//               BA
//               <ChevronDownIcon
//                 aria-hidden="true"
//                 className="h-5 w-5 flex-none text-gray-400"
//               />
//             </PopoverButton>

//             <PopoverPanel
//               transition
//               className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
//             >
//               <div className="p-4">
//                 {products.map((item) => (
//                   <div
//                     key={item.name}
//                     className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
//                   >
//                     <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
//                       <item.icon
//                         aria-hidden="true"
//                         className="h-6 w-6 text-gray-600 group-hover:text-primaryColor"
//                       />
//                     </div>
//                     <div className="flex-auto">
//                       <a
//                         href={item.href}
//                         className="block font-semibold text-gray-900"
//                       >
//                         {item.name}
//                         <span className="absolute inset-0" />
//                       </a>
//                       <p className="mt-1 text-gray-600">{item.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
//                 {callsToAction.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
//                   >
//                     <item.icon
//                       aria-hidden="true"
//                       className="h-5 w-5 flex-none text-gray-400"
//                     />
//                     {item.name}
//                   </a>
//                 ))}
//               </div> */}
//             </PopoverPanel>
//           </Popover>

//           <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
//             Features
//           </a>
//           <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
//             Marketplace
//           </a>
//           <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
//             Company
//           </a>
//         </PopoverGroup>
//         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
//             Log in <span aria-hidden="true">&rarr;</span>
//           </a>
//         </div>
//       </nav>
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="lg:hidden"
//       >
//         <div className="fixed inset-0 z-10" />
//         <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//           <div className="flex items-center justify-start space-x-4">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(false)}
//               className="-m-2.5 rounded-md p-2.5 text-gray-700"
//             >
//               <span className="sr-only">Close menu</span>
//               <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//             </button>
//             <Link href={"/dashboard"}>
//               <div className="flex justify-center items-center text-center py-1  bg-white">
//                 {/* Logo */}

//                 <Image src={"/logo.png"} alt="Logo" width={69} height={69} />

//                 <p className="font-sans font-semibold tracking-widest leading-relaxed">
//                   Mining Web
//                 </p>
//               </div>
//             </Link>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6">
//                 <Disclosure as="div" className="-mx-3">
//                   <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
//                     BA TRIPS
//                     <ChevronDownIcon
//                       aria-hidden="true"
//                       className="h-5 w-5 flex-none group-data-[open]:rotate-180"
//                     />
//                   </DisclosureButton>
//                   <DisclosurePanel className="mt-2 space-y-2">
//                     {[...products].map((item) => (
//                       <DisclosureButton
//                         key={item.name}
//                         as="a"
//                         href={item.href}
//                         className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                       >
//                         {item.name}
//                       </DisclosureButton>
//                     ))}
//                   </DisclosurePanel>
//                 </Disclosure>
//                 <Disclosure as="div" className="-mx-3">
//                   <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
//                     LOKAL.WORK
//                     <ChevronDownIcon
//                       aria-hidden="true"
//                       className="h-5 w-5 flex-none group-data-[open]:rotate-180"
//                     />
//                   </DisclosureButton>
//                   <DisclosurePanel className="mt-2 space-y-2">
//                     {[...products1].map((item) => (
//                       <DisclosureButton
//                         key={item.name}
//                         as="a"
//                         href={item.href}
//                         className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                       >
//                         {item.name}
//                       </DisclosureButton>
//                     ))}
//                   </DisclosurePanel>
//                 </Disclosure>
//                 {admin ? (
//                   <div>
//                     <a
//                       href="/dashboard/admin_settings"
//                       className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                     >
//                       ADMIN SETTINGS
//                     </a>
//                     <a
//                       href="/dashboard/profile"
//                       className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                     >
//                       PROFILE
//                     </a>
//                   </div>
//                 ) : (
//                   ""
//                 )}

//                 {/* <a
//                   href="#"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                 >
//                   Marketplace
//                 </a> */}
//                 {/* <a
//                   href="#"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                 >
//                   Company
//                 </a> */}
//               </div>
//               {/* <div className="py-6">
//                 <a
//                   href="#"
//                   className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                 >
//                   Log in
//                 </a>
//               </div> */}
//             </div>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </header>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import Cookies from "js-cookie";
import { BACKEND_URL } from "./Login";

const products = [
  { name: "DASHBOARD", href: "/dashboard", icon: ChartPieIcon },
  { name: "YELLOW PAGES", href: "dashboard/yellowpages", icon: CursorArrowRaysIcon },
  { name: "ARTICLE FACTORY", href: "dashboard/article_factory", icon: FingerPrintIcon },
];

const products1 = [
  { name: "DASHBOARD", href: "/dashboard", icon: ChartPieIcon },
  { name: "PROCUREMENT", href: "/dashboard/procurement", icon: CursorArrowRaysIcon },
  { name: "GRANTS GOV", href: "/dashboard/grants_gov", icon: FingerPrintIcon },
];

export default function DrawerMobile() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [admin, setAdmin] = useState(false);

  async function fetchUserData() {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${BACKEND_URL}/users/me/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      return { error: error.message };
    }
  }

  useEffect(() => {
    async function loadData() {
      const result = await fetchUserData();
      if (result.error) {
     
      } else {
        
        if (result.role === "admin") {
          setAdmin(true);
        }
      }
    }

    loadData();
  }, []);

  return (
    <header className="bg-primaryColor">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex space-x-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md py-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="text-white" size={30} />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              BA
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-primaryColor" />
                    </div>
                    <div className="flex-auto">
                      <Link href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Features
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Marketplace
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Company
          </a> */}
        </PopoverGroup>
        {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div> */}
      </nav>
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-start space-x-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <Link href={"/dashboard"}>
              <div className="flex justify-center items-center text-center py-1 bg-white">
                <Image src={"/logo.png"} alt="Logo" width={69} height={69} />
                <p className="font-sans font-semibold tracking-widest leading-relaxed">Mining Web</p>
              </div>
            </Link>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    BA TRIPS
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {products.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    LOKAL.WORK
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {products1.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                {admin && (
                  <div>
                    <a
                      href="/dashboard/admin_settings"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      ADMIN SETTINGS
                    </a>
                    <a
                      href="/dashboard/downloads"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Downloads
                    </a>
                    {/* <a
                      href="/dashboard/profile"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      PROFILE
                    </a> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
