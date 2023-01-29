import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const handleLogin = (data) => {
    console.log(data);
  };
  return (
    <div className="my-8 w-2/3 mx-auto p-10 bg-base-200 rounded-xl">
      <h2 className="text-4xl font-semibold text-center">Sign up Now</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
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
