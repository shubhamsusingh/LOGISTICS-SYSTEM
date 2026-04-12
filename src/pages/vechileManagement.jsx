import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Card,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { freeDriver } from "../services/driver";
import {
  vehicleList,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicle";

const { Option } = Select;

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch vehicles
  const vehiclsDetails = async () => {
    try {
      setLoading(true);
      const resp = await vehicleList();
      setVehicles(resp.data.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      message.error("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  // Fetch drivers
  const fetchDrivers = async () => {
    try {
      const resp = await freeDriver();
      setDrivers(resp.data.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    vehiclsDetails();
    fetchDrivers();
  }, []);

  // Open Modal
  const showModal = (vehicle = null) => {
    setEditId(vehicle ? vehicle.id : null);
    setIsModalOpen(true);

    if (vehicle) {
      form.setFieldsValue({
        vehicle_number: vehicle.vehicle_number,
        capacity: vehicle.capacity,
        driver_id: vehicle.driver?.id,
      });
    } else {
      form.resetFields();
    }
  };

  // Submit
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        driver_id: values.driver_id,
        vehicle_number: values.vehicle_number,
        capacity: values.capacity,
      };

      setLoading(true);

      if (editId) {
        await updateVehicle({ id: editId, ...payload });
        message.success("Vehicle updated successfully");
      } else {
        await addVehicle(payload);
        message.success("Vehicle added successfully");
      }

      await vehiclsDetails();
      await fetchDrivers();

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Error:", error);
      message.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete with confirmation
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Vehicle",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this vehicle?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",

      onOk: async () => {
        try {
          await deleteVehicle(id);
          message.success("Vehicle deleted successfully");
          await vehiclsDetails();
        } catch (error) {
          console.error("Delete failed:", error);
          message.error("Delete failed");
        }
      },
    });
  };

  // Table Columns
  const columns = [
    {
      title: "Vehicle Number",
      dataIndex: "vehicle_number",
    },
    {
      title: "Capacity (kg)",
      dataIndex: "capacity",
    },
    {
      title: "Driver Assigned",
      render: (_, record) =>
        record?.driver?.user?.name || "N/A",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      
      {/* 🔥 Card UI */}
      <Card
        title="🚚 Vehicle Management"
        extra={
          <Button type="primary" onClick={() => showModal()}>
            + Add Vehicle
          </Button>
        }
        style={{ borderRadius: "16px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}
      >
        <Table
          dataSource={vehicles}
          columns={columns}
          rowKey="id"
          loading={loading}
        />
      </Card>

      {/* 🔥 Modal */}
      <Modal
        title={editId ? "Edit Vehicle" : "Add Vehicle"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Confirm"
        confirmLoading={loading}
        centered
        styles={{
          content: {
            borderRadius: "20px",
          },
        }}
      >
        <Form form={form} layout="vertical">
          
          <Form.Item
            name="vehicle_number"
            label="Vehicle Number"
            rules={[{ required: true, message: "Enter vehicle number" }]}
          >
            <Input size="large" placeholder="e.g. UK-07-1234" />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity (kg)"
            rules={[{ required: true, message: "Enter capacity" }]}
          >
            <Input type="number" size="large" placeholder="e.g. 500" />
          </Form.Item>

          <Form.Item
            name="driver_id"
            label="Driver"
            rules={[{ required: true, message: "Select driver" }]}
          >
            <Select size="large" placeholder="Select Driver">
              {drivers.map((driver, index) => (
                <Option key={driver.id} value={driver.id}>
                  {`Driver ${index + 1}`}
                </Option>
              ))}
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default VehicleManagement;