import {Input, Modal, notification, Table, TreeSelect} from "antd";
import React, { useState, useImperativeHandle, useEffect } from "react";
import { common_post } from "../../helpers";
import { apis } from "../../constants";
const { TreeNode } = TreeSelect;

function ModalSachDaMuon({ onOK, loading = false, onEdit }, ref) {
    const [visible, setVisible] = useState(Boolean)
    useEffect(() => {

    }, []);

    useImperativeHandle(
        ref,
        () => {
            return {
                openModal(item) {
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

    return (
        <Modal
            visible={visible}
            onCancel={handleClose}
            title="Sách đã mượn"
            // onOk={onPressOk}
            confirmLoading={loading}
        >
            <Table
                // dataSource={listSach.map((item, index) => ({
                //     key: index,
                //     ...item,
                //     STT: index + 1,
                // }))}
                // columns={columns}
                // pagination={{ pageSize: 13 }}
                // style={{ margin: "15px" }}
                // scroll={{ y: "calc(100vh - 200px)" }}
                // onRow={(record, rowIndex) => {
                //     return {
                //         onClick: (event) => onClickRow(record), // click row
                //     };
                // }}
            />

        </Modal>
    );
}

export default React.forwardRef(ModalSachDaMuon);
