import React, { useEffect, useState, useRef } from "react";
import styles from "./style.module.scss";
import {
  Row,
  Col,
  Button,
  Table,
  Space,
  Popconfirm,
  Tooltip,
  notification,
} from "antd";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
import TopHeader from "../../components/TopHeader";
import { DeleteOutlined, EditFilled, SelectOutlined } from "@ant-design/icons";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import ModalAddBookToStorage from "./ModalAddBookToStorage";
import { useSelector } from "react-redux";

function BookStorage() {
  const [bookStorage, setbookStorage] = useState([]);
  const user = useSelector((state) => state.auth.user);
  let storageRef = useRef();

  useEffect(() => {
    handleGetBookStorage();
  }, []);

  async function handleGetBookStorage() {
    try {
      let response = await common_post(apis.get_book_storage, {});
      if (
        response.status === "OK" &&
        response.result &&
        response.result.length
      ) {
        setbookStorage(response.result);
      }
    } catch (error) {}
  }

  async function handleAddBookToStorage(value) {
    let body = {
      data: value.data,
      NGUOI_DUNG_ID: user ? user.ID : "",
    };
    try {
      console.log(body);
      let response = await common_post(apis.add_book_storage, body);
      if (response.status === "KO")
        notification.error({ message: "Thêm mới thất bại" });
      else {
        handleGetBookStorage();
        notification.success({ message: "Thêm kho sách thành công" });
        storageRef.current.closeModal();
      }
    } catch (error) {}
  }

  function onClickRow() {}

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
    },
    {
      title: "Tên SÁCH",
      dataIndex: "TEN_SACH",
    },
    {
      title: "Tên Kệ Sách",
      dataIndex: "TEN_KE_SACH",
    },
    {
      title: "Tên Phòng Đọc",
      dataIndex: "TEN_PHONG_DOC",
    },
    {
      title: "Tên Tác Giả ",
      dataIndex: "TEN_TAC_GIA",
    },
    {
      title: "Số lượng",
      dataIndex: "SO_LUONG",
    },
  ];

  return (
    <div className={styles.container}>
      <TopHeader
        title="Kho sách"
        onAdd={() => storageRef.current.openModal()}
        onChangeSearch={(txt) => console.log(txt)}
        totalText={`${bookStorage.length}`}
      />
      <Table
        dataSource={bookStorage.map((item, index) => ({
          key: item.ID,
          ...item,
          STT: index + 1,
        }))}
        columns={columns}
        pagination={{ pageSize: 13 }}
        style={{ margin: "15px" }}
        scroll={{ y: "calc(100vh - 200px)" }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => onClickRow(record), // click row
          };
        }}
      />
      <ModalAddBookToStorage
        ref={storageRef}
        onOK={(value) => {
          handleAddBookToStorage(value);
        }}
      />
    </div>
  );
}

export default BookStorage;
