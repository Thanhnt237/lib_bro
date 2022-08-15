import { Input, Modal, notification, TreeSelect, Form, Select } from "antd";
import React, { useState, useImperativeHandle, useEffect } from "react";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
const { Option } = Select;

function ModalAddBook({ onOK, loading = false, onEdit }, ref) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(false);
  const [listBookShelf, setListBookShelf] = useState([]);
  const [listRoom, setListRoom] = useState({});
  // const [value, setValue] = useState(undefined);
  const [listCategory, setListCategory] = useState([])
  const [listAuthor, setListAuthor] = useState([])
  const [form] = Form.useForm();

  async function handleGetListBookShelf(KE_SACH_ID = "") {
    try {
      const response = await common_post(apis.get_ke_sach, {
        KE_SACH_ID: KE_SACH_ID,
      });
      if (response && response.status === "OK") {
        setListBookShelf(response.result);
      }
    } catch (error) {
      throw error;
    }
  }
  async function handleGetListAuthor() {
    try {
      const response = await common_post(apis.get_tac_gia, {});
      if (response && response.status === "OK") {
        setListAuthor(response.result);
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
  async function handleGetListRoom(KE_SACH_ID) {
    try {
      const response = await common_post(apis.lay_phong_doc_theo_ke_sach, {
        KE_SACH_ID: KE_SACH_ID,
      });
      if (response && response.status === "OK") {
        setListRoom(response.result[0]);
      }
    } catch (error) {
      throw error;
    }
  }

  const onFinish = (values) => {
    console.log(current)
    if(current){
      console.log("edit")
      onEdit(values)
    }else{
      console.log("add")
      onOK(values)
    }
  };

  const onFill = (item) => {
    let formField = []
    for(let [keys, values] of Object.entries(item)) {
      formField.push({
        name: keys,
        value: values
      })
    }
    console.log(formField)
    form.setFields(formField)
  };


  const onChangeBookShelf = async (newValue) => {
    await handleGetListRoom(newValue);
    form.setFields([{
      name: "TEN_PHONG_DOC",
      value: listRoom.TEN_PHONG_DOC
    },{
      name: "PHONG_DOC_ID",
      value: listRoom.ID
    }])
  };

  useEffect(() => {

  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        openModal(item) {
          if(item){
            onFill(item)
            setCurrent(true)
          }
          handleGetListBookShelf();
          handleGetListAuthor();
          handleGetListCategory();
          console.log(listAuthor)
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
    setCurrent(false)
    form.resetFields();
  }

  function onPressOk() {
    form.submit()
  }
  // console.log(value);
  return (
    <Modal
      visible={visible}
      onCancel={handleClose}
      title="Thêm mới Sách"
      onOk={onPressOk}
      confirmLoading={loading}
    >
      <Form
          layout={"vertical"}
          form={form}
          name="control-hooks"
          onFinish={onFinish}>

        <Form.Item
            hidden
            name="ID"
            label="Sach ID">
          <Input
          />
        </Form.Item>

        <Form.Item
            name="TEN_SACH"
            label="Tên sách"
            rules={[{ required: true }]}>
          <Input
              placeholder="Nhập tên sách"
              style={{ marginTop: "10px" }}
          />
        </Form.Item>

        <Form.Item
            name="KE_SACH_ID"
            label="Kệ sách"
            rules={[{ required: true }]}>
          <Select
              placeholder="Chọn kệ sách"
              onChange={onChangeBookShelf}
              allowClear
          >
            {listBookShelf?.map((item, i) => (
                <Option key={i.toString(36) + i} value={item.ID}> {item.TEN_KE_SACH} </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          hidden
          name="PHONG_DOC_ID"
          label="Phòng đọc"
        >
          <Input
              disabled
              placeholder="Phòng đọc ID"
              style={{ marginTop: "10px" }}
          />
        </Form.Item>

        <Form.Item
            name="TEN_PHONG_DOC"
            label="Phòng đọc"
        >
          <Input
              disabled
              placeholder="Phòng đọc"
              style={{ marginTop: "10px" }}
          />
        </Form.Item>

        <Form.Item
            name="TAC_GIA_ID"
            label="Tên tác giả"
            rules={[{ required: true }]}>
          <Select
              placeholder="Chọn tác giả"
              // onChange={onChange}
              allowClear
          >
            {listAuthor?.map((item, i) => (
                <Option key={i.toString(36) + i} value={item.ID}> {item.TEN_TAC_GIA} </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
            name="DANH_MUC_ID"
            label="Danh mục"
            rules={[{ required: true }]}>
          <Select
              placeholder="Chọn danh mục"
              // onChange={onChange}
              allowClear
          >
            {listCategory?.map((item, i) => (
                <Option key={i.toString(36) + i} value={item.ID}> {item.TEN_DANH_MUC} </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
            name="GIA_CHO_MUON"
            label="Giá cho mượn"
            rules={[{ required: true }]}>
          <Input
              placeholder="Nhập giá"
              style={{ marginTop: "10px" }}
          />
        </Form.Item>

      </Form>
    </Modal>
  );
}

export default React.forwardRef(ModalAddBook);
