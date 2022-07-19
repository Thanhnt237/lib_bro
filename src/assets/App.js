import { Button, Row, Space } from "antd";
import Printd from "printd";
import { useRef, useState } from "react";
import { templates } from "./templates";
import "./app.css";

function App() {
  const ref = useRef();
  const [html, setHtml] = useState(templates.phieu_muon_sach.html);

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
  }

  return (
    <div>
      <Row justify="center">
        <Space size={20}>
          <Button
            type="primary"
            size="large"
            onClick={() => handlePrint(templates.phieu_muon_sach)}
          >
            In phiếu mượn sách
          </Button>
          <Button type="primary" ghost size="large">
            In phiếu trả sách
          </Button>
        </Space>
      </Row>

      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} className="print-src" />
    </div>
  );
}

export default App;
