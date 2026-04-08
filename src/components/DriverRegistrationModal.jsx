import { Modal, Form, Input, message, Button, Select } from "antd";
import { useState } from "react";
import axiosInstance from "../utils/AxiosInterceptor";

const { Option } = Select;

export default function DriverRegistrationModal({ open, onClose }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: Number(values.role),
      };

      console.log("SENDING DATA:", payload);

      const response = await axiosInstance.post("/register", payload);

      console.log("SUCCESS:", response.data);

      message.success("User registered successfully");

      onClose();
      form.resetFields();
    } catch (error) {
      console.log("❌ ERROR STATUS:", error.response?.status);
      console.log("❌ ERROR DATA:", error.response?.data);

      message.error(
        error.response?.data?.message ||
        error.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
  title={
    <div
      style={{
        fontSize: "24px",
        fontWeight: "700",
        textAlign: "center",
        background: "linear-gradient(90deg, #4facfe, #00f2fe)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      Create Account
    </div>
  }
  open={open}
  onCancel={() => {
    onClose();
    form.resetFields();
  }}
  footer={null}
  centered
  width={420}
  styles={{
    content: {
      borderRadius: "24px",
      background: "linear-gradient(135deg, #ffffff, #f0f5ff)",
      padding: "30px",
      boxShadow: "0 15px 50px rgba(0,0,0,0.15)",
    },
  }}
>
  <Form form={form} layout="vertical" onFinish={handleSubmit}>
    
    {/* Name */}
    <Form.Item
      label={<span style={{ fontWeight: 500 }}>Full Name</span>}
      name="name"
      rules={[{ required: true, message: "Enter name" }]}
    >
      <Input
        placeholder="Enter full name"
        size="large"
        style={{
          borderRadius: "12px",
          height: "45px",
        }}
      />
    </Form.Item>

    {/* Email */}
    <Form.Item
      label={<span style={{ fontWeight: 500 }}>Email Address</span>}
      name="email"
      rules={[
        { required: true, message: "Enter email" },
        { type: "email", message: "Invalid email" },
      ]}
    >
      <Input
        placeholder="Enter email"
        size="large"
        style={{
          borderRadius: "12px",
          height: "45px",
        }}
      />
    </Form.Item>

    {/* Password */}
    <Form.Item
      label={<span style={{ fontWeight: 500 }}>Password</span>}
      name="password"
      hasFeedback
      rules={[
        { required: true, message: "Enter password" },
        { min: 6, message: "Minimum 6 characters" },
      ]}
    >
      <Input.Password
        placeholder="Enter password"
        size="large"
        style={{
          borderRadius: "12px",
          height: "45px",
        }}
      />
    </Form.Item>

    {/* Confirm Password */}
    <Form.Item
      label={<span style={{ fontWeight: 500 }}>Confirm Password</span>}
      name="confirmPassword"
      dependencies={["password"]}
      hasFeedback
      rules={[
        { required: true, message: "Confirm password" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Passwords do not match"));
          },
        }),
      ]}
    >
      <Input.Password
        placeholder="Confirm password"
        size="large"
        style={{
          borderRadius: "12px",
          height: "45px",
        }}
      />
    </Form.Item>

    {/* Role */}
    <Form.Item
      label={<span style={{ fontWeight: 500 }}>Select Role</span>}
      name="role"
      rules={[{ required: true, message: "Select role" }]}
    >
      <Select
        placeholder="Choose role"
        size="large"
        style={{
          borderRadius: "12px",
          height: "45px",
        }}
      >
        <Select.Option value={1}>Admin</Select.Option>
        <Select.Option value={2}>Driver</Select.Option>
      </Select>
    </Form.Item>

    {/* Buttons */}
    <Form.Item style={{ marginTop: "30px" }}>
      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        loading={loading}
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          border: "none",
          height: "50px",
          borderRadius: "14px",
          fontWeight: "600",
          fontSize: "16px",
          letterSpacing: "0.5px",
          boxShadow: "0 8px 20px rgba(102,126,234,0.4)",
          transition: "0.3s",
        }}
      >
        Register
      </Button>

      <Button
        onClick={() => {
          onClose();
          form.resetFields();
        }}
        block
        style={{
          marginTop: "12px",
          borderRadius: "12px",
          height: "42px",
          border: "1px solid #ccc",
        }}
      >
        Cancel
      </Button>
    </Form.Item>
  </Form>
</Modal>
  );
}