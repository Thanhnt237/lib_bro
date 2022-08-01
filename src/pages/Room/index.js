import React, { useEffect, useState, useRef } from "react";
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
import styles from "./style.module.scss";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
import TopHeader from "../../components/TopHeader";
import ModalAddRoom from "./ModalAddRoom";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
function RoomReading() {
  const addRef = useRef();
  const [listRoom, setListRoom] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    getListRoom();
  }, []);

  async function getListRoom(search_string = "") {
    setLoadingTable(true);
    let body = {
      search_string: search_string,
    };
    try {
      const response = await common_post(apis.get_list_reading_room, body);
      if (response && response.status === "OK") {
        setListRoom(response.result);
        setLoadingTable(false);
      }
    } catch (error) {}
  }

  async function handleAddRoom(roomName) {
    setLoadingAdd(true);
    try {
      let dataRequest = {
        data: [
          {
            TEN_PHONG_DOC: roomName,
          },
        ],
      };
      const response = await common_post(apis.add_reading_room, dataRequest);
      if (response && response.status === "KO")
        notification.error({ message: "Thêm phòng đọc thất bại" });
      if (response && response.status === "OK") {
        getListRoom();
        notification.success({ message: "Thêm phòng đọc thành công" });
        setLoadingAdd(false);
        addRef.current.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(item, name) {
    setLoadingAdd(true);
    try {
      let dataRequest = {
        ID: item.ID,
        TEN_PHONG_DOC: name,
      };
      const response = await common_post(apis.edit_reading_room, dataRequest);
      if (response && response.status === "OK") {
        getListRoom();
        notification.success({ message: "Sửa phòng đọc thành công" });
        setLoadingAdd(false);
        addRef.current.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(item) {
    try {
      let dataRequest = {
        ID: item.ID,
        TRANG_THAI: 0,
      };
      const response = await common_post(apis.edit_reading_room, dataRequest);
      if (response && response.status === "OK") {
        notification.success({ message: "Xóa phòng đọc thành công" });
        getListRoom();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onClickRow(item) {
    console.log(item);
    addRef.current.openModal(item);
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
    },
    {
      title: "Tên phòng đọc",
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

  return (
    <div className={styles.container}>
      <TopHeader
        title="Phòng đọc"
        onAdd={() => addRef.current.openModal()}
        onChangeSearch={(txt) => getListRoom(txt)}
        totalText={`Tổng số phòng : ${listRoom.length}`}
      />
      <Table
        dataSource={listRoom.map((item, index) => ({
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
        loading={loadingTable}
      />
      <ModalAddRoom
        ref={addRef}
        onOK={(roomName) => {
          handleAddRoom(roomName);
        }}
        onEdit={(item, name) => handleEdit(item, name)}
        loading={loadingAdd}
      />
    </div>
  );
}

export default RoomReading;
