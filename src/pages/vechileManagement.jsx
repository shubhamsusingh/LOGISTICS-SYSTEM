import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Card } from "antd";
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
      console.error(error);
    }
  };

  useEffect(() => {
    vehiclsDetails();
    fetchDrivers();
  }, []);

  // ✅ OPEN MODAL (FIXED)
  const showModal = (vehicle = null) => {
    setIsModalOpen(true);

    if (vehicle) {
      setEditId(vehicle.id);

      form.setFieldsValue({
        vehicle_number: vehicle.vehicle_number,
        capacity: vehicle.capacity,

        driver_id: {
          value: vehicle.driver?.id,
          label: vehicle.driver?.user?.name,
        }, // ✅ for API
      });
    } else {
      setEditId(null);
      form.resetFields();
    }
  };

  // ✅ SUBMIT
  const handleOk = async () => {
  try {
    const values = await form.validateFields();

    const payload = {
      driver_id: values.driver_id.value, // ✅ extract ID
      vehicle_number: values.vehicle_number,
      capacity: values.capacity,
    };

    setLoading(true);

    if (editId) {
      // ✅ UPDATE (include id)
      await updateVehicle({
        id: editId,
        ...payload,
      });
      message.success("Vehicle updated successfully");
    } else {
      // ✅ ADD (no id)
      await addVehicle(payload);
      message.success("Vehicle added successfully");
    }

    await vehiclsDetails();
    setIsModalOpen(false);
    form.resetFields();
  } catch (error) {
    message.error("Operation failed");
  } finally {
    setLoading(false);
  }
};

  // ✅ DELETE
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
          message.success("Vehicle deleted");
          await vehiclsDetails();
        } catch {
          message.error("Delete failed");
        }
      },
    });
  };

  // TABLE
  const columns = [
    {
      title: "Vehicle Number",
      dataIndex: "vehicle_number",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
    },
    {
      title: "Driver",
      render: (_, record) => record?.driver?.user?.name || "N/A",
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
      <Card
        title="🚚 Vehicle Management"
        extra={
          <Button type="primary" onClick={() => showModal()}>
            + Add Vehicle
          </Button>
        }
        style={{
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Table
          dataSource={vehicles}
          columns={columns}
          rowKey="id"
          loading={loading}
        />
      </Card>

      <Modal
        title={editId ? "Edit Vehicle" : "Add Vehicle"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Confirm"
        confirmLoading={loading}
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="vehicle_number"
            label="Vehicle Number"
            rules={[{ required: true }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[{ required: true }]}
          >
            <Input type="number" size="large" />
          </Form.Item>

          {/* ✅ DRIVER FIELD FINAL FIX */}
          <Form.Item
            name="driver_id"
            label="Driver"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Driver"
              labelInValue // ✅ IMPORTANT
            >
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
