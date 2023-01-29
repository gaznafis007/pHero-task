import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../api/AuthProvider";

const Signup = () => {
  const { signup, getProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const handleSignup = (data) => {
    // console.log(data);
    const displayName = data.name;
    const email = data.email;
    const password = data.password;
    console.log(displayName, email, password);
    signup(email, password)
      .then((res) => {
        const user = res.user;
        // console.log(res);
        getProfile(displayName);
        console.log(user);
        logout();
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="my-8 w-2/3 mx-auto p-10 bg-base-200 rounded-xl">
      <h2 className="text-4xl font-semibold text-center">Sign up Now</h2>
      <form onSubmit={handleSubmit(handleSignup)}>
        <div className="form-control my-2">
          <label className="label">
            {" "}
            <span className="label-text">Your Name</span>
          </label>
          <input
            {...register("name")}
            type="text"
            className="input input-bordered"
          />
        </div>
        <div className="form-control my-2">
          <label className="label">
            {" "}
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email")}
            type="email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control my-2">
          <label className="label">
            {" "}
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password")}
            type="password"
            className="input input-bordered"
          />
          <label className="label-text-alt my-1">
            Already have an account?{" "}
            <Link to="/login" className=" link link-hover">
              Login
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

export default Signup;
