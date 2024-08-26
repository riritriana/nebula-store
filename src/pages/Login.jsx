import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        Cookies.set("token", data.token, { expires: 1 }); // Simpan token dalam cookies, berakhir dalam 1 hari
        navigate("/");
      } else {
        setError("Login failed. Please check your username and password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-center text-2xl font-bold text-gray-700">Login</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </div>
      </form>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [login, setLogin] = useState(" ");

//   function handleLogin(e) {
//     e.preventDefault();
//     fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: "",
//         password: "",
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.token) {
//           localStorage.setItem("token", data.token);
//           navigate("/");
//         } else {
//           alert(
//             "Login gagal. Periksa kembali nama pengguna dan kata sandi Anda."
//           );
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Masuk</h2>
//         <form className="flex flex-col gap-4" onSubmit={handleLogin}>
//           <label className="flex flex-col">
//             <span className="text-gray-700 mb-2">Nama Pengguna</span>
//             <input
//               type="text"
//               value={login.username}
//               onChange={(e) => setLogin({ ...login, username: e.target.value })}
//               className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Masukkan nama pengguna"
//               required
//             />
//           </label>
//           <label className="flex flex-col">
//             <span className="text-gray-700 mb-2">Kata Sandi</span>
//             <input
//               type="password"
//               value={login.password}
//               onChange={(e) => setLogin({ ...login, password: e.target.value })}
//               className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Masukkan kata sandi"
//               required
//             />
//           </label>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
//           >
//             Masuk
//           </button>
//           <p className="mt-4 text-center">
//             Belum punya akun?{" "}
//             <span
//               className="text-blue-500 cursor-pointer"
//               onClick={() => navigate("/register")}
//             >
//               Daftar di sini
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
