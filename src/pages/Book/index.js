import React, { useEffect, useState, useRef } from "react";
import { Button, Table, Space, Popconfirm, Tooltip } from "antd";
import styles from "./style.module.scss";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
import TopHeader from "../../components/TopHeader";
import { DeleteOutlined } from "@ant-design/icons";
import ModalAddBook from "./ModalAddBook";

function Book() {
  const [listSach, setListSach] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [listCategory, setListCategory] = useState([])
  const addRef = useRef();

  async function getSach(search_string = "", DANH_MUC_ID="") {
    try {
      const response = await common_post(apis.get_sach, {
        search_string: search_string,
        DANH_MUC_ID: DANH_MUC_ID
      });
      if (response && response.status === "OK") {
        setListSach(response.result);
      }
    } catch (error) {
      throw error;
    }
  }
  async function handleGetListCategory() {
    try {
      const response = await common_post(apis.get_category, {});
      if (response && response.status === "OK") {
        setListCategory(response.result);
      }
    } catch (error) {
      throw error;
    }
  }
  async function handleAddBook(values) {
    setLoadingAdd(true);
    try {
      let dataRequest = {
        data: [values],
      };
      console.log(values)
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
  async function handleLendBook() {
    setLoadingAdd(true);
  }
  function onClickRow(item) {
    addRef.current.openModal(item);
  }
  async function handleDelete(item) {
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
  async function handleEdit(values) {
    console.log(values)
    setLoadingAdd(true);
    try {
      const response = await common_post(apis.edit_sach, values);
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
    handleGetListCategory();
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
      title: "Danh mục",
      dataIndex: "TEN_DANH_MUC",
    },
    {
      title: "Giá cho mượn",
      dataIndex: "GIA_CHO_MUON",
    },
    {
      title: "",
      render: (record) => (
        <Space>
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

  async function handleOnFilter(value){
    getSach("",value)
  }

  return (
    <div className={styles.container}>
      <TopHeader
        title="Sách"
        onAdd={() => addRef.current.openModal()}
        onChangeSearch={(txt) => getSach(txt)}
        totalText={`Tổng số sách : ${listSach.length}`}
        onFilter={handleOnFilter}
        optionFilter={listCategory}
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
      <ModalAddBook
          ref={addRef}
          onOK={(values => {
            handleAddBook(values);
          })}
          onEdit={(values) => handleEdit(values)}
          loading={loadingAdd}
      />
    </div>
  );
}

export default Book;
