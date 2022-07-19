import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  Divider,
  notification,
} from "antd";

import { login } from '../slice/userSlice'
import authService from "../services/auth";
const { Title } = Typography;
export default function Login() {
  let navigate = useNavigate();
  const Register = () => {
       navigate('/register')
     }

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        setLoading(true)
        try {
            const { email, password } = values
            const response = await authService.login({
                email, password
            })
            console.log(response)
          if (response.succes) {
         
            dispatch(login(response.data.token))
           
          }
        }
        
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    
    }
    return (
        <Row justify="center">
        <Col span={6}>
          <Divider>
            <Title level={2}>Đăng nhập</Title>
          </Divider>
          <Form
            name="basic"
            
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item label="Email" name="email" >
              <Input />
            </Form.Item>
  
            <Form.Item label="Mật khẩu" name="password" >
              <Input.Password />
            </Form.Item>
  
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit" block>
                Đăng nhập
              </Button>
            </Form.Item>
          
          </Form>
          <Divider>Hoặc</Divider>
       

            <Button type="primary" block onClick={Register} >
              Đăng ký tài khoản
            </Button>
         
        </Col>
      </Row>
    )
 }
