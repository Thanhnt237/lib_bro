import { Input, Modal, notification, TreeSelect } from "antd";
import React, { useState, useImperativeHandle, useEffect } from "react";

function ModalAddCategory({ onOK, loading = false, onEdit }, ref) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [current, setCurrent] = useState();
  const [value, setValue] = useState(undefined);

  const onChange = (newValue) => {
    setValue(newValue);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal(item) {
          if (item) {
            setCurrent(item);
            setName(item.TEN_DANH_MUC);
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
      notification.warning({ message: "Vui lòng điền tên danh mục" });
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
      title="Thêm mới danh mục sách"
      onOk={onPressOk}
      confirmLoading={loading}
    >
      <span>Tên danh mục</span>
      <Input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Nhập tên danh mục"
        style={{ marginTop: "10px" }}
      />
    </Modal>
  );
}

export default React.forwardRef(ModalAddCategory);
