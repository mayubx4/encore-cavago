import { Modal } from "antd";
import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

const Dialog = ({ open, toggleOpen, children }) => {
  return (
    <Modal
      open={open}
      //   onOk={() => toggleOpen()}
      onCancel={() => toggleOpen()}
      //   onClose={() => toggleOpen()}
      styles={{
        content: { padding: 0, maxWidth: "1414px", margin: "auto" },
      }}
      width='100%'
      footer={null}
      centered
      maskClosable={true}
      closeIcon={<CloseCircleOutlined style={{ fontSize: "48px" }} />}
    >
      {children}
    </Modal>
  );
};

export default Dialog;
