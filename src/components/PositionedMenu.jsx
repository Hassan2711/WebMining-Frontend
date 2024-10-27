// "use client";
// import * as React from "react";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { CircleUserRound } from "lucide-react";
// import Link from "next/link";
// import Cookies from "js-cookie";
// import { BACKEND_URL } from "./ui/Login";
// import { Avatar } from "@mui/material";
// import ProfileName from "./ui/ProfileName";

// export default function PositionedMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [data, setData] = React.useState(null);
//   const [error, setError] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);
//   const [admin, setAdmin] = React.useState(false);

//   console.log("data:", data, "error:", error);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const token = Cookies.get("token");
//   async function fetchUserData() {
//     try {
//       const response = await fetch(`${BACKEND_URL}/users/me/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("response::::", response);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//       return { error: error.message };
//     }
//   }
//   React.useEffect(() => {
//     async function loadData() {
//       const result = await fetchUserData();
//       if (result.error) {
//         setError(result.error);
//       } else {
//         setData(result.name);
//         console.log("res:1", result);
//         if (result.role === "admin") {
//           setAdmin(true);
//         }
//       }
//       setLoading(false);
//     }

//     loadData();
//   }, [fetchUserData]);
//   return (
//     <div className="text-white">
//       <Button
//         id="demo-positioned-button"
//         aria-controls={open ? "demo-positioned-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         onClick={handleClick}
//         className="text-white space-x-2"
//       >
//         <ProfileName text={data} />
//         {/* <CircleUserRound size={30} color="white" /> */}
//         <div>
//           <p className="hidden sm:block text-white text-[10px]">
//             {admin ? "Administrator" : ""}
//           </p>
//           <span className="hidden sm:block text-white">{data}</span>
//         </div>
//       </Button>
//       <Menu
//         className="mt-10"
//         id="demo-positioned-menu"
//         aria-labelledby="demo-positioned-button"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//       >
//         <Link href={"/dashboard/profile"}>
//           <MenuItem onClick={handleClose}>Profile</MenuItem>
//         </Link>
//         <Link href={"/logout"}>
//           <MenuItem onClick={handleClose}>Logout</MenuItem>
//         </Link>
//         {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
//       </Menu>
//     </div>
//   );
// }


"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { BACKEND_URL } from "./ui/Login";
import ProfileName from "./ui/ProfileName";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [admin, setAdmin] = React.useState(false);

  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchUserData = React.useCallback(async () => {
    const token = Cookies.get("token");
    try {
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
  }, []);

  React.useEffect(() => {
    async function loadData() {
      const result = await fetchUserData();
      if (result.error) {
        setError(result.error);
      } else {
        setData(result.name);
        localStorage.setItem("userName", result.name);
        if (result.role === "admin") {
          setAdmin(true);
        }
      }
      setLoading(false);
    }

    loadData();
  }, [fetchUserData]);

  return (
    <div className="text-white">
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="text-white space-x-2"
      >
        <ProfileName text={data} />
        <div>
          <p className="hidden sm:block text-white text-[10px]">
            {admin ? "Administrator" : ""}
          </p>
          <span className="hidden sm:block text-white">{data}</span>
        </div>
      </Button>
      <Menu
        className="mt-10"
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {/* <Link href="/dashboard/profile" passHref>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link> */}
        <Link href="/logout" passHref>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

