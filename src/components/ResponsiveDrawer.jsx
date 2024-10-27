"use client";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  CircleUser,
  Download,
  Gauge,
  LayoutList,
  ListCheck,
  UserRoundPen,
} from "lucide-react";
import Cookies from "js-cookie";
import { BACKEND_URL } from "./ui/Login";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // async function fetchUserData() {
  //   try {
  //     const token = Cookies.get("token");
  //     console.log("new", token);
  //     const response = await fetch(`${BACKEND_URL}/users/me/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("response:::", response);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     console.error("Error fetching user data:", error.message);
  //     return { error: error.message };
  //   }
  // }
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

//  useEffect(() => {
//     async function loadData() {
//       const result = await fetchUserData();
//       if (result.error) {
//         setError(result.error);
//       } else {
//         setData(result);
//         console.log("res:1", result);
//         if (result.role === "admin") {
//           setAdmin(true);
//         }
//       }
//       setLoading(false);
//     }

//     loadData();
//   }, [fetchUserData]);



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
      if (result.role === "admin") {
        setAdmin(true);
      }
    }
    setLoading(false);
  }

  loadData();
}, [fetchUserData]);

  const drawer = (
    <div className="bg-primaryColor h-screen">
      <Link href={"/dashboard"}>
        <div className="flex justify-center items-center text-center py-1  bg-white">
          {/* Logo */}

          <Image src={"/logo.png"} alt="Logo" width={69} height={69} />

          <p className="font-sans font-semibold tracking-widest leading-relaxed">
            Mining Web
          </p>
        </div>
      </Link>

      {/* <Toolbar /> */}

      <Divider />
      <div className="">
        <List className="w-full items-start">
          <div className="flex mt-2">
            {["BA TRIPS"].map((text, index) => (
              <ListItem className="w-full " key={text} disablePadding>
                <div className="flex flex-col  w-full ">
                  <div className="text-white font-bold text-sm pl-5">
                    <button>{text}</button>
                  </div>
                  <div>
                    <div className="mt-4">
                      {/* <div className="px-4  group ">
                        <Link href={"/dashboard"}>
                          <List>
                            {["Dashboard"].map((text, index) => (
                              <Link key={index} href={"/dashboard/dashboard"}>
                                <ListItem
                                  className="hover:text-primaryColor group-hover:bg-white group-hover:rounded-2xl hover:border "
                                  key={index}
                                  disablePadding
                                >
                                  <div className="flex space-x-3 justify-center items-center ml-2 px-2 py-2">
                                    <div className="text-white group-hover:text-primaryColor">
                                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      {/* <Gauge />
                                    </div>
                                    <button className="text-white group-hover:text-primaryColor font-semibold tracking-wide ">
                                      {" "}
                                      {text}
                                    </button>
                                  </div>
                                </ListItem>
                              </Link>
                            ))}
                          </List>
                        </Link>
                      </div>  */}
                      <Link href={"/dashboard"}>
                        <div className="flex flex-col  px-4  group ">
                          <div className="flex  items-center gap-x-2 group-hover:bg-white rounded-2xl px-4  py-2">
                            <div className="text-white  group-hover:bg-white group-hover:text-primaryColor">
                              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                              <Gauge />
                            </div>
                            <p className="text-white group-hover:bg-white group-hover:text-primaryColor font-semibold tracking-wide">
                              Dashboard
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link href={"/dashboard/yellowpages"}>
                        <div className="flex flex-col  px-4  group ">
                          <div className="flex  items-center gap-x-2 group-hover:bg-white rounded-2xl px-4  py-2">
                            <div className="text-white  group-hover:bg-white group-hover:text-primaryColor">
                              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                              <LayoutList />
                            </div>
                            <p className="text-white group-hover:bg-white group-hover:text-primaryColor font-semibold tracking-wide">
                              Yellow Pages
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link href={"/dashboard/article_factory"}>
                        <div className="flex flex-col  px-4  group ">
                          <div className="flex  items-center gap-x-2 group-hover:bg-white rounded-2xl px-4  py-2">
                            <div className="text-white  group-hover:bg-white group-hover:text-primaryColor">
                              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}

                              <LayoutList />
                            </div>
                            <p className="text-white group-hover:bg-white group-hover:text-primaryColor font-semibold tracking-wide">
                              Article Factory
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </ListItem>
            ))}
          </div>
        </List>
      </div>

      <Divider />
      <div className="">
        <List className="w-full items-start">
          <div className="flex">
            {["LOKAL.WORK"].map((text, index) => (
              <ListItem className="w-full " key={text} disablePadding>
                <div className="flex flex-col  w-full ">
                  <div className="text-white font-bold text-sm pl-5">
                    <button>{text}</button>
                  </div>
                  <div>
                    <div className="mt-4">
                      <Link href={"/dashboard"}>
                        <div className="flex flex-col  px-4  group ">
                          <div className="flex  items-center gap-x-2 group-hover:bg-white rounded-2xl px-4  py-2">
                            <div className="text-white  group-hover:bg-white group-hover:text-primaryColor">
                              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                              <Gauge />
                            </div>
                            <p className="text-white group-hover:bg-white group-hover:text-primaryColor font-semibold tracking-wide">
                              Dashboard
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link href={"/dashboard/procurement"}>
                        <div className="flex flex-col  px-4  group ">
                          <div className="flex  items-center gap-x-2 group-hover:bg-white rounded-2xl px-4  py-2">
                            <div className="text-white  group-hover:bg-white group-hover:text-primaryColor">
                              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                              <ListCheck />
                            </div>
                            <p className="text-white group-hover:bg-white group-hover:text-primaryColor font-semibold tracking-wide">
                              Procurement
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="">
                      <Link href={"/dashboard/grants_gov"}>
                        <div className="flex flex-col  px-4  group ">
                          <div className="flex  items-center gap-x-2 group-hover:bg-white rounded-2xl px-4  py-2">
                            <div className="text-white  group-hover:bg-white group-hover:text-primaryColor">
                              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                              <ListCheck />
                            </div>
                            <p className="text-white group-hover:bg-white group-hover:text-primaryColor font-semibold tracking-wide">
                              Grants_gov
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </ListItem>
            ))}
          </div>
        </List>
      </div>
      <Divider />
      {admin ? (
        <div className="">
          <List className="w-full items-start">
            <div className="flex">
              {["SETTINGS"].map((text, index) => (
                <ListItem className="w-full " key={text} disablePadding>
                  <div className="flex flex-col  w-full ">
                    <div className="text-white font-bold text-sm pl-5">
                      <button>{text}</button>
                    </div>
                    <div>
                      <div className="mt-4">
                        <Link href={"/dashboard/admin_settings"}>
                          <div className="flex flex-col  px-4  group ">
                            <div className="flex  items-center gap-x-2 group-hover:bg-white rounded-2xl px-4  py-2">
                              <div className="text-white  group-hover:bg-white group-hover:text-primaryColor">
                                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                <CircleUser />
                              </div>
                              <p className="text-white group-hover:bg-white group-hover:text-primaryColor font-semibold tracking-wide">
                                Admin Settings
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="mt-4">
                        <Link href={"/dashboard/downloads"}>
                          <div className="flex flex-col  px-4  group ">
                            <div className="flex  items-center gap-x-2 group-hover:bg-white rounded-2xl px-4  py-2">
                              <div className="text-white  group-hover:bg-white group-hover:text-primaryColor">
                                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                                <Download />
                              </div>
                              <p className="text-white group-hover:bg-white group-hover:text-primaryColor font-semibold tracking-wide">
                                Downloads
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      {/* <div className="mt-1">
                        <Link href={"/dashboard/profile"}>
                          <div className="flex flex-col  px-4  group ">
                            <div className="flex  items-center gap-x-2 group-hover:bg-white rounded-2xl px-4  py-2">
                              <div className="text-white  group-hover:bg-white group-hover:text-primaryColor">
                            
                                <UserRoundPen />
                              </div>
                              <p className="text-white group-hover:bg-white group-hover:text-primaryColor font-semibold tracking-wide">
                                Profile
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </ListItem>
              ))}
            </div>
          </List>
          <div className="flex items-center justify-center h-full mt-12 "></div>
        </div>
      ) : ""}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className="" sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="-200"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {/* <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton> */}
        {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>  */}
      </AppBar>
      <Box
        className=""
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              padding: "",
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* down color */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              // background: "#6366f1",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;



