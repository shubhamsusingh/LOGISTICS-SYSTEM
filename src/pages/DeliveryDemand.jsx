import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Card,
} from "antd";
import DemandPieChart from "../components/DemandPieChart";
import DemandBarChart from "../components/DemandBarChart";
import {getDemand} from "../services/demand";
const { Option } = Select;

const DeliveryDemand = () => {
  const [demands, setDemands] = useState([]);
  const [locations, setLocations] = useState([]); // delivery points
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();

  // Dummy data (replace with API later)
  const fetchData = async () => {
  try {
    const res = await getDemand();

    const apiData = res.data.data;

    // 👉 Format for table
    const formatted = apiData.map((item) => ({
      id: item.id,
      location_id: item.location_id,
      location_name: item.location.center_name,
      demand: item.quantity,
      date: item.demad_date,
    }));

    setDemands(formatted);

    // 👉 Extract locations (for dropdown)
    const uniqueLocations = apiData.map((item) => ({
      id: item.location.id,
      name: item.location.center_name,
    }));

    setLocations(uniqueLocations);

  } catch (err) {
    console.error("API Error:", err);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  // Open Modal
  const showModal = (record = null) => {
    setEditId(record ? record.id : null);
    setIsModalOpen(true);

    if (record) {
      form.setFieldsValue({
        ...record,
      });
    } else {
      form.resetFields();
    }
  };

  // Save
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      if (editId) {
        // update API later
      } else {
        const selectedLocation = locations.find(
          (l) => l.id === values.location_id,
        );

        const payload = {
          id: Date.now(),
          location_id: values.location_id,
          location_name: selectedLocation?.name,
          demand: values.demand,
          date: values.date.format("YYYY-MM-DD"),
        };

        setDemands([...demands, payload]);
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    setDemands(demands.filter((d) => d.id !== id));
  };

  // Table columns
  const columns = [
    {
      title: "Center Name",
      dataIndex: "location_name",
    },
    {
      title: "Demand",
      dataIndex: "demand",
    },
    {
      title: "Date",
      dataIndex: "date",
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
        <h2>Delivery Demand</h2>
        <Button type="primary" onClick={() => showModal()}>
          + Add Demand
        </Button>
      </div>

      <Table
  dataSource={demands}
  columns={columns}
  rowKey="id"
  pagination={{
    pageSize: 6, // 👉 show only 5 records
  }}
/>

      {/* Modal */}
      <Modal
        title={editId ? "Edit Demand" : "Add Demand"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="location_id"
            label="Delivery Point"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Delivery Point">
              {locations.map((loc) => (
                <Option key={loc.id} value={loc.id}>
                  {loc.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="demand"
            label="Demand Quantity"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="Enter demand" />
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
  
  {/* Left - Pie Chart */}
  <Card title="Demand Summary" style={{ flex: 1 }}>
    <DemandPieChart demands={demands} />
  </Card>

  {/* Right - Bar Chart */}
  <Card title="Top 7 Locations Demand" style={{ flex: 1 }}>
    <DemandBarChart demands={demands} />
  </Card>

</div>
    </div>
  );
};

export default DeliveryDemand;
