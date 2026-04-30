import { useState, useEffect } from "react";
import { Card } from "antd";
import styles from "../../pages/Driver/Dashboard.module.css";

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temp: 28,
    condition: "Sunny",
    humidity: 65,
    wind: 12,
    icon: "☀️"
  });

  // Simulate weather updates
  useEffect(() => {
    const conditions = [
      { condition: "Sunny", icon: "☀️", temp: 28 },
      { condition: "Cloudy", icon: "☁️", temp: 25 },
      { condition: "Rainy", icon: "🌧️", temp: 22 },
      { condition: "Partly Cloudy", icon: "⛅", temp: 26 }
    ];

    const interval = setInterval(() => {
      const random = conditions[Math.floor(Math.random() * conditions.length)];
      setWeather({
        ...random,
        humidity: Math.floor(Math.random() * 30) + 50,
        wind: Math.floor(Math.random() * 15) + 5
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      className={styles.weatherCard}
      bodyStyle={{ padding: "16px" }}
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        border: "none",
        borderRadius: 12,
        color: "white"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 11, opacity: 0.9, marginBottom: 4 }}>
            Current Weather
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>
            {weather.temp}°C
          </div>
          <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>
            {weather.condition}
          </div>
        </div>
        <div style={{ fontSize: 48 }}>
          {weather.icon}
        </div>
      </div>
      <div style={{
        display: "flex",
        gap: 16,
        marginTop: 12,
        paddingTop: 12,
        borderTop: "1px solid rgba(255,255,255,0.2)",
        fontSize: 11
      }}>
        <div>
          <div style={{ opacity: 0.8 }}>Humidity</div>
          <div style={{ fontWeight: 600, marginTop: 2 }}>{weather.humidity}%</div>
        </div>
        <div>
          <div style={{ opacity: 0.8 }}>Wind</div>
          <div style={{ fontWeight: 600, marginTop: 2 }}>{weather.wind} km/h</div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;