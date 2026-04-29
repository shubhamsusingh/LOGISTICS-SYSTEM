import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import MapView from "../components/MapView";
import {
  addDeliveryLocationApi,
  getDeliveryLocationListApi,
  updateDeliveryLocationApi,
  deleteDeliveryLocationApi,
} from "@/services/deliveryLocationList.js";

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
  const [vendors, setVendors] = useState([{ id: 1, name: "Nand Pvt" }]);
  const fetchLocations = async () => {
    try {
      const res = await getDeliveryLocationListApi();
      console.log(res.data.data);
      setLocations(res.data.data);
    } catch (error) {
      console.log("Error fetching delivery locations:", error);
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
      const payload = {
        id: editId,
        name: values.center_name,
        vendor_id: values.vendor_id,
        address: values.address,
        latitude: values.latitude,
        longitude: values.longitude,
      };
      if (editId) {
        console.log(values);
        console.log(payload);
        await updateDeliveryLocationApi(payload);
      } else {
        const addPayload = {
          name: values.center_name,
          vendor_id: values.vendor_id,
          address: values.address,
          latitude: values.latitude,
          longitude: values.longitude,
        };
        console.log(addPayload);
        await addDeliveryLocationApi(addPayload);
      }
      fetchLocations();

      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDeliveryLocationApi(id);
      fetchLocations(); // refresh table
    } catch (error) {
      console.log("Delete error:", error.response?.data || error);
    }
  };

  const columns = [
    {
      title: "Center Name",
      dataIndex: "center_name",
    },
    // {
    //   title: "Vendor Name", // ✅ ADDED
    //   dataIndex: "vendorName",
    // },
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
  const vendor =
    locations.length > 0
      ? {
          start_latitude: locations[0].latitude,
          start_longitude: locations[0].longitude,
        }
      : null;

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
              vendor: vendor,
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
            name="center_name"
            label="Center Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter center name" />
          </Form.Item>
          <Form.Item
            name="vendor_id"
            label="Vendor Name"
            rules={[{ required: true, message: "Please select vendor" }]}
          >
            <Select placeholder="Select vendor">
              {vendors.map((vendor) => (
                <Select.Option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </Select.Option>
              ))}
            </Select>
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
