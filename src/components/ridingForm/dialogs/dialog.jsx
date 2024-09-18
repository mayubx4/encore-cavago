import { Modal } from "antd";
import React from "react";
// import { CloseCircleOutlined } from "@ant-design/icons";
import "./dialog.css";
import { useWhichDeviceContext } from "@shared/hooks/whichDeviceContext";

const Dialog = ({ open, toggleOpen, children }) => {
  const device = useWhichDeviceContext();
  return (
    <Modal
      open={open}
      //   onOk={() => toggleOpen()}
      onCancel={() => toggleOpen()}
      //   onClose={() => toggleOpen()}
      styles={{
        content: {
          padding: "0px",
          maxWidth: "1414px",
          margin: "auto",
          height: "calc(100vh - 80px)",
          borderRadius: device === "desktop" ? "24px" : "12px",
        },
      }}
      width='100%'
      footer={null}
      centered
      maskClosable={true}
      // closeIcon={<CloseCircleOutlined style={{ fontSize: "48px" }} />}
    >
      {children}
    </Modal>
  );
};

export default Dialog;
