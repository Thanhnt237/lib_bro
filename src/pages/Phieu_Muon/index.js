import React, { useEffect, useState, useRef } from "react";
import { Button, Table, Space, Popconfirm, Tooltip, notification } from "antd";
import styles from "./style.module.scss";
import { common_post, exportToCSV } from "../../helpers";
import { apis } from "../../constants";
import TopHeader from "../../components/TopHeader";
import { DeleteOutlined, PrinterOutlined } from "@ant-design/icons";
import ModalAddPhieuMuon from "./ModalAddPhieuMuon";
import moment from "moment";
import Printd from "printd";
import { templates } from "../../assets/templates";
import "../../assets/app.css";
import { useSelector } from "react-redux";

function Phieu_Muon() {
  const [listPhieu, setListPhieu] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const addRef = useRef();
  const printRef = useRef();
  const [html, setHtml] = useState(templates.phieu_muon_sach.html);
  const user = useSelector((state) => state.auth.user);

  async function getPhieu() {
    try {
      const response = await common_post(apis.get_phieu_muon);
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
    setLoadingAdd(true);
    try {
      let dataRequest = {
        list_SACH_ID: Book,
        NGUOI_MUON_ID: User,
        NGUOI_DUNG_ID: user.ID,
      };
      const response = await common_post(apis.add_phieu_muon, dataRequest);
      if (response && response.status === "OK") {
        setLoadingAdd(false);
        notification.success({ message: "Thành công" });
        addRef.current.closeModal();
        getPhieu();
        return true;
      }
      notification.error({ message: "Thêm phiếu mượn thất bại" });
    } catch (error) {
      console.log(error);
    }
  }
  function onClickRow(item) {
    console.log(item);
    addRef.current.openModal(item);
  }

  const handlePrint = async (ID) => {
    const d = new Printd();

    let html_phieu = templates.phieu_muon_sach.html;
    let data_phieu = {};

    try {
      const res = await common_post(apis.get_phieu_muon, { ID });
      if (res.status === "OK") {
        const data = res.result[0];
        data_phieu = data;
      }
    } catch (error) {
      console.log(error);
    }

    Object.keys(data_phieu).forEach((key) => {
      if (key === "SACH") {
        let data_table = "";
        data_phieu[key].forEach(
          (row_data, index) =>
            (data_table += `
          <tr>
            <td>${index + 1}</td>
            <td>${row_data.TEN_SACH}</td>
            <td>${row_data.SO_LUONG}</td>
            <td>${row_data.DON_GIA}</td>
            <td>${row_data.SO_LUONG * row_data.DON_GIA}</td>
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

  console.log(user);

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      render: (data, record, index) => index + 1,
    },
    {
      title: "Tên phiếu",
      dataIndex: "TEN_PHIEU",
    },
    {
      title: "Loại phiếu",
      dataIndex: "LOAI_PHIEU",
      render: (data) => (data === "PHIEU_MUON" ? "Phiếu mượn" : "Phiếu trả"),
    },
    {
      title: "Ngày mượn",
      dataIndex: "NGAY",
      render: (data) => moment(data, "YYYYMMDD").format("DD/MM/YYYY"),
    },
    {
      title: "Tên người mượn",
      dataIndex: "TEN_NGUOI_MUON",
    },
    {
      title: "Tên người tạo phiếu",
      dataIndex: "TEN_NGUOI_TAO",
      render: () => user.TEN_NGUOI_DUNG,
    },
    {
      title: "",
      dataIndex: "ID",
      render: (ID) => (
        <Space onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa phòng này không?"
            onConfirm={(e) => {
              e.stopPropagation();
              handleDelete(ID);
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
          <Tooltip title="Print">
            <Button
              type="primary"
              ghost
              icon={<PrinterOutlined />}
              onClick={() => handlePrint(ID)}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleExportExcel = () => {
    const exportList = listPhieu.map((phieu, index) => {
      const item = {};

      columns.forEach((column) => {
        if (!column.title) return;

        const title = column.title;
        const key = column.dataIndex;
        const render = column.render;

        item[title] = render ? render(phieu[key], phieu, index) : phieu[key];
      });

      return item;
    });

    console.log(exportList);

    exportToCSV(exportList);
  };

  return (
    <div className={styles.container}>
      <TopHeader
        title="Phiếu mượn sách"
        onAdd={() => addRef.current.openModal()}
        onChangeSearch={(txt) => console.log(txt)}
        totalText={listPhieu?.length}
        onExportExcel={handleExportExcel}
      />
      <Table
        rowKey="ID"
        dataSource={listPhieu}
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
