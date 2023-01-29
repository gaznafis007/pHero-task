import React from "react";
import { useForm } from "react-hook-form";

const Modal = ({ modalFor, handleAdd }) => {
  const { register, handleSubmit } = useForm();
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
          <form className="p-2" onSubmit={handleSubmit(handleAdd)}>
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
