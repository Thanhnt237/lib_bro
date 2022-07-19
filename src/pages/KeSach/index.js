import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button, Table, Space, Popconfirm, Tooltip } from "antd";
import styles from "./style.module.scss";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
import TopHeader from "../../components/TopHeader";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import ModalAddBookshelf from "./ModalAddBookshelf";
import ColumnGroup from "antd/lib/table/ColumnGroup";

function KeSach() {
  const [listKeSach, setListKeSach] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const addRef = useRef();

  async function getKeSach() {
    try {
      console.log("zxc");
      const response = await common_post(apis.get_ke_sach, {});
      if (response && response.status === "OK") {
        setListKeSach(response.result);
      }
    } catch (error) {
      throw error;
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
        TEN_KE_SACH: name,
        PHONG_DOC_ID: value,
      };
      const response = await common_post(apis.edit_ke_sach, dataRequest);
      if (response && response.status === "OK") {
        getKeSach();
        setLoadingAdd(false);
        addRef.current.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAddBookShelf(roomBookShelf, value) {
    console.log(roomBookShelf, value);
    setLoadingAdd(true);
    try {
      let dataRequest = {
        data: [
          {
            PHONG_DOC_ID: value,
            TEN_KE_SACH: roomBookShelf,
          },
        ],
      };
      const response = await common_post(apis.them_ke_sach, dataRequest);
      if (response && response.status === "OK") {
        getKeSach();
        setLoadingAdd(false);
        addRef.current.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(listKeSach);
  async function handleDelete(item) {
    console.log(item);
    try {
      let dataRequest = {
        ID: item.ID,
        TRANG_THAI: 0,
      };
      const response = await common_post(apis.edit_ke_sach, dataRequest);
      if (response && response.status === "OK") {
        getKeSach();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getKeSach();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
    },
    {
      title: "Tên kệ sách",
      dataIndex: "TEN_KE_SACH",
    },
    {
      title: "Tên Phòng",
      dataIndex: "TEN_PHONG_DOC",
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
    },
  ];

  function onClickRow(item) {
    console.log(item);
    addRef.current.openModal(item);
  }

  return (
    <div className={styles.container}>
      <TopHeader
        title="Kệ Sách"
        onAdd={() => addRef.current.openModal()}
        onChangeSearch={(txt) => console.log(txt)}
        totalText={`Tổng số Kệ Sách : `}
      />
      <Table
        dataSource={listKeSach.map((item, index) => ({
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
      <ModalAddBookshelf
        ref={addRef}
        onOK={(roomBookShelf, value) => {
          handleAddBookShelf(roomBookShelf, value);
        }}
        onEdit={(item, name, value) => handleEdit(item, name, value)}
        loading={loadingAdd}
      />
    </div>
  );
}

export default KeSach;
