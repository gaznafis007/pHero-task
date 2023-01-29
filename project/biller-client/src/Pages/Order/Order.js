import React, { useEffect, useState } from "react";

const Order = () => {
  const [billings, setBillings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const pages = [...Array(count / 10).keys()];
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    fetch("http://localhost:5000/billings?currentPage=${currentPage}", {
      headers: {
        authorization: `bearer ${localStorage.getItem("distributionToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCount(data.count);
        setBillings(data.result);
      });
  }, [currentPage]);
  return (
    <div>
      <h2 className="text-4xl font-semibold text-center">Billing Table</h2>
      {/* <div className="btn-group">
        <button  className="btn">«</button>
        <button className="btn">Page 22</button>
        <button className="btn">»</button>
      </div> */}
      <div className="btn-group">
        {pages.map((page) => (
          <button onClick={handleCurrentPage} key={page} className="btn">
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Order;
