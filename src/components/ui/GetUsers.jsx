// // components/UsersList.js
// import Cookies from "js-cookie";
// import axios from 'axios';
// import { useEffect, useState } from "react";
// import { BACKEND_URL, BottomGradient, LabelInputContainer } from "./Login";
// import {
//   Modal,
//   ModalTrigger,
//   ModalBody,
//   ModalContent,
// } from "@/components/ui/animated-modal";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   CircularProgress,
//   TableFooter,
//   TablePagination,
// } from "@mui/material";
// import Loader from "./Loader";
// import { Pencil } from "lucide-react";
// import { Label } from "./label";
// import { Input } from "./input";

// const UsersList = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const token = Cookies.get("token");

// // Handler function
// async function handler(req, res) {
//   console.log("hello")
//   if (req.method !== 'PUT') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const response = await axios.put('http://127.0.0.1:8000/update_user/?id=66bdb9eb8c1f8e7b7fd6a39c', {
//       name: 'jared',
//       password: '123',
//       role: 'admin'
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     res.status(response.status).json(response.data);
//     console.log("response:put",response)
//   } catch (error) {
//     res.status(error.response ? error.response.status : 500).json({
//       error: error.message,
//       details: error.response ? error.response.data : null
//     });
//   }
// }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {

//         const response = await fetch(
//           `${BACKEND_URL}/users?page=${page + 1}&limit=${rowsPerPage}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const result = await response.json();
//         setData(result);
//         console.log("resutll:",setData)
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [page, rowsPerPage]);

//   if (error) {
//     return <Typography color="error">Error: {error}</Typography>;
//   }

//   if (!data) {
//     return <Loader />;
//   }

//   return (
//     <div className="px-8">
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//                   User Name
//                 </h4>
//               </TableCell>
//               <TableCell>
//                 <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//                   User Role
//                 </h4>
//               </TableCell>
//               <TableCell>
//                 <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
//                   Edit
//                 </h4>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.data.map((user, index) => (
//               <TableRow key={index}>
//                 {/* <TableCell>{user._id}</TableCell> */}
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell  >
//                   <Modal>
//                     <ModalTrigger className="">
//                       <Pencil onClick={handler} size={20} />
//                     </ModalTrigger>
//                     <ModalBody>
//                       <ModalContent>
//                         <h1 className="scroll-m-20 text-xl font-bold mx-auto py-2 tracking-tight lg:text-2xl">
//                           Users List
//                         </h1>
//                         <LabelInputContainer className="mb-4">
//                           <Label htmlFor="Name">User Name</Label>
//                           <Input id="name" placeholder="John" type="name"  value={user.name} />
//                         </LabelInputContainer>
//                         <LabelInputContainer className="mb-4">
//                           <Label htmlFor="role">User Email</Label>
//                           <Input
//                             id="role"
//                             placeholder="user"
//                             type="role"
//                             value={user.role}
//                           />
//                         </LabelInputContainer>

//                         <button
//                           className="bg-gradient-to-br relative group/btn from-primaryColor dark:from-primaryColor dark:to-primaryColor to-neutral-600 block dark:bg-primaryColor w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--primaryColor)_inset,0px_-1px_0px_0px_var(--primaryColor)_inset]"
//                           type="submit"
//                         >
//                           Add User &rarr;
//                           <BottomGradient />
//                         </button>
//                       </ModalContent>
//                     </ModalBody>
//                   </Modal>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[10, 25, 50]}
//                 component="td"
//                 count={data.total_count || 0}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={(event, newPage) => setPage(newPage)}
//                 onRowsPerPageChange={(event) => {
//                   setRowsPerPage(parseInt(event.target.value, 10));
//                   setPage(0);
//                 }}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default UsersList;

import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, BottomGradient, LabelInputContainer } from "./Login";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "@/components/ui/animated-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TableFooter,
  TablePagination,
} from "@mui/material";
import Loader from "./Loader";
import { Pencil } from "lucide-react";
import { Label } from "./label";
import { Input } from "./input";
import EditUser from "./EditUser";
import DeleteUser from "../DeleteUser";

const UsersList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingUser, setEditingUser] = useState(null); // New state for editing user

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/users?page=${page + 1}&limit=${rowsPerPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
     
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [page, rowsPerPage, token]);

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="px-8">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  User Name
                </h4>
              </TableCell>
              <TableCell>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  User Role
                </h4>
              </TableCell>
              <TableCell align="">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Edit
                </h4>
              </TableCell>
              <TableCell align="center">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Delete
                </h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((user) => (
              <TableRow key={user._id}>
                {/* <TableCell>{user._id}</TableCell> */}
                <TableCell>{user.name}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  <EditUser user_name={user.name} user_role={user.role} _id={user._id} />
                </TableCell >
                <TableCell align="right" > 
                  <DeleteUser _id={user._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="td"
                count={data.total_count || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersList;
