import React, { useState } from "react";
import { Pagination } from "antd";
import "./customPagination.css";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

const CustomPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Adjust this according to your total pages

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        style={{ marginRight: "8px" }}
        className='rounded-full w-12 h-12 bg-white border border-[#F1F1F1] border-solid'
      >
        <DoubleLeftOutlined />
      </button>

      <Pagination
        current={currentPage}
        total={totalPages * 10}
        onChange={handlePageChange}
        showSizeChanger={false}
        className='custom-pagination flex'
      />
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        style={{ marginLeft: "8px" }}
        className='rounded-full w-12 h-12 bg-white border border-[#F1F1F1] border-solid'
      >
        <DoubleRightOutlined />
      </button>
    </div>
  );
};

export default CustomPagination;
