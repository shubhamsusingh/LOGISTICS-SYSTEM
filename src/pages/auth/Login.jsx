import React, { useState } from "react";

import bgImage from "../../assets/bg.jpg";

import { Form, Input, Button, Alert, Typography } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/auth";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleFinish = async (values) => {
    setLoading(true);
    setLoginError("");

    const payload = {
      email: values.username,
      password: values.password,
    };

    try {
      const resp = await loginApi(payload);
      setLoading(false);

      if (resp && resp.status === 200) {
        const token = resp.data.token;
        const role = resp.data.user.role;

        localStorage.setItem("role", role);
        localStorage.setItem("sctoken", token);

        if (role === 1) navigate("/");
        else navigate("/driver");
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (error) {
      setLoading(false);
      setLoginError("Login failed. Try again.");
    }
  };

  return (
    <div
  className={styles.container}
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
      <div className={styles.overlay}>
        <div className={styles.loginBox}>
          <Title level={2} className={styles.title}>
            🚚 Smart Logistics
          </Title>

          <p className={styles.subtitle}>
            Manage your logistics efficiently
          </p>

          {loginError && (
            <Alert type="error" message={loginError} className={styles.error} />
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
                className={styles.input}
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
                className={styles.input}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                className={styles.loginBtn}
                icon={<ArrowRightOutlined />}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;