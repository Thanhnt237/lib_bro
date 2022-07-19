import { Switch } from "antd"
import React, {useState} from "react"
import { common_post } from "../helpers"
const SwitchCustom = ({initChecked,dataRequest, api , key_data, callBack = () => {}}) => {
    const [loading, setLoading] = useState(false)
  
    const handleChangeStatus = async (value) => {
      try {
        const response = await common_post(api, {...dataRequest, [key_data] : Number(value)})
        if (response && response.status === "OK") {
            callBack()
            setLoading(false)
        }
      } catch (error) {
      }
    }
  
    return <Switch defaultChecked = {initChecked} onChange = {(values) => {
      setLoading(true)
      handleChangeStatus(values)
    }} loading = {loading}/>
  }

export default SwitchCustom