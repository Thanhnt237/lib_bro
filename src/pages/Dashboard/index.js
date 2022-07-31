import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
import TopHeader from "../../components/TopHeader";
import styles from "./style.module.scss";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
import { Col, Row } from "antd";

function Dashboard() {
  const [configDataMuon, setconfigDataMuon] = useState();
  const [configDataTra, setconfigDataTra] = useState();
  const [configDataNhap, setconfigDataNhap] = useState();

  useEffect(() => {
    handleGetDataMuon();
    handleGetDataTra();
    handleGetDataNhap();
  }, []);

  async function handleGetDataMuon() {
    try {
      let response = await common_post(apis.thongKeLuotMuonSachTheoNgay);
      if (response.status === "OK" && response.result) {
        setconfigDataMuon({
          data: response.result,
          xField: "NGAY",
          yField: "SO_LUONG",
          label: {
            // 可手动配置 label 数据标签位置
            position: "middle",
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
              fill: "#FFFFFF",
              opacity: 0.6,
            },
          },
          xAxis: {
            label: {
              autoHide: true,
              autoRotate: false,
            },
          },
          color: () => "#a52a2a",
        });
      }
    } catch (error) {}
  }

  async function handleGetDataTra() {
    try {
      let response = await common_post(apis.thongKeLuotTraTheoNgay);
      if (response.status === "OK" && response.result) {
        setconfigDataTra({
          data: response.result,
          xField: "NGAY",
          yField: "SO_LUONG",
          label: {
            // 可手动配置 label 数据标签位置
            position: "middle",
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
              fill: "#FFFFFF",
              opacity: 0.6,
            },
          },
          xAxis: {
            label: {
              autoHide: true,
              autoRotate: false,
            },
          },
        });
      }
    } catch (error) {}
  }

  async function handleGetDataNhap() {
    try {
      let response = await common_post(apis.thongKeNhapSachTheoNgay);
      if (response.status === "OK" && response.result) {
        setconfigDataNhap({
          data: response.result,
          xField: "NGAY",
          yField: "SO_LUONG",
          label: {
            // 可手动配置 label 数据标签位置
            position: "middle",
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
              fill: "#FFFFFF",
              opacity: 0.6,
            },
          },
          xAxis: {
            label: {
              autoHide: true,
              autoRotate: false,
            },
          },
          color: () => "#7DC282",
        });
      }
    } catch (error) {}
  }

  return (
    <div className={styles.container}>
      <TopHeader title="Dashboard" />

      <div style={{ overflow: "auto", height: "calc(100vh - 53px)", padding: 20 }}>
        <h1>Bảng điều khiển</h1>

        <Row gutter={[0, 50]}>
          <Col span={12}>
            <h2 style={{ marginBottom: "15px" }}>Thống kê số lượng mượn sách theo ngày</h2>
            <div style={{ paddingInline: 10 }}>
              {configDataMuon ? <Column {...configDataMuon} /> : <div></div>}
            </div>
          </Col>

          <Col span={12}>
            <h2 style={{ marginBottom: "15px" }}>Thống kê số lượng trả sách theo ngày</h2>
            <div style={{ paddingInline: 10 }}>
              {configDataTra ? <Column {...configDataTra} /> : <div></div>}
            </div>
          </Col>

          <Col span={12}>
            <h2 style={{ marginBottom: "15px" }}>Thống kê số lượng sách nhập theo ngày</h2>
            <div style={{ paddingInline: 10 }}>
              {configDataNhap ? <Column {...configDataNhap} /> : <div></div>}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Dashboard;
