import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="my-8 w-2/3 mx-auto p-10 bg-base-200 rounded-xl">
      <h2 className="text-4xl font-semibold text-center">Login</h2>
      <form>
        <div className="form-control my-2">
          <label className="label">Email</label>
          <input type="email" name="" className="input input-bordered" />
        </div>
        <div className="form-control my-2">
          <label className="label">Password</label>
          <input type="password" name="" className="input input-bordered" />
          <label className="label-text-alt">
            New to Biller?{" "}
            <Link to="/signup" className=" link link-hover">
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
