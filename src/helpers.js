import { notification } from "antd";
import API from './configs/configAxios';

export const common_post = async (url, body) => {
    try {
      console.log("common post " + url +"body" + JSON.stringify(body))
      let dataResponse = await API.post(url, body);
      console.log("common_post", dataResponse)
      return dataResponse.data;
    } catch (error) {
      if (error.message.includes("timeout")) {
        notification.error({ message: "Lỗi kết nối" });
      }
    }
  };