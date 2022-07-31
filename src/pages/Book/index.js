import React, { useEffect, useState, useRef } from "react";
import { Button, Table, Space, Popconfirm, Tooltip } from "antd";
import styles from "./style.module.scss";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
import TopHeader from "../../components/TopHeader";
import { DeleteOutlined, SelectOutlined} from "@ant-design/icons";
import ModalAddBook from "./ModalAddBook";

function Book() {
  const [listSach, setListSach] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const addRef = useRef();

  async function getSach() {
    try {
      const response = await common_post(apis.get_sach, {});
      if (response && response.status === "OK") {
        setListSach(response.result);
      }
    } catch (error) {
      throw error;
    }
  }
  async function handleAddBook(Book, value, author) {
    console.log(Book);
    console.log(value);
    console.log(author);
    setLoadingAdd(true);
    try {
      let dataRequest = {
        data: [
          {
            TEN_SACH: Book,
            KE_SACH_ID: value,
            TAC_GIA_ID: author,
          },
        ],
      };
      const response = await common_post(apis.add_sach, dataRequest);
      if (response && response.status === "OK") {
        getSach();
        setLoadingAdd(false);
        addRef.current.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleLendBook(){
    setLoadingAdd(true);
  }
  function onClickRow(item) {
    console.log(item);
    addRef.current.openModal(item);
  }
  async function handleDelete(item) {
    console.log(item);
    try {
      let dataRequest = {
        ID: item.ID,
        TRANG_THAI: 0,
      };
      const response = await common_post(apis.edit_sach, dataRequest);
      if (response && response.status === "OK") {
        getSach();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleEdit(item, name, value) {
    console.log(item);
    console.log(name);
    console.log(value);
    setLoadingAdd(true);
    try {
      let dataRequest = {
        ID: item.ID,
        TEN_SACH: name,
        KE_SACH_ID: value,
      };
      const response = await common_post(apis.edit_sach, dataRequest);
      if (response && response.status === "OK") {
        getSach();
        setLoadingAdd(false);
        addRef.current.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSach();
  }, []);
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
      title: "",
      // render: (record) => (
      //   <Dropdown
      //     overlay={
      //       <Menu>
      //         <Menu.Item icon={<EditOutlined />}>Chỉnh sửa</Menu.Item>
      //         <Menu.Item icon={<DeleteOutlined />}>Xóa</Menu.Item>
      //       </Menu>
      //     }
      //   >
      //     <Button icon={<EllipsisOutlined />} type="text"></Button>
      //   </Dropdown>
      // ),
      render: (record) => (
        <Space>
          {/* {isAtEditPage && (
            <Tooltip title="Chỉnh sửa">
              <Button
                type="primary"
                icon={<EditFilled />}
                onClick={() => handleEdit(record)}
              ></Button>
            </Tooltip>
          )} */}

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa phòng này không?"
            onConfirm={(e) => {
              e.stopPropagation();
              handleDelete(record);
            }}
            okText="Chắn chắn"
            cancelText="Quay lại"
          >
            <Tooltip title="Xóa">
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => e.stopPropagation()}
              ></Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  return (
    <div className={styles.container}>
      <TopHeader
        title="Sách"
        onAdd={() => addRef.current.openModal()}
        // onChangeSearch={(txt) => console.log(txt)}
        // totalText={`Tổng số Kệ Sách : `}
      />
      <Table
        dataSource={listSach.map((item, index) => ({
          key: index,
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
    </div>
  );
}

export default Book;
