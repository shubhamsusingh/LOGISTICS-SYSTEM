import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import MapView from "../components/MapView";

const DeliveryPoints = () => {
  // ✅ renamed
  const [locations, setLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();

  const fetchLocations = async () => {
    try {
      setLocations([
        {
          id: 1,
          name: "Anganwadi Center A",
          address: "123 Main Street",
          latitude: "18.5204",
          longitude: "73.8567",
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const showModal = (record = null) => {
    setEditId(record ? record.id : null);
    setIsModalOpen(true);

    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (editId) {
        // update API later
      } else {
        const payload = {
          name: values.name,
          address: values.address,
          latitude: values.latitude,
          longitude: values.longitude,
        };

        console.log(payload);
        fetchLocations();
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  const columns = [
    {
      title: "Center Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
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
        <h2>Delivery Points</h2>
        <Button type="primary" onClick={() => showModal()}>
          + Add Delivery Point
        </Button>
      </div>

      <Table dataSource={locations} columns={columns} rowKey="id" />

      <Modal
        title={editId ? "Edit Delivery Point" : "Add Delivery Point"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Center Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter center name" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          <div
            style={{
              height: 200,
              background: "#f0f0f0",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MapView
              lat={17.385} // your delivery location
              lng={78.4867}
            />
          </div>

          <Form.Item
            name="latitude"
            label="Latitude"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter latitude" />
          </Form.Item>

          <Form.Item
            name="longitude"
            label="Longitude"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter longitude" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeliveryPoints;
