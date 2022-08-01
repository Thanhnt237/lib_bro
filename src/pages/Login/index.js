import React from 'react'
import styles from "./style.module.scss"
import { imgBachKhoa, preload } from "../../assets/images"
import {Col, Row, Form, Button, Input, notification, Image} from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { doLogin, resetAuthMessage } from '../../redux/slices/authSlice'
import { useHistory } from 'react-router-dom'
import { keyActionLogins, paths } from '../../constants'
function Login() {
  const [form] = useForm()
  const history = useHistory()
  const dispatch = useDispatch()
  const loginState = useSelector(state => state.auth)
  console.log("loginState",loginState)
  //handle data form submit
  let isPreloadDone = false;
  function onSubmitForm(values) {
    console.log(values)
    dispatch(doLogin(values))
  }

  React.useEffect(() => {
    let {message} = loginState
      if (message === keyActionLogins.LOGIN_SUCCESS) {   
          notification.success({message : "Đăng nhập thành công !"})
          isPreloadDone = true
          // setTimeout(()=>{
          //   history.push(paths.room_reading)
          // },5000)
      }
      if (message === keyActionLogins.LOGIN_FAIL) {
          notification.error({     
            message: "Đăng nhập thất bại vui lòng thử lại !",
          });
      }
      if (message === keyActionLogins.USERNAME_PASSWORD_ERROR) {
        notification.error({
          message: "Sai tên đăng nhập hoặc mật khẩu !",
        });
    }
   
      dispatch(resetAuthMessage())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginState])

  if(isPreloadDone){
    return (
        <div>
          <div
              style={{
                backgroundImage: `url(${ preload })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "100vw",
                height: "100vh",
              }}
          ></div>
          <div
              style={{
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                backgroundColor: "#00000099",
                display: "flex",
                "align-items": "center",
                "justify-content": "center",
                color: "#337AB7",
                "-webkit-text-stroke": "2px black",
                "font-family": "sans",
                "font-size": "100px"
              }}
          >
              <h1 className={styles.typewriter}>ONE LOVE ONE FUTURE</h1>
          </div>
        </div>
    )
  }else{
    return (
        <Row>
          <Col span={14}>
            <div style={{ height: "calc(100vh)" }}>
              <img
                  src={imgBachKhoa}
                  alt=""
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.body_right}>
              <h1 style={{ textAlign: "center", fontSize: 40 }}>Đăng nhập</h1>
              <Form
                  onFinish={onSubmitForm}
                  layout="vertical"
                  style={{ minWidth: "430px" }}
                  form = {form}
              >
                <Form.Item
                    label="Tên đăng nhập"
                    name={fieldName.username}
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập tên đăng nhập",
                      },
                    ]}
                >
                  <Input className={styles.input}/>
                </Form.Item>
                <Form.Item
                    label="Mật khẩu"
                    name={fieldName.password}
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập mật khẩu",
                      },
                    ]}
                >
                  <Input.Password className={styles.input} />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: 10 }}
                    block
                    className={styles.button}
                    // loading={loadingLogin}
                >
                  Đăng nhập
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
    )
  }
}

export default Login

const fieldName = {
  username: "USERNAME",
  password: "PASSWORD"

}