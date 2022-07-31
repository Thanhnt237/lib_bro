import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import TopHeader from "../../components/TopHeader";
import styles from "../Book/style.module.scss";
import {common_post} from "../../helpers";
import {apis} from "../../constants";

function Dashboard() {
  const [configDataMuon, setconfigDataMuon] = useState();
  const [configDataTra, setconfigDataTra] = useState();
  const [configDataNhap, setconfigDataNhap] = useState();

  useEffect(() => {
    handleGetDataMuon();
    handleGetDataTra();
    handleGetDataNhap();
  }, []);

  async function handleGetDataMuon(){
    try {
      let response = await common_post(apis.thongKeLuotMuonSachTheoNgay)
      if(response.status === "OK" && response.result){
        setconfigDataMuon({
          data: response.result,
          xField: 'NGAY',
          yField: 'SO_LUONG',
          label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
              fill: '#FFFFFF',
              opacity: 0.6,
            },
          },
          xAxis: {
            label: {
              autoHide: true,
              autoRotate: false,
            },
          }
        })
      }
    }catch(error){

    }
  }

  async function handleGetDataTra(){
    try {
      let response = await common_post(apis.thongKeLuotTraTheoNgay)
      if(response.status === "OK" && response.result){
        setconfigDataTra({
          data: response.result,
          xField: 'NGAY',
          yField: 'SO_LUONG',
          label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
              fill: '#FFFFFF',
              opacity: 0.6,
            },
          },
          xAxis: {
            label: {
              autoHide: true,
              autoRotate: false,
            },
          }
        })
      }
    }catch(error){

    }
  }

  async function handleGetDataNhap(){
    try {
      let response = await common_post(apis.thongKeNhapSachTheoNgay)
      if(response.status === "OK" && response.result){
        setconfigDataNhap({
          data: response.result,
          xField: 'NGAY',
          yField: 'SO_LUONG',
          label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
              fill: '#FFFFFF',
              opacity: 0.6,
            },
          },
          xAxis: {
            label: {
              autoHide: true,
              autoRotate: false,
            },
          }
        })
      }
    }catch(error){

    }
  }

  return (
      <div className={styles.container}>
        <TopHeader title="Dashboard"/>
        <h1 style={{ marginBottom: "15px" }}>
          Thống kê số lượng mượn sách theo ngày
        </h1>
        <div >
          {
            configDataMuon? <Column{...configDataMuon} /> : <div></div>
          }
        </div>

        <h1 style={{ marginBottom: "15px" }}>
          Thống kê số lượng trả sách theo ngày
        </h1>
        <div >
          {
            configDataMuon? <Column{...configDataMuon} /> : <div></div>
          }
        </div>

        <h1 style={{ marginBottom: "15px" }}>
          Thống kê số lượng sách nhập theo ngày
        </h1>
        <div >
          {
            configDataMuon? <Column{...configDataMuon} /> : <div></div>
          }
        </div>

      </div>
  );
}

export default Dashboard;
