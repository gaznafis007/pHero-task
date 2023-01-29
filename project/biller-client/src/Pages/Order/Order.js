import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../api/AuthProvider";
import Modal from "../../Components/Modal/Modal";
import BillingTable from "./BillingTable";

const Order = () => {
  const navigate = useNavigate();
  const { user, setLoading } = useContext(AuthContext);
  const [billings, setBillings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const pageCount = Math.ceil(count / 10);
  const pages = [...Array(pageCount).keys()];
  //   console.log(pages);
  const [modalFor, setModalFor] = useState("");
  const [singleBill, setSingleBill] = useState({});
  const [modalMethod, setModalMethod] = useState("");
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };
  //   const handleAdd = (data) => {
  //     setLoading(true);
  //     const userEmail = user?.email;
  //     const name = data.name;
  //     const email = data.email;
  //     const phone = data.phone;
  //     const amount = data.amount;
  //     const bill = {
  //       userEmail,
  //       name,
  //       email,
  //       phone,
  //       amount,
  //     };
  //     fetch("http://localhost:5000/billings", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(bill),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         if (data.acknowledged) {
  //           setLoading(false);
  //           navigate("/billing-list");
  //         }
  //       });
  //   };

  const handleDelete = (item) => {
    setLoading(true);
    fetch(`http://localhost:5000/billings/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          const newBills = billings.filter(
            (billing) => item._id !== billing._id
          );
          setBillings(newBills);
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    fetch(
      `http://localhost:5000/billings?currentPage=${currentPage}&email=${user?.email}`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("distributionToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCount(data.count);
        setBillings(data.result);
        setLoading(false);
      });
  }, [currentPage, billings]);
  const handleModal = (modalName, modalMethod, bill) => {
    setModalFor(modalName);
    setModalMethod(modalMethod);
    setSingleBill(bill);
  };
  return (
    <section>
      <h2 className="text-4xl font-semibold text-center">Billing Table</h2>
      {/* <div className="btn-group">
        <button  className="btn">«</button>
        <button className="btn">Page 22</button>
        <button className="btn">»</button>
      </div> */}
      <div className="w-3/5 mx-auto p-6 my-6 bg-base-200 flex justify-between">
        <form>
          <label className="label-text">Billings</label>
          <input type="text" name="" className="input input-bordered mx-3" />
          <button className="btn btn-sm btn-outline">search</button>
        </form>
        <div>
          <label
            htmlFor={modalFor}
            onClick={() => handleModal("Add Bill", "POST")}
            className="btn btn-primary"
          >
            Add new bill
          </label>
        </div>
      </div>
      <div className="my-4">
        <BillingTable
          billings={billings}
          handleDelete={handleDelete}
          modalFor={modalFor}
          handleModal={handleModal}
        ></BillingTable>
      </div>

      <div className="mx-auto w-1/2 text-center">
        <div className="btn-group">
          {pages.map((page) => (
            <button
              key={page}
              className="btn"
              onClick={() => handleCurrentPage(page)}
            >
              {page + 1}
            </button>
          ))}
          {/* {pages.map((page) => (
          <button
            onClick={() => handleCurrentPage(page)}
            key={page}
            className="btn"
          >
            {page}
          </button>
        ))} */}
        </div>
      </div>
      <Modal
        modalFor={modalFor}
        modalMethod={modalMethod}
        singleBill={singleBill}
      ></Modal>
    </section>
  );
};

export default Order;
