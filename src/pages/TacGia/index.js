import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button, Table, Space, Popconfirm, Tooltip } from "antd";
import styles from "./style.module.scss";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
import TopHeader from "../../components/TopHeader";
// import ModalAddRoom from "./ModalAddRoom";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import ModalAddAuthor from "./ModalAddAuthor";
function Author() {
  const addRef = useRef();
  const [listAuthor, setListAuthor] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  useEffect(() => {
    getAuthor();
  }, []);
  async function handleAddAuthor(roomName) {
    setLoadingAdd(true);
    try {
      let dataRequest = {
        data: [
          {
            TEN_TAC_GIA: roomName,
          },
        ],
      };
      const response = await common_post(apis.add_tac_gia, dataRequest);
      if (response && response.status === "OK") {
        getAuthor();
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
        TEN_TAC_GIA: name,
      };
      const response = await common_post(apis.edit_tac_gia, dataRequest);
      if (response && response.status === "OK") {
        getAuthor();
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
      const response = await common_post(apis.edit_tac_gia, dataRequest);
      if (response && response.status === "OK") {
        getAuthor();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onClickRow(item) {
    console.log(item);
    addRef.current.openModal(item);
  }
  async function getAuthor(search_string = "") {
    setLoadingTable(true);
    let body = {
      search_string: search_string,
    };
    try {
      const response = await common_post(apis.get_tac_gia, body);
      if (response && response.status === "OK") {
        setListAuthor(response.result);
        setLoadingTable(false);
      }
    } catch (error) {}
  }
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
    },
    {
      title: "Tên tác giả ",
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
            title="Bạn có chắc chắn muốn xóa tác giả này không?"
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
        title="Tác Giả"
        onAdd={() => addRef.current.openModal()}
        // onChangeSearch={(txt) => getListRoom(txt)}
        totalText={listAuthor?.length}
      />
      <Table
        dataSource={listAuthor.map((item, index) => ({
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
      <ModalAddAuthor
        ref={addRef}
        onOK={(roomName) => {
          handleAddAuthor(roomName);
        }}
        onEdit={(item, name) => handleEdit(item, name)}
        loading={loadingAdd}
      />
    </div>
  );
}

export default Author;
