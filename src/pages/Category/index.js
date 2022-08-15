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
import { common_post, exportToCSV } from "../../helpers";
import { apis } from "../../constants";
import TopHeader from "../../components/TopHeader";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import ModalAddBookshelf from "./ModalAddCategory";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import ModalAddCategory from "./ModalAddCategory";

function Category() {
  const [category, setCategory] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const addRef = useRef();

  async function getCategory(search_string = "") {
    try {
      const response = await common_post(apis.get_category, {
        search_string: search_string,
      });
      if (response && response.status === "OK") {
        setCategory(response.result);
      }
    } catch (error) {
      throw error;
    }
  }
  async function handleEdit(item, newName) {
    console.log(item)
    setLoadingAdd(true);
    try {
      let dataRequest = {
        ID: item.ID,
        TEN_DANH_MUC: newName,
      };
      const response = await common_post(apis.update_category, dataRequest);
      if (response && response.status === "OK") {
        getCategory();
        notification.success({ message: "Sửa danh mục thành công!" });
        setLoadingAdd(false);
        addRef.current.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddCategory(categoryName) {
    console.log(categoryName);
    setLoadingAdd(true);
    try {
      let dataRequest = {
        data: [
          {
            TEN_DANH_MUC: categoryName,
          },
        ],
      };
      const response = await common_post(apis.add_category, dataRequest);
      if (response && response.status === "KO")
        notification.error({ message: "Thêm danh mục thất bại" });

      if (response && response.status === "OK") {
        getCategory();
        setLoadingAdd(false);
        notification.success({ message: "Thêm danh mục thành công" });
        addRef.current.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(item) {
    console.log(item);
    try {
      let dataRequest = {
        ID: item.ID,
        TRANG_THAI: 0,
      };
      const response = await common_post(apis.update_category, dataRequest);
      if (response && response.status === "KO") {
        notification.success({ message: "Xóa danh mục thất bại" });
      }
      if (response && response.status === "OK") {
        notification.success({ message: "Xóa danh mục thành công" });
        getCategory();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
    },
    {
      title: "Tên danh mục",
      dataIndex: "TEN_DANH_MUC",
    },
    {
      title: "",
      render: (record) => (
        <Space>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa danh mục này không?"
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
        title="Danh mục"
        onAdd={() => addRef.current.openModal()}
        onChangeSearch={(txt) => getCategory(txt)}
        totalText={`Tổng danh mục : ${category.length}`}
      />
      <Table
        dataSource={category.map((item, index) => ({
          ...item,
          key: item.ID,
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
      <ModalAddCategory
        ref={addRef}
        onOK={(categoryName) => {
          handleAddCategory(categoryName);
        }}
        onEdit={(item, newName) => handleEdit(item, newName)}
        loading={loadingAdd}
      />
    </div>
  );
}

export default Category;
