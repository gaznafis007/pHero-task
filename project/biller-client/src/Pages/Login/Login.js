import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../api/AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const handleLogin = (data) => {
    const email = data.email;
    const password = data.password;
    console.log(email, password);
    login(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        const currentUser = { email: user.email };
        console.log(currentUser);
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("distributionToken", data.token);
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="my-8 w-2/3 mx-auto p-10 bg-base-200 rounded-xl">
      <h2 className="text-4xl font-semibold text-center">Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="form-control my-2">
          <label className="label">Email</label>
          <input
            {...register("email")}
            type="email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control my-2">
          <label className="label">Password</label>
          <input
            {...register("password")}
            type="password"
            className="input input-bordered"
          />
          <label className="label-text-alt">
            New to Biller?{" "}
            <Link to="/registration" className=" link link-hover">
              Register
            </Link>
          </label>
        </div>
        <button className="my-4 btn btn-success btn-block text-white">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Login;
