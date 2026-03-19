import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, number: "MH01AB1234", capacity: 3000, driver: "Rajesh Kumar" },
    { id: 2, number: "MH02BC5678", capacity: 2000, driver: "Sunil Patel" },
    { id: 3, number: "MH03CD9103", capacity: 4000, driver: "Abdul Khan" },
  ]);

  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open Modal
  const showModal = (vehicle = null) => {
    setEditId(vehicle ? vehicle.id : null);
    setIsModalOpen(true);
    if (vehicle) {
      form.setFieldsValue(vehicle);
    } else {
      form.resetFields();
    }
  };

  // Handle form submit
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editId) {
        // Update existing vehicle
        setVehicles(
          vehicles.map((v) => (v.id === editId ? { ...v, ...values } : v)),
        );
      } else {
        // Add new vehicle
        const newVehicle = {
          id: Date.now(),
          ...values,
        };
        setVehicles([...vehicles, newVehicle]);
      }
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  // Delete vehicle
  const handleDelete = (id) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  // Table columns
  const columns = [
    {
      title: "Vehicle Number",
      dataIndex: "number",
    },
    {
      title: "Capacity (kg)",
      dataIndex: "capacity",
    },
    {
      title: "Driver Assigned",
      dataIndex: "driver",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h2>Vehicle Management</h2>
        <Button type="primary" onClick={() => showModal()}>
          + Add Vehicle
        </Button>
      </div>

      {/* Table */}
      <Table dataSource={vehicles} columns={columns} rowKey="id" />

      {/* Modal */}
      <Modal
        title={editId ? "Edit Vehicle" : "Add Vehicle"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="number"
            label="Vehicle Number"
            rules={[{ required: true, message: "Please enter vehicle number" }]}
          >
            <Input placeholder="Vehicle Number" />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity (kg)"
            rules={[{ required: true, message: "Please enter capacity" }]}
          >
            <Input type="number" placeholder="Capacity (kg)" />
          </Form.Item>

          <Form.Item
            name="driver"
            label="Driver Name"
            rules={[{ required: true, message: "Please enter driver name" }]}
          >
            <Input placeholder="Driver Name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VehicleManagement;
