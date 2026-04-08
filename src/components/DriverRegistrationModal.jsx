import { Modal, Form, Input, message, Button, Select } from "antd";
import { useState } from "react";
import axiosInstance from "../utils/AxiosInterceptor";

const { Option } = Select;

export default function DriverRegistrationModal({ open, onClose }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

const handleSubmit = async (values) => {
  try {
    const payload = {
      ...values,
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
    console.log("❌ FULL ERROR:", error);

    message.error(
      error.response?.data?.message ||
      error.message ||
      "Registration failed"
    );
  }
};

  return (
    <Modal
      title={
        <div
          style={{
            fontSize: "22px",
            fontWeight: "700",
            textAlign: "center",
            color: "#1a2b4a",
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
      styles={{
        content: {
          borderRadius: "20px",
          background: "linear-gradient(145deg, #f0f4ff, #ffffff)",
          padding: "28px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        
        {/* Name */}
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Enter name" }]}
        >
          <Input
            placeholder="Enter full name"
            size="large"
            style={{ borderRadius: "10px" }}
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: "Enter email" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input
            placeholder="Enter email"
            size="large"
            style={{ borderRadius: "10px" }}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Enter password" },
            { min: 6, message: "Minimum 6 characters" },
          ]}
        >
          <Input.Password
            placeholder="Enter password"
            size="large"
            style={{ borderRadius: "10px" }}
          />
        </Form.Item>

        {/* 🔥 Role Selection (NEW) */}
        <Form.Item
          label="Select Role"
          name="role"
          rules={[{ required: true, message: "Select role" }]}
        >
          <Select
            placeholder="Choose role"
            size="large"
            style={{ borderRadius: "10px" }}
          >
            <Option value={1}>Admin</Option>
            <Option value={2}>Driver</Option>
          </Select>
        </Form.Item>

        {/* Buttons */}
        <Form.Item style={{ marginTop: "25px" }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #4facfe, #00f2fe)",
              border: "none",
              height: "48px",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "16px",
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
              borderRadius: "10px",
              height: "40px",
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}