import { Input, Modal, notification, TreeSelect } from "antd";
import React, { useState, useImperativeHandle, useEffect } from "react";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
const { TreeNode } = TreeSelect;

function ModalAddPhieuTra({ onOK, loading = false, onEdit }, ref) {
  const [listBook, setListBook] = useState([]);
  const [user, setListUser] = useState([]);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState();
  const [value, setValue] = useState(undefined);
  const [newBook, setNewBook] = useState([]);
  const [newUser, setNewUser] = useState([]);

  async function handleGetBook() {
    try {
      const response = await common_post(apis.get_sach, {});
      if (response && response.status === "OK") {
        setListBook(response.result);
      }
    } catch (error) {
      throw error;
    }
  }

  async function handleGetUser() {
    try {
      const response = await common_post(apis.get_list_user, {});
      if (response && response.status === "OK") {
        setListUser(response.result);
      }
    } catch (error) {
      throw error;
    }
  }

  const onChangeBookTree = async (newValue) => {
    // console.log(newValue);
    setNewBook(newValue);
    // await handleGetListPhongDoc(newValue);
    // let response = await handleGetListKeSach(newValue);
    // console.log(response);
    // if (response.status === "OK") {
    //   setPhongDoc(response.result[0]);
    // }
  };

  const onChangeUserTree = async (newValue) => {
    // console.log(newValue)
    setNewUser(newValue);
  };
  // console.log(listphongDoc[0]);
  useEffect(() => {
    // handleGetBook()
    // handleGetUser()
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal(item) {
          if (item) {
            setCurrent(item);
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
    // current && setCurrent();
    setVisible(false);
  }

  function onPressOk() {
    if (current) {
      // onEdit(current, name, value);
    } else {
      onOK(newBook, newUser);
    }
  }
  // console.log(value);
  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      title="Thêm mới phiếu"
      onOk={onPressOk}
      confirmLoading={loading}
    >
      <span>Tên Sách</span>
      <TreeSelect
        showSearch
        style={{
          width: "100%",
        }}
        // value={value}
        dropdownStyle={{
          maxHeight: 400,
          overflow: "auto",
        }}
        placeholder={value ? value : "Chọn Sách"}
        allowClear
        multiple
        onDropdownVisibleChange={(open) => open && handleGetBook()}
        onChange={onChangeBookTree}
        // onLoadData = {handleGetBook()}
        treeData={listBook.map((c) => {
          return {
            value: c.ID,
            title: c.TEN_KE_SACH,
          };
        })}
      ></TreeSelect>

      <span>Tên người trả</span>
      <TreeSelect
        showSearch
        style={{
          width: "100%",
        }}
        // value={value}
        dropdownStyle={{
          maxHeight: 400,
          overflow: "auto",
        }}
        placeholder={value ? value : "Chọn Ke sach"}
        allowClear
        // treeDefaultExpandAll
        onDropdownVisibleChange={(open) => open && handleGetUser()}
        onChange={onChangeUserTree}
        treeData={user.map((c) => {
          return {
            value: c.ID,
            title: c.TEN_NGUOI_DUNG,
          };
        })}
      ></TreeSelect>
    </Modal>
  );
}

export default React.forwardRef(ModalAddPhieuTra);
