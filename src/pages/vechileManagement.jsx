import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { error } from "highcharts";
import { freeDriver } from '../services/driver';
const { Option } = Select;


const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, number: "MH01AB1234", capacity: 3000, driver: "Rajesh Kumar" },
    { id: 2, number: "MH02BC5678", capacity: 2000, driver: "Sunil Patel" },
    { id: 3, number: "MH03CD9103", capacity: 4000, driver: "Abdul Khan" },
  ]);

  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);

  const fetchDrivers = async () => {
    try {
      const resp = await freeDriver();
      setDrivers(resp.data.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);

    }
  }
  useEffect(() => {
    fetchDrivers();
  }, []);

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
            name="driver_id"
            label="Driver"
            rules={[{ required: true, message: "Please select driver" }]}
          >
            <Select placeholder="Select Driver">
              {drivers.map((driver) => (
                <Option key={driver.id} value={driver.id}>
                  {driver.user.name}
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
