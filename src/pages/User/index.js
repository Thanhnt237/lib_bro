import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import SwitchCustom from "../../components/SwitchCustom";
import TopHeader from "../../components/TopHeader";
import { apis } from "../../constants";
import { common_post } from "../../helpers";
import ModalConfigUser from "./ModalConfigUser";
import styles from "./style.module.scss";

function User() {
  const addRef = useRef();
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    getListUser();
  }, []);

  async function getListUser(search_string = "") {
    setLoadingTable(true);
    let body = {
      search_string: search_string,
    };
    try {
      const response = await common_post(apis.get_list_user, body);
      if (response && response.status === "OK") {
        setListUser(response.result);
        setLoadingTable(false);
      }
    } catch (error) {}
  }

  async function handleAddUser(user) {
    setLoadingAdd(true);
    try {
      const response = await common_post(apis.add_user, { data: [user] });
      if (response && response.status === "OK") {
        setLoadingAdd(false);
        addRef.current.closeModal();
        getListUser();
      }
    } catch (error) {}
  }

  async function handleEditUser(current, values) {
    setLoadingAdd(true);
    try {
      const response = await common_post(apis.edit_user, {
        ID: current.ID,
        ...values,
      });
      if (response && response.status === "OK") {
        setLoadingAdd(false);
        addRef.current.closeModal();
        getListUser();
      }
    } catch (error) {}
  }

  function handleDelete() {}

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
      title: "Tên người dùng",
      dataIndex: "TEN_NGUOI_DUNG",
    },
    {
      title: "Username",
      dataIndex: "USERNAME",
    },
    {
      title: "Trạng thái",
      dataIndex: "KHOA",
      render: (KHOA, item) => (
        <div onClick={(e) => e.stopPropagation()}>
          <SwitchCustom
            initChecked={KHOA}
            api={apis.edit_user}
            dataRequest={{ ID: item.ID }}
            key_data="KHOA"
          />
        </div>
      ),
    },
    {
      title: "",
      render: (record) => (
        <Space onClick={(e) => e.stopPropagation()}>
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
              handleEditUser(record, { ...record, TRANG_THAI: 0 });
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
        title="Danh sách người dùng"
        onAdd={() => addRef.current.openModal()}
        onChangeSearch={(txt) => getListUser(txt)}
        totalText={`Tổng số người dùng : ${listUser.length}`}
      />

      <Table
        dataSource={listUser.map((item, index) => ({
          ...item,
          STT: index + 1,
          key: Math.random(),
        }))}
        columns={columns}
        pagination={{ pageSize: 13 }}
        style={{ margin: "15px" }}
        scroll={{ y: "calc(100vh - 200px)" }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
              onClickRow(record);
            }, // click row
          };
        }}
        loading={loadingTable}
      />
      <ModalConfigUser
        ref={addRef}
        onOK={(user) => {
          handleAddUser(user);
        }}
        onEdit={(current, values) => handleEditUser(current, values)}
        loading={loadingAdd}
      />
    </div>
  );
}

export default User;
