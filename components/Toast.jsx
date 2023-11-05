import React from 'react'
import Image from 'next/image'
const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", zIndex: 9, minWidth: "250px" }}
    >
      <div className={`toast-header ${bgColor} text-light`}>
        <strong className="mr-auto text-light">{msg.title}</strong>
        <button
          type="button"
          className="ml-2 mb-1 close ms-auto text-light"
          data-dismiss="toast"
          style={{
            outline: "none",
            backgroundColor: "transparent",
            border: "1px solid white",
          }}
          onClick={handleShow}
        >
          X
        </button>
      </div>

      <div className="toast-body">{msg.msg}</div>
    </div>
  );
};

export default Toast