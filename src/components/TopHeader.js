import React from "react";
import { Row, Col, Button, Input, Space, Tag } from "antd";
import { ExportOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";

function TopHeader({ title, onAdd, onChangeSearch, totalText, onExportExcel }) {
  return (
    <Row
      justify="space-between"
      align="middle"
      style={{ padding: "10px 20px", backgroundColor: "#FFF" }}
    >
      <Col>
        <Space>
          <h3 style={{ marginBottom: 0 }}>{title}</h3>
          {totalText ? (
            <Tag
              color="blue"
              style={{ height: 25, display: "flex", alignItems: "center", fontSize: 14 }}
            >
              {totalText}
            </Tag>
          ) : (
            <></>
          )}
        </Space>
      </Col>

      <Col>
        <Space size={20}>
          {onExportExcel && (
            <Button type="primary" onClick={onExportExcel} icon={<ExportOutlined />}>
              Xuất excel
            </Button>
          )}

          {onChangeSearch && (
            <Input onChange={(e) => onChangeSearch(e.target.value)} prefix={<SearchOutlined />} />
          )}

          {onAdd && (
            <Button type="primary" onClick={onAdd} icon={<PlusOutlined />}>
              Thêm mới
            </Button>
          )}
        </Space>
      </Col>
    </Row>
  );
}

export default React.memo(TopHeader);
