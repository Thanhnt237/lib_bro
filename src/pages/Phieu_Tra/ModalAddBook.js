import { Input, Modal, notification, TreeSelect } from "antd";
import React, { useState, useImperativeHandle, useEffect } from "react";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
const { TreeNode } = TreeSelect;

function ModalAddBook({ onOK, loading = false, onEdit }, ref) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [current, setCurrent] = useState();
  const [listKeSach, setListKeSach] = useState([]);
  const [listphongDoc, setListPhongDoc] = useState("");
  const [value, setValue] = useState(undefined);

  async function handleGetListKeSach(KE_SACH_ID = "") {
    try {
      const response = await common_post(apis.get_ke_sach, {
        KE_SACH_ID: KE_SACH_ID,
      });
      if (response && response.status === "OK") {
        setListKeSach(response.result);
      }
    } catch (error) {
      throw error;
    }
  }
  async function handleGetListPhongDoc(KE_SACH_ID) {
    try {
      const response = await common_post(apis.lay_phong_doc_theo_ke_sach, {
        KE_SACH_ID: KE_SACH_ID,
      });
      if (response && response.status === "OK") {
        setListPhongDoc(response.result[0].TEN_PHONG_DOC);
        // console.log(response);
      }
    } catch (error) {
      throw error;
    }
  }

  const onChange = async (newValue) => {
    // console.log(newValue);
    setValue(newValue);
    await handleGetListPhongDoc(newValue);
    // let response = await handleGetListKeSach(newValue);
    // console.log(response);
    // if (response.status === "OK") {
    //   setPhongDoc(response.result[0]);
    // }
  };
  // console.log(listphongDoc[0]);
  useEffect(() => {
    handleGetListKeSach();
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal(item) {
          if (item) {
            setCurrent(item);
            setName(item.TEN_SACH);
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
      notification.warning({ message: "Vui lòng điền tên sách" });
      return;
    }
    if (current) {
      onEdit(current, name, value);
    } else {
      onOK(name, value);
    }
  }
  // console.log(value);
  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      title="Thêm mới Sách"
      onOk={onPressOk}
      confirmLoading={loading}
    >
      <span>Tên Sách</span>
      <Input
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Nhập tên kệ sách"
        style={{ marginTop: "10px" }}
      />

      <span>Tên Kệ Sách</span>
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
        placeholder={value ? value : "Chọn Ke sach"}
        allowClear
        // treeDefaultExpandAll
        onChange={onChange}
        treeData={listKeSach.map((c) => {
          return {
            value: c.ID,
            title: c.TEN_KE_SACH,
          };
        })}
      ></TreeSelect>
      <div>{listphongDoc}</div>
    </Modal>
  );
}

export default React.forwardRef(ModalAddBook);
