import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        setMessage("Registration successful! You can now log in.");
        setError("");
        setTimeout(() => {
          navigate("/login"); //
        }, 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-center text-2xl font-bold text-gray-700">Register</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {message && <p className="text-green-500 text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Pastikan ini diimport

// export default function Register() {
//   const navigate = useNavigate();
//   const [register, setregister] = useState({ username: "", password: "" });
//   function handleSubmit(e) {
//     e.preventDefault();
//     fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(register),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         localStorage.setItem("token", data.token);
//         navigate("/login");
//       });
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
//         <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//           <label className="flex flex-col">
//             <span className="text-gray-700 mb-2">Nama Pengguna</span>
//             <input
//               id="username"
//               type="text"
//               onChange={(e) => setregister(e.target.value)}
//               className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Masukkan nama pengguna"
//             />
//           </label>
//           <label className="flex flex-col">
//             <span className="text-gray-700 mb-2">Kata Sandi</span>
//             <input
//               onChange={(e) => setregister(e.target.value)}
//               type="password"
//               className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Masukkan kata sandi"
//             />
//           </label>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
//           >
//             Daftar
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
