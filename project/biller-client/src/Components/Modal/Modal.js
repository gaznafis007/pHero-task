import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../api/AuthProvider";

const Modal = ({ modalFor, modalMethod, singleBill }) => {
  const navigate = useNavigate();
  const { setLoading, user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const handleAction = (data) => {
    setLoading(true);
    const userEmail = user?.email;
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const amount = data.amount;
    const bill = {
      userEmail,
      name,
      email,
      phone,
      amount,
    };
    if (modalMethod === "PATCH") {
      return fetch(`http://localhost:5000/update-billing/${singleBill._id}`, {
        method: `${modalMethod}`,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bill),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
        });
    }
    fetch("http://localhost:5000/add-billing", {
      method: `${modalMethod}`,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bill),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setLoading(false);
          navigate("/billing-list");
        }
      });
  };
  //   console.log(modalFor);
  return (
    <>
      <input type="checkbox" id={modalFor} className="modal-toggle" />
      <div className="modal p-6">
        <div className="modal-box relative">
          <label
            htmlFor={modalFor}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-3xl text-center font-bold my-3">{modalFor}</h3>
          <form className="p-2" onSubmit={handleSubmit(handleAction)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
                <br />
                <input
                  {...register("name")}
                  type="text"
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
                <input
                  {...register("email")}
                  type="text"
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
                <input
                  {...register("phone")}
                  type="text"
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Paid amount</span>
                <input
                  {...register("amount")}
                  type="text"
                  className="input input-bordered"
                />
              </label>
            </div>
            <button className="btn btn-block mt-2 btn-outline btn-success">
              {modalFor}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
