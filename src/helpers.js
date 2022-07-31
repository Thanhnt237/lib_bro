import { notification } from "antd";
import API from "./configs/configAxios";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export const common_post = async (url, body) => {
  try {
    console.log("common post " + url + "body", body);
    let dataResponse = await API.post(url, body);
    console.log("common_post", dataResponse);
    return dataResponse.data;
  } catch (error) {
    if (error.message.includes("timeout")) {
      notification.error({ message: "Lỗi kết nối" });
    }
  }
};

export const exportToCSV = async (csvData = [], fileName = "data", offsetRow = 0) => {
  try {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(csvData);

    let offColumns = [];

    if (csvData.length > 0) {
      const firstData = csvData[0];
      const keyLength = Object.keys(firstData).length;
      offColumns = new Array(keyLength).fill(null).map(() => [""]);
    }

    XLSX.utils.sheet_add_aoa(
      ws,
      new Array(offsetRow).fill(null).map(() => offColumns),
      { origin: 0 }
    );

    let wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = await XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  } catch (error) {
    console.log("[ERROR] export csv error");
  }
};
