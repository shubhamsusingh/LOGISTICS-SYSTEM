import React, { useState } from "react";
import { Form, Input, Button, Alert, Divider, Flex, Typography } from "antd";
import { UserOutlined, LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/auth";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleFinish = async(values) => {
    setLoading(true);
    setLoginError("");
      
    const payload = {
      email: values.username,
      password: values.password,
    };
    try {
      const resp=await loginApi(payload);
      setLoading(false);
      if(resp&&resp.status===200){
        console.log(resp);
        const token=resp.data.token;
        localStorage.setItem('sctoken', token);
        navigate("/");
      }else{
        setLoginError("Invalid username or password");
      }
      
    } catch (error) {
      setLoading(false);
      setLoginError(error);
    }
  };

  return (
    <Flex align="center" justify="center" className={styles.container}>
      <div className={styles.loginBox}>

        <Title level={3} className={styles.title}>
          Smart Logistics 🚚
        </Title>

        {loginError && (
          <Alert
            type="error"
            message={loginError}
            className={styles.error}
          />
        )}

        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Enter username" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              shape="round"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <Divider />
      </div>
    </Flex>
  );
};

export default Login;