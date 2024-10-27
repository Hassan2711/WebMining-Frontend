// app/services/route.js or app/services/route.ts

// import { BACKEND_URL } from "@/components/ui/Login";

// export const getToken = async (username, password) => {
//     try {
//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//         const urlencoded = new URLSearchParams();
//         urlencoded.append("username", username);
//         urlencoded.append("password", password);

//         const requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: urlencoded,
//             redirect: "follow"
//         };

//         const response = await fetch("http://localhost:8000/token", requestOptions);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const result = await response.text();
//         return result; // Assuming the result is the token or you can adjust this as needed
//     } catch (error) {
//         console.error("Error fetching token:", error);
//         return null;
//     }
// };


// utils/api.js
// export async function updateUser(id, updatedUser, token) {
//     const response = await fetch(`${BACKEND_URL}/update_user`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`, // Assuming you use JWT or similar for authentication
//       },
//       body: JSON.stringify({
//         id,
//         updated_user: updatedUser,
//       }),
//     });
  
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.detail || 'Something went wrong');
//     }
  
//     return await response.json();
//   }
  