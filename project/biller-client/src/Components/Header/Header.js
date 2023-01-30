import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import bills from "../../asset/bills.json";

const Header = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center bg-indigo-400 backdrop-blur-xl p-8 gap-6 ">
      <div className="w-1/4">
        <h2 className="text-3xl lg:text-6xl font-bold text-white my-3">
          Power-Hack
        </h2>
        <p className="my-3 tracking-wide text-lg text-white">
          A place where your all bills are ready to update sorted adviced and
          re-generated.
          <br />
          <Link to="/billing-list" className="btn glass my-2">
            Bills
          </Link>
        </p>
      </div>
      <div className="w-1/2">
        <Lottie animationData={bills}></Lottie>
      </div>
    </div>
  );
};

export default Header;
