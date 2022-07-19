import { Form, Input, Modal, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, {useState, useImperativeHandle} from 'react'
const { Item } = Form
function ConfigUser({onOK, loading = false, onEdit}, ref) {

    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState()
    const [form] = useForm()

useImperativeHandle(
  ref,
  () => {
   return {
       openModal(item){
            if (item) {
              setCurrent(item)
              form.setFields([
                  {
                      name : "TEN_NGUOI_DUNG",
                      value :item.TEN_NGUOI_DUNG,
                  },
                  {
                    name : "USERNAME",
                    value :item.USERNAME,
                },
                {
                    name : "PASSWORD",
                    value :item.PASSWORD,
                }
              ])
            }
            setVisible(true)
            
       },
       closeModal(){
        handleClose()
       }
   }
  },
  [],
)

  function handleClose() {
    current && setCurrent()
    setVisible(false) 
    form.resetFields()

  }

  function onPressOk () {
    form.submit()
  }

  function onSubmit (values) {
    if (!current) {
        onOK(values)
    }else{
        onEdit(current,values)
    }
  }
  return (
    <Modal 
        visible={visible}
        onCancel={handleClose}
        title={current ? "Sửa người dùng" : "Thêm mới người dùng"}
        onOk={onPressOk}
        confirmLoading={loading}
    >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
            <Item 
                name="TEN_NGUOI_DUNG" 
                label="Tên người dùng"
                rules={[
                    {
                        required :true,
                        message : "Vui lòng nhập tên người dùng"
                    }
                ]}
             >
                <Input/>
            </Item>
            <Item 
                name="USERNAME" 
                label = "Tên đăng nhập"
                rules={[
                    {
                        required :true,
                        message : "Vui lòng nhập tên đăng nhập"
                    }
                ]}
             >
                <Input/>
            </Item>
            <Item 
                name="PASSWORD" 
                label = "Mật khẩu đăng nhập"
                rules={[
                    {
                        required :true,
                        message : "Vui lòng nhập mật khẩu"
                    }
                ]}
             >
                <Input.Password/>
            </Item>
        </Form>
    </Modal>
  )
}

export default React.forwardRef(ConfigUser)