import React from "react";

const BillingTable = ({ billings, handleDelete, modalFor, handleModal }) => {
  return (
    <div className="overflow-x-auto mx-8">
      <table className="table table-normal w-full">
        <thead>
          <tr>
            <th>Billing ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Paid Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {billings.map((billing) => (
            <tr key={billing._id}>
              <td>{billing._id}</td>
              <td>{billing.name}</td>
              <td>{billing.email}</td>
              <td>{billing.phone}</td>
              <td>{billing.amount}</td>
              <td>
                <label
                  htmlFor={modalFor}
                  onClick={() => handleModal("Update Bill", "PATCH", billing)}
                  className="link"
                >
                  Edit
                </label>{" "}
                or{" "}
                <span onClick={() => handleDelete(billing)} className="link">
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingTable;
