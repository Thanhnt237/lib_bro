import { Input, Modal, notification, TreeSelect } from "antd";
import React, { useState, useImperativeHandle, useEffect } from "react";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
const { TreeNode } = TreeSelect;

function ModalAddBookshelf({ onOK, loading = false, onEdit }, ref) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [current, setCurrent] = useState();
  const [value, setValue] = useState(undefined);
  const [listPhongDoc, setListPhongDoc] = useState([]);

  const onChange = (newValue) => {
    setValue(newValue);
  };

  async function handleGetListPhongDoc() {
    try {
      const response = await common_post(apis.get_list_reading_room, {});
      if (response && response.status === "OK") {
        setListPhongDoc(response.result);
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    handleGetListPhongDoc();
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal(item) {
          if (item) {
            setCurrent(item);
            setName(item.TEN_KE_SACH);
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
      notification.warning({ message: "Vui lòng điền tên kệ" });
      return;
    }
    if (current) {
      onEdit(current, name, value);
    } else {
      onOK(name, value);
    }
  }
  console.log(value);
  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      title="Thêm mới phòng đọc"
      onOk={onPressOk}
      confirmLoading={loading}
    >
      <span>Tên Ke sach</span>
      <Input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Nhập tên kệ sách"
        style={{ marginTop: "10px" }}
      />

      <span>Tên phòng</span>
      <TreeSelect
        showSearch
        style={{
          width: "100%",
        }}
        value={value}
        dropdownStyle={{
          maxHeight: 400,
          overflow: "auto",
        }}
        placeholder={value ? "Chọn phòng đọc" : value}
        allowClear
        // treeDefaultExpandAll
        onChange={onChange}
        treeData={listPhongDoc.map((c) => {
          return {
            value: c.ID,
            title: c.TEN_PHONG_DOC,
          };
        })}
      ></TreeSelect>
    </Modal>
  );
}

export default React.forwardRef(ModalAddBookshelf);
