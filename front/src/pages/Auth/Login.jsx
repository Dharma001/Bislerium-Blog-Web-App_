import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();

  const [showpassword, setshowpassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({});
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Username is requigreen";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is requigreen";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("https://localhost:7189/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const { token, roleId, userId } = await response.json();
        Cookies.set("token", token, { expires: 30 / 1440 });
        Cookies.set("roleId", roleId, { expires: 30 / 1440 });
        Cookies.set("userId", userId, { expires: 30 / 1440 });
        if (roleId === 1) {
          navigate("/admin/dashboard");
          toast.success("Admin!");
        } else if (roleId === 2) {
          navigate("/");
          toast.success("Login successful welcome to Bislerium!");
        } else {
          navigate("/");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Invalid Username or Password");
      }
    } catch (error) { /* empty */ }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-opacity-10 backdrop-blur-md rounded-xl border border-gray-300 p-6 max-w-sm w-full bg-slate-0">
        <img src="./newlogo.png" className="mx-auto w-16 " alt="" />
        <p className="text-orange-400 text-center text-sm font-light">Bislerium Blog</p>
        <h2 className="mt-1 text-3xl font-bold text-center">Login</h2>
        <p className="mt-2 text-pretty text-center text-gray-500">Welcome To Bislerium Blog</p>
        <form onSubmit={handleLogin} className="mt-6">
          <div>
            <div className="relative">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder=" "
                className="block pl-12 pb-2.5 pt-4 w-full text-sm text-gray-900 border  rounded border-1 border-gray-300 appearance-none  dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                autoComplete="off"
                autoFocus="on"
              />
              <label htmlFor="email" className="absolute bg-transparent text-sm  duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 mx-10 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Email</label>

              <div className="absolute inset-y-0 pl-2 ml-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2rem" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m15.489 21.27l-3.558-3.558l.708-.708l2.85 2.85l5.688-5.688l.708.707zM12 11l7.692-5H4.308zm0 1.116L4 6.885v10.5q0 .269.173.442t.443.173H9.4l1 1H3V5h18v6.542l-1 1V6.885zm0 0" />
                </svg>
              </div>
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}

          </div>
          <div className="mt-4">
            <div className="relative">
              <input
                type={showpassword ? "text" : "password"}
                name="password"
                placeholder=""
                value={formData.password}
                onChange={handleInputChange}
                className="block pl-12 pb-2.5 pt-4 w-full text-sm text-gray-900 border  rounded border-1 border-gray-300 appearance-none  dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                autoComplete="off"
                autoFocus="on"
              />
              <label htmlFor="password" className="absolute bg-transparent text-sm  duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 mx-10 peer-focus:px-2 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Password</label>
              <div className="absolute pl-2 ml-2 inset-y-4 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="2rem" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M24 25.28a3.26 3.26 0 0 0-1.64 6.07V36h3.32v-4.65a3.28 3.28 0 0 0 1.61-2.8v0A3.27 3.27 0 0 0 24 25.28" /><rect width="33.23" height="25.73" x="7.38" y="17.77" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" rx="4.32" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M13.35 17.77v-2.61a10.66 10.66 0 0 1 21.32 0v2.61" /></svg>

              </div>
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setshowpassword(!showpassword)}
              >
                {showpassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z"
                    />
                  </svg>
                )}
              </div>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="flex text-center mt-1">
            <span className="text-sm text-gray-500 p-1">
              <a href="/forgotPassword" className="px-1 text-sm  hover:text-blue-500 font-bold">Forgot Password?</a></span>
          </div>
          <button type="submit" className="mt-4 w-full px-5 py-3 text-white bg-orange-400 rounded hover:bg-orange-600 border-gray-500">Login</button>
          <div className="flex items-center justify-center mt-2">
            <p className="text-sm text-gray-500">
              Don't have an account?</p>

            <a href="/register" className="px-2 text-sm  hover:text-blue-500 font-bold">Click here to Register</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
