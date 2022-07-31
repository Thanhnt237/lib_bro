import { Input, Modal, notification, TreeSelect, Button, Space,  Row, Col, Form, Select, InputNumber } from "antd";
import React, { useState, useImperativeHandle, useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { common_post } from "../../helpers";
import { apis } from "../../constants";
import {useSelector} from "react-redux";
const { Option } = Select;

function ModalAddBookToStorage({ onOK, loading = false, onEdit }, ref) {
    const [visible, setVisible] = useState(false)
    const [bookQuantity, setbookQuantity] = useState();
    const [books, setbooks] = useState([]);
    const [form] = Form.useForm();

    const formItems = []
    useEffect(() => {

    }, []);

    useImperativeHandle(
        ref,
        () => {
            return {
                openModal(item) {
                    if (item) {
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

    async function handleGetBook() {
        if(books && books.length) return
        try {
            let response = await common_post(apis.get_sach,{})
            if(response.status === "OK" && response.result){
                setbooks(response.result)
            }
        }catch(error){

        }
    }

    function addNewFormItem(){
        console.log("fack")
    }

    function onPressOk() {
        if (!bookQuantity) {
            notification.warning({ message: "Vui lòng nhập số lượng" });
            return;
        }else{
            form.submit()
        }
    }

    function onFinish(value) {
        onOK(value)
    }

    function onFinishFailed() {
        notification.warning({ message: "Thất bại" });
    }

    const onChange = (value) => {
        setbookQuantity(value);
    };

    function handleClose() {
        setVisible(false);
    }

    function handleFormChange() {
        form.setFieldsValue({
            formItems: [],
        });
    }


    return (
        <Modal
            visible={visible}
            onCancel={handleClose}
            title="Nhập sách vào kho"
            onOk={onPressOk}
            confirmLoading={loading}
        >
            <Form
                form={form}
                name="AddBookToStorage"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
            <Form.List name="data">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field) => (
                            <Row key={field.key}>
                                <Col span={12}>
                                    <Form.Item
                                        {...field}
                                        label="Sách"
                                        name={[field.name, 'SACH_ID']}
                                        rules={[{ required: true, message: 'Chọn sách' }]}
                                    >
                                        <Select
                                            placeholder="Chọn sách"
                                            showSearch={true}
                                            onDropdownVisibleChange = {open => open && handleGetBook()}
                                            // onChange={}
                                            allowClear
                                        >
                                            {books?.map((item, i) => (
                                                <Option key={i.toString(36) + i} value={item.ID}> {item.TEN_SACH} </Option>
                                            ))}

                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span = {1}></Col>
                                <Col span={10}>
                                    <Form.Item
                                        {...field}
                                        label="Nhập số lượng"
                                        name={[field.name, "SO_LUONG"]}
                                        rules={[{ required: true, message: 'Nhập số lượng' }]}
                                    >
                                        <InputNumber min={0} max={1000000} defaultValue={0} onChange={onChange} />
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

        </Modal>
    );
}

export default React.forwardRef(ModalAddBookToStorage);
