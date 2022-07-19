import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button, Table, Space, Popconfirm, Tooltip } from "antd";
import styles from "./style.module.scss";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
import TopHeader from "../../components/TopHeader";
import { DeleteOutlined, EditFilled, PrinterOutlined } from "@ant-design/icons";
import ModalAddPhieuMuon from "./ModalAddPhieuMuon";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import { data } from "../../assets/data";
import moment from "moment";
import Printd from "printd";
import {templates} from "../../assets/templates";
import  "../../assets/app.css"

function Phieu_Muon() {
  const [listPhieu, setListPhieu] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const addRef = useRef();
    const printRef = useRef();
    const [html, setHtml] = useState(templates.phieu_muon_sach.html);

  async function getPhieu() {
    try {
      const response = await common_post(apis.get_phieu_muon, {LOAI_PHIEU: "PHIEU_MUON"});
      if (response && response.status === "OK") {
        setListPhieu(response.result);
      }
    } catch (error) {
      throw error;
    }
  }
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
    }

    async function handleAddPhieuMuon(Book, User) {
    console.log(Book);
    console.log(User);
    setLoadingAdd(true);
    try {
      let dataRequest = {
          list_SACH_ID: Book,
          NGUOI_MUON_ID: User,
          NGUOI_DUNG_ID: User
      };
      const response = await common_post(apis.add_phieu_muon, dataRequest);
      if (response && response.status === "OK") {
        setLoadingAdd(false);
        addRef.current.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }
  function onClickRow(item) {
    console.log(item);
    addRef.current.openModal(item);
  }

    const handlePrint = (template = {}) => {
        const d = new Printd();

        let html_phieu = template.html;
        const data_phieu = data[template.key];

        console.log(data_phieu);

        Object.keys(data_phieu).forEach((key) => {
            if (key === "DANH_SACH") {
                let data_table = "";
                data_phieu[key].forEach(
                    (row_data, index) =>
                        (data_table += `
          <tr>
            <td>${index + 1}</td>
            ${Object.values(row_data)
                            .map((col_data) => `<td>${col_data}</td>`)
                            .join("")}
          </tr>
        `)
                );
                html_phieu = replaceAll(html_phieu, `[${key}]`, data_table);
            } else html_phieu = replaceAll(html_phieu, `[${key}]`, data_phieu[key]);
        });

        html_phieu = replaceAll(
            html_phieu,
            `[REALTIME]`,
            moment().format("HH:mm") +
            " ngày " +
            moment().format("DD") +
            " tháng " +
            moment().format("MM") +
            " năm " +
            moment().format("YYYY")
        );

        setHtml(html_phieu);

        setTimeout(() => {
            d.print(printRef.current, [
                ` section { min-height: 50vh; }
          section * { font-family: 'Times New Roman', Times, serif; }
          @media print {
            section, .signs-section { break-inside: avoid; }
          }
          .signs-section { margin-top: 10px; }
          table { margin-top: 20px; }
          table { border-collapse: collapse; }
          td { padding: 5px; }
        `,
            ]);
        }, 500);
    };

  async function handleDelete(item) {
  //   console.log(item);
  //   try {
  //     let dataRequest = {
  //       ID: item.ID,
  //       TRANG_THAI: 0,
  //     };
  //     const response = await common_post(apis.edit_sach, dataRequest);
  //     if (response && response.status === "OK") {
  //       getSach();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  }
  async function handleEdit(item, name, value) {
  //   console.log(item);
  //   console.log(name);
  //   console.log(value);
  //   setLoadingAdd(true);
  //   try {
  //     let dataRequest = {
  //       ID: item.ID,
  //       TEN_SACH: name,
  //       KE_SACH_ID: value,
  //     };
  //     const response = await common_post(apis.edit_sach, dataRequest);
  //     if (response && response.status === "OK") {
  //       getSach();
  //       setLoadingAdd(false);
  //       addRef.current.closeModal();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  }
  useEffect(() => {
    getPhieu();
  }, []);
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
    },
    {
      title: "Tên phiếu",
      dataIndex: "TEN_PHIEU",
    },
    {
      title: "Loại phiếu",
      dataIndex: "LOAI_PHIEU",
    },
    {
      title: "Tên Phòng Đọc",
      dataIndex: "TEN_PHONG_DOC",
    },
      {
          title: "Ngày mượn",
          dataIndex: "NGAY",
      },
      {
          title: "Tên người mượn",
          dataIndex: "TEN_NGUOI_MUON",
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
        <Space
            onClick={e => e.stopPropagation()}
        >
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
            <Tooltip title = "Print">
                <Button
                    type="primary"
                    danger
                    icon={<PrinterOutlined />}
                    onClick={() => handlePrint(templates.phieu_muon_sach)}
                ></Button>
            </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <TopHeader
        title="Phiếu mượn sách"
        onAdd={() => addRef.current.openModal()}
        onChangeSearch={(txt) => console.log(txt)}
        totalText={`Tổng số phiếu : `}
      />
      <Table
        dataSource={listPhieu.map((item, index) => ({
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
      <ModalAddPhieuMuon
        ref={addRef}
        onOK={(book, user) => {
          handleAddPhieuMuon(book, user);
        }}
        // onEdit={(item, name, value) => handleEdit(item, name, value)}
        loading={loadingAdd}
      />
        <div ref={printRef} dangerouslySetInnerHTML={{ __html: html }} className="print-src" />
    </div>
  );
}

export default Phieu_Muon;