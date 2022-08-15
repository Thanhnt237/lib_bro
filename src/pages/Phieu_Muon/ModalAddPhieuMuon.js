import { Input, Modal, Form, Row, Col, InputNumber, Button, Radio, Space, Table } from "antd";
import React, { useState, useImperativeHandle } from "react";
import { common_post } from "../../helpers";
import { keys, apis } from "../../constants";
import { Select } from "../../components";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";

const initialOptions = {
  "client-id": keys.Paypal_Sandbox_cli,
  currency: "USD",
  intent: "capture",
};

function ModalAddPhieuMuon({ onOK, loading = false, onEdit }, ref) {
  const [listBook, setListBook] = useState([]);
  const [user, setListUser] = useState([]);
  const [visible, setVisible] = useState(false);
  const [formNguoiMuon] = Form.useForm();
  const [formThemSach] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [current, setCurrent] = useState();
  const soLuong = Form.useWatch("SO_LUONG", formThemSach);

  useEffect(() => {
    if (visible && selectedBook) {
      formThemSach.setFields([
        { name: "DON_GIA", value: selectedBook.GIA_CHO_MUON },
        {
          name: "THANH_TIEN",
          value: soLuong * selectedBook.GIA_CHO_MUON,
        },
      ]);
    }
  }, [visible, soLuong, selectedBook, formThemSach]);

  async function handleGetBook() {
    try {
      const response = await common_post(apis.get_sach, {});
      if (response && response.status === "OK") {
        setListBook(response.result);
      }
    } catch (error) {
      throw error;
    }
  }

  async function handleGetUser() {
    try {
      const response = await common_post(apis.get_list_user, {});
      if (response && response.status === "OK") {
        setListUser(response.result);
      }
    } catch (error) {
      throw error;
    }
  }

  const onAddBook = async (values) => {
    const order = {
      ...values,
      TEN_SACH: selectedBook.TEN_SACH,
      SACH_ID: selectedBook.ID,
      key: nanoid(),
    };
    setSelectedBooks((currArr) => [order, ...currArr]);
    setSelectedBook();
    formThemSach.resetFields();
  };

  useImperativeHandle(ref, () => ({
    openModal(item) {
      if (item) {
        setCurrent(item);
        formNguoiMuon.setFields([
          {
            name: "NGUOI_MUON_ID",
            value: item.TEN_NGUOI_MUON,
          },
        ]);
        setSelectedBooks(
          item.SACH.map((item) => ({
            ...item,
            key: nanoid(),
            THANH_TIEN: item.SO_LUONG * item.DON_GIA,
          }))
        );
      }
      setVisible(true);
    },
    closeModal() {
      handleClose();
    },
  }));

  function handleClose() {
    setVisible(false);
    formThemSach.resetFields();
    formNguoiMuon.resetFields();
    setSelectedBooks([]);
    setSelectedBook();
    setSelectedUser();
    setCurrent();
  }

  async function onPressOk() {
    // console.log(selectedBooks);

    const res = await onOK(selectedBooks, selectedUser.ID);

    if (!!res) handleClose();
  }

  const handleChangePaymentMethod = (e) => {
    const { value } = e.target;
    setPaymentMethod(value);
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);

    formThemSach.setFields([
      { name: "DON_GIA", value: book.GIA_CHO_MUON },
      {
        name: "THANH_TIEN",
        value: soLuong * book.GIA_CHO_MUON,
      },
    ]);
  };

  const totalPayment = useMemo(() => {
    return selectedBooks.reduce((total, book) => (total += book.THANH_TIEN), 0);
  }, [selectedBooks]);

  const columns = [
    {
      title: "Sách",
      dataIndex: "TEN_SACH",
    },
    {
      title: "Số lượng",
      dataIndex: "SO_LUONG",
    },
    {
      title: "Đơn giá",
      dataIndex: "DON_GIA",
    },
    {
      title: "Thành tiền",
      dataIndex: "THANH_TIEN",
    },
  ];

  const handleDelete = (id) => {
    setSelectedBooks((curr) => curr.filter((book) => book.key !== id));
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      title={!current ? "Thêm mới phiếu" : "Chi tiết phiếu"}
      onOk={onPressOk}
      confirmLoading={loading}
      width={1200}
      footer={!current && undefined}
    >
      <Form layout="vertical" form={formNguoiMuon}>
        <Form.Item
          label="Tên người mượn"
          name="NGUOI_MUON_ID"
          rules={[{ required: true, message: "Vui lòng chọn người mượn!" }]}
        >
          {!!current ? (
            <Input readOnly />
          ) : (
            <Select
              placeholder="Chọn người mượn"
              dataSource={user}
              labelKey="TEN_NGUOI_DUNG"
              valueKey="TEN_NGUOI_DUNG"
              onSelect={setSelectedUser}
              onDropdownVisibleChange={(open) => open && user.length === 0 && handleGetUser()}
              allowClear={false}
              disabled={current}
            />
          )}
        </Form.Item>
      </Form>

      <Form
        form={formThemSach}
        layout="vertical"
        onFinish={onAddBook}
        autoComplete="off"
        style={current ? { visibility: "hidden", opacity: 0, position: "fixed" } : {}}
      >
        <Row gutter={10} align="bottom" wrap={false}>
          <Col flex="300px">
            <Form.Item
              label="Sách"
              name="SACH_ID"
              rules={[{ required: true, message: "Chọn sách" }]}
            >
              <Select
                placeholder="Chọn sách"
                dataSource={listBook}
                labelKey="TEN_SACH"
                valueKey="TEN_SACH"
                onSelect={handleSelectBook}
                onDropdownVisibleChange={(open) => open && listBook.length === 0 && handleGetBook()}
                allowClear={false}
              />
            </Form.Item>
          </Col>

          <Col flex="auto">
            <Form.Item
              label="Nhập số lượng"
              name="SO_LUONG"
              rules={[{ required: true, message: "Nhập số lượng" }]}
              initialValue={1}
            >
              <InputNumber min={0} max={1000000} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col flex="auto">
            <Form.Item label="Đơn giá" name="DON_GIA" rules={[{ required: true, message: "" }]}>
              <Input readOnly />
            </Form.Item>
          </Col>

          <Col flex="auto">
            <Form.Item
              label="Thành tiền"
              name="THANH_TIEN"
              rules={[{ required: true, message: "" }]}
            >
              <Input readOnly />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item>
              <Button type="primary" onClick={() => formThemSach.submit()} icon={<PlusOutlined />}>
                Thêm sách
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table
        dataSource={selectedBooks}
        columns={
          !current
            ? [
                ...columns,
                {
                  width: 65,
                  render: (_, record) => (
                    <Button
                      icon={<DeleteOutlined />}
                      type="primary"
                      danger
                      onClick={() => handleDelete(record.key)}
                    ></Button>
                  ),
                },
              ]
            : columns
        }
        pagination={false}
        scroll={{ y: "30vh" }}
        footer={() => <div>Tổng thanh toán: {totalPayment}</div>}
      />

      {!current && (
        <>
          <br />
          <Radio.Group value={paymentMethod} onChange={handleChangePaymentMethod}>
            <Space direction="vertical">
              <Radio value="cod">Thanh toán bằng tiền mặt</Radio>
              <Radio value="paypal">Thanh toán bằng Paypal</Radio>
            </Space>

            <div
              style={{
                display: paymentMethod === "paypal" ? "block" : "none",
                marginTop: 20,
              }}
            >
              <PayPalScriptProvider
                // deferLoading={totalPrice ? true : false}
                options={initialOptions}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order
                      .create({
                        description: "DISDIS",
                        purchase_units: [
                          {
                            amount: {
                              // value: (Number(totalPrice) * 0.000043).toFixed(2).toString(),
                            },
                          },
                        ],
                        application_context: {
                          shipping_preference: "NO_SHIPPING",
                        },
                      })
                      .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                      });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      // onSuccessPaypalPayment(details);
                      alert(`Thanh toán thành công, đang chuyển hướng bạn về trang đơn hàng`);
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </Radio.Group>
        </>
      )}
    </Modal>
  );
}

export default React.forwardRef(ModalAddPhieuMuon);
