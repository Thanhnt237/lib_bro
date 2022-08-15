import {Input, Modal, notification, TreeSelect, Form, Row, Col, Select, InputNumber, Button, Radio, Space} from "antd";
import React, { useState, useImperativeHandle, useEffect } from "react";
import { common_post } from "../../helpers";
import { keys, apis } from "../../constants";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {PlusOutlined} from "@ant-design/icons";
const { Option } = Select;

const initialOptions = {
  "client-id": keys.Paypal_Sandbox_cli,
  currency: "USD",
  intent: "capture"
};

function ModalAddPhieuMuon({ onOK, loading = false, onEdit }, ref) {
  const [listBook, setListBook] = useState([]);
  const [user, setListUser] = useState([]);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState()
  const [form] = Form.useForm();
  const [bookQuantity, setBookQuantity] = useState();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const dataSach = Form.useWatch("data", form)

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

  const onFinish = async (value) => {
    console.log(value)
  }

  const onFinishFailed = async () => {

  }

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal(item) {
          if (item) {
            setCurrent(item);
          }
          setVisible(true);
        },
        closeModal() {
          handleClose();
        },
      };
    },
    []
  );

  function handleClose() {
    setVisible(false);
  }

  function onPressOk() {
    if (current) {
      // onEdit(current, name, value);
    } else {
      form.submit()
    }
  }

  const handleChangePaymentMethod = (e) => {
    const { value } = e.target;
    setPaymentMethod(value);
  };

  function onChangeSach(record, index){
    let book = listBook.find(c => c.ID === record)
    // console.log(index)

    return console.log(dataSach)

    form.setFields([{
      name: ["data", index, "DON_GIA"],
      value: book.GIA_CHO_MUON
    },{
      name: ["data", index, "THANH_TIEN"],
      value: dataSach[index].SO_LUONG * book.GIA_CHO_MUON
    }])
  }
  // console.log(value);
  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      title="Thêm mới phiếu"
      onOk={onPressOk}
      confirmLoading={loading}
      width={1200}
    >
      <Form
          form={form}
          name="AddPhieuMuon"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
      >
        <Form.Item
          label="Tên người mượn"
          name="NGUOI_MUON_ID"
          rules={[{ required: true, message: 'Vui lòng chọn người mượn!' }]}
        >
          <Select
              placeholder="Chọn người mượn"
              showSearch={true}
              onDropdownVisibleChange = {open => open && handleGetUser()}
              // onChange={}
              allowClear
          >
            {user?.map((item, i) => (
                <Option key={i.toString(36) + i} value={item.ID}> {item.TEN_NGUOI_DUNG} </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List name="data">
          {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                    <Row key={field.key}>
                      <Col span={7}>
                        <Form.Item
                            {...field}
                            label="Sách"
                            name={[field.name, 'SACH_ID']}
                            rules={[{ required: true, message: 'Chọn sách' }]}
                        >
                          <Select
                              placeholder="Chọn sách"
                              onChange={(ID)=>onChangeSach(ID, index)}
                              showSearch={true}
                              onDropdownVisibleChange = {open => open && handleGetBook()}
                              // onChange={}
                              allowClear
                          >
                            {listBook?.map((item, i) => (
                                <Option key={i.toString(36) + i} value={item.ID}> {item.TEN_SACH} </Option>
                            ))}

                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span = {1}></Col>
                      <Col span={3}>
                        <Form.Item
                            {...field}
                            label="Nhập số lượng"
                            name={[field.name, "SO_LUONG"]}
                            rules={[{ required: true, message: 'Nhập số lượng' }]}
                            initialValue={1}
                        >
                          <InputNumber min={0} max={1000000} />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Form.Item
                            {...field}
                            label="Đơn giá"
                            name={[field.name, "DON_GIA"]}
                            rules={[{ required: true, message: '' }]}
                        >
                          <Input disabled/>
                        </Form.Item>
                      </Col>
                      <Col span={1}></Col>
                      <Col span={3}>
                        <Form.Item
                            {...field}
                            label="Thành tiền"
                            name={[field.name, "THANH_TIEN"]}
                            rules={[{ required: true, message: '' }]}
                        >
                          <Input disabled/>
                        </Form.Item>
                      </Col>
                    </Row>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm sách
                  </Button>
                </Form.Item>
              </>
          )}
        </Form.List>
      </Form>

      <span>Tổng thanh toán: </span> <br/>

      <Radio.Group
          value={paymentMethod}
          onChange={handleChangePaymentMethod}
      >
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
    </Modal>

  );
}

export default React.forwardRef(ModalAddPhieuMuon);
