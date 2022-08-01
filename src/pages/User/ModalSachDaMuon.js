import {Button, Input, Modal, notification, Popconfirm, Space, Table, Tooltip, TreeSelect} from "antd";
import React, { useState, useImperativeHandle, useEffect } from "react";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
import SwitchCustom from "../../components/SwitchCustom";
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons";
const { TreeNode } = TreeSelect;

function ModalSachDaMuon({ onOK, loading = false, onEdit }, ref) {
    const [visible, setVisible] = useState(Boolean)
    const [bookData, setBookData] = useState([])

    useEffect(() => {

    }, []);

    async function handleGetBookByUser(input){
        try {
            let response = await common_post(apis.get_sach_nguoi_dung, {NGUOI_MUON: input.ID})
            if(response.status === "OK" && response.result){
                setBookData(response.result)
            }
        }catch(error){

        }
    }

    useImperativeHandle(
        ref,
        () => {
            return {
                openModal(item) {
                    handleGetBookByUser(item)
                    console.log(bookData)
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

    const columns = [
        {
            title: "STT",
            dataIndex: "STT",
        },
        {
            title: "Tên Sách",
            dataIndex: "TEN_SACH",
        },
        {
            title: "Ngày mượn",
            dataIndex: "NGAY",
        }
    ];

    return (
        <Modal
            visible={visible}
            onCancel={handleClose}
            title="Sách đã mượn"
            okButtonProps={{style: {display: "none"}}}
            // onOk={onPressOk}
            confirmLoading={loading}
        >
            <Table
                dataSource={bookData?.map((item, index) => ({
                    key: index,
                    ...item,
                    STT: index + 1,
                }))}
                columns={columns}
                pagination={false}
                style={{ margin: "15px" }}
                scroll={{ y: "calc(100vh - 500px)" }}
            />

        </Modal>
    );
}

export default React.forwardRef(ModalSachDaMuon);
