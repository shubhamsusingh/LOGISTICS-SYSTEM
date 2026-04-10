import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import MapView from "../components/MapView";

const DeliveryPoints = () => {
  // ✅ renamed
  const [locations, setLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();

  const latRaw = Form.useWatch("latitude", form);
  const lngRaw = Form.useWatch("longitude", form);
  const lat = parseFloat(latRaw);
  const lng = parseFloat(lngRaw);
  const [locationLabel, setLocationLabel] = useState("");
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

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.results?.[0]) {
            setLocationLabel(data.results[0].formatted_address);
          }
        });
    } else {
      setLocationLabel("");
    }
  }, [lat, lng]);

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
      {/* Map showing all delivery points */}
      {locations.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 12 }}>Delivery Points Map</h3>
          <MapView
            data={{
              locationList: locations,
            }}
          />
        </div>
      )}

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

          {!isNaN(lat) && !isNaN(lng) && (
            <>
              <MapView
                data={{
                  singlePoint: { lat, lng },
                }}
              />
              {locationLabel && (
                <div
                  style={{
                    marginTop: 6,
                    padding: "6px 10px",
                    background: "#f0f9ff",
                    border: "1px solid #bae0ff",
                    borderRadius: 6,
                    fontSize: 13,
                    color: "#0958d9",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  📍 {locationLabel}
                </div>
              )}
            </>
          )}

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
