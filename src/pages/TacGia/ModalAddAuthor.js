import { Input, Modal, notification } from "antd";
import React, { useState, useImperativeHandle } from "react";

function ModalAddAuthor({ onOK, loading = false, onEdit }, ref) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [current, setCurrent] = useState();

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal(item) {
          if (item) {
            setCurrent(item);
            setName(item.TEN_TAC_GIA);
          }
          setVisible(true);
        },
        closeModal() {
          handleClose();
        },
      };
    },
    []
  );

  function handleClose() {
    setName("");
    current && setCurrent();
    setVisible(false);
  }

  function onPressOk() {
    if (name === "") {
      notification.warning({ message: "Vui lòng điền tên tác giả" });
      return;
    }
    if (current) {
      onEdit(current, name);
    } else {
      onOK(name);
    }
  }
  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      title="Thêm mới tác giả"
      onOk={onPressOk}
      confirmLoading={loading}
    >
      <span>Tên Tác Giả</span>
      <Input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Nhập tên tác giả"
        style={{ marginTop: "10px" }}
      />
    </Modal>
  );
}

export default React.forwardRef(ModalAddAuthor);
