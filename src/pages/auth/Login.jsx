import React, { useState } from "react";
import { Form, Input, Button, Alert, Divider, Flex, Typography } from "antd";
import { UserOutlined, LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleFinish = (values) => {
    setLoading(true);
    setLoginError("");

    setTimeout(() => {
      if (values.username === "admin" && values.password === "1234") {
        
        // ✅ Store token
        localStorage.setItem("sctoken", "dummy_token_123");

        // ✅ Redirect to dashboard/home
        navigate("/");

      } else {
        setLoginError("Invalid username or password");
      }
      setLoading(false);
    }, 1500);
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