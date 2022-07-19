import React, { useState } from 'react'
import { Table } from "antd"
function TableCustom({
    data = [],
    columns = [],
    loading = false,
    changePage = () => {},
    pagination = {},
    onClickRow = () => {}
}) {

    // const [pagination, setPagination] = useState({
    //     current: 1,
    //     pageSize: 10,
    // });

    function handleTableChange(newPagination){
        changePage(newPagination)
    }

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            onRow={(record, rowIndex) => {
                return {
                  onClick: event => onClickRow(record), // click row
                  onDoubleClick: event => {}, // double click row
                  onContextMenu: event => {}, // right button click row
                  onMouseEnter: event => {}, // mouse enter row
                  onMouseLeave: event => {}, // mouse leave row
                };
              }}
        />
    )
}

export default TableCustom