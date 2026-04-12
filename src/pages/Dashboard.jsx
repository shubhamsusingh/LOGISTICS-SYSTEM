<div
  style={{
    padding: "24px",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
  }}
>
  {/* TOP STATS */}
  <Row gutter={[20, 20]}>
    {/* keep your stat cards same */}
  </Row>

  {/* MIDDLE */}
  <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
    
    {/* LEFT */}
    <Col xs={24} md={12}>
      {/* 🔥 UPDATED FUEL CARD */}
      <Card
        hoverable
        style={{
          borderRadius: "20px",
          background: "linear-gradient(135deg, #0ea5e9, #38bdf8)", // ✅ NEW COLOR
          color: "white",
          boxShadow: "0 15px 35px rgba(14,165,233,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <DollarOutlined style={{ fontSize: 26 }} />
          <h3>Fuel Cost Estimate</h3>
        </div>

        <h1 style={{ marginTop: 10 }}>₹ 18,750 / Day</h1>
        <p style={{ opacity: 0.85 }}>Estimated Daily Fuel Cost</p>
      </Card>

      {/* SYSTEM OVERVIEW */}
      <Card
        hoverable
        style={{
          borderRadius: "20px",
          marginTop: 16,
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h3>System Overview</h3>

        <Row justify="space-between" style={{ marginTop: 20 }}>
          <Col span={8} style={{ textAlign: "center" }}>
            <CarOutlined style={{ fontSize: 26, color: "#6366f1" }} />
            <h3>475 km</h3>
            <span style={{ color: "#6b7280" }}>Distance</span>
          </Col>

          <Col span={8} style={{ textAlign: "center" }}>
            <DashboardOutlined style={{ fontSize: 26, color: "#10b981" }} />
            <h3>82%</h3>
            <span style={{ color: "#6b7280" }}>Utilization</span>
          </Col>

          <Col span={8} style={{ textAlign: "center" }}>
            <ClockCircleOutlined style={{ fontSize: 26, color: "#3b82f6" }} />
            <h3>94%</h3>
            <span style={{ color: "#6b7280" }}>On-Time</span>
          </Col>
        </Row>
      </Card>
    </Col>

    {/* 🔥 RIGHT MAP (FIXED SIZE) */}
    <Col xs={24} md={12}>
      <Card
        title="📍 Live Route Map"
        hoverable
        style={{
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          height: "100%",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div
          style={{
            height: "100%",
            minHeight: "360px",
            width: "100%",
          }}
        >
          <MapView data={data} />
        </div>
      </Card>
    </Col>
  </Row>

  {/* BOTTOM */}
  <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
    <Col xs={24} md={12}>
      <Card
        title="📊 Delivery Trends"
        hoverable
        style={{
          borderRadius: "20px",
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <DeliveryChart />
      </Card>
    </Col>

    <Col xs={24} md={6}>
      <Card
        hoverable
        style={{
          borderRadius: "20px",
          textAlign: "center",
          background: "rgba(255,255,255,0.9)",
        }}
      >
        <GaugeChart title="Fuel Usage" value={70} />
      </Card>
    </Col>

    <Col xs={24} md={6}>
      <Card
        hoverable
        style={{
          borderRadius: "20px",
          textAlign: "center",
          background: "rgba(255,255,255,0.9)",
        }}
      >
        <GaugeChart title="Cost Savings" value={22} />
      </Card>
    </Col>
  </Row>
</div>