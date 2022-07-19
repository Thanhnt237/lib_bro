import { Input, Modal, notification } from 'antd'
import React, {useState, useImperativeHandle} from 'react'

function ModalAddRoom({onOK, loading = false, onEdit}, ref) {

    const [visible, setVisible] = useState(false)
    const [name, setName] = useState("")
    const [current, setCurrent] = useState()

useImperativeHandle(
  ref,
  () => {
   return {
       openModal(item){
            if (item) {
              setCurrent(item)
              setName(item.TEN_PHONG_DOC)
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
    setName("")
    current && setCurrent()
    setVisible(false) 

  }

  function onPressOk () {
    if (name === "") {
        notification.warning({message : "Vui lòng điền tên phòng"})
        return;
    }
    if (current) {
      onEdit(current, name)
    }else{
      onOK(name)
    }
  }
  return (
    <Modal 
        visible={visible}
        onCancel={handleClose}
        title="Thêm mới phòng đọc"
        onOk={onPressOk}
        confirmLoading={loading}
    >
        <span>Tên phòng</span>
        <Input onChange={(e) => setName(e.target.value)} value={name} placeholder="Nhập tên phòng" style={{marginTop : "10px"}}/>
    </Modal>
  )
}

export default React.forwardRef(ModalAddRoom)