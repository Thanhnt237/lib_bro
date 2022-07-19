import React from 'react'
import { Row, Col, Button, Input, Space } from "antd"
import { SearchOutlined } from '@ant-design/icons'
function TopHeader({ title, onAdd = () => { }, onChangeSearch = () => { } , totalText= ""}) {
    return (
        <Row justify="space-between" align="middle" style={{ padding: "10px 20px", backgroundColor: "#FFF" }}>
            <Col><h3>{title}</h3></Col>
            <Col>
                <Space size={20} >
                    <span>{totalText}</span>
                    <Input onChange={(e) => onChangeSearch(e.target.value)} prefix={<SearchOutlined />} />
                    <Button type="primary" onClick={onAdd}>
                        <span>Thêm mới</span>
                    </Button>
                </Space>
            </Col>
        </Row>
    )
}

export default React.memo(TopHeader)