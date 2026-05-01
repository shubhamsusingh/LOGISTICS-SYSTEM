import Highcharts from "highcharts";
import HCR from "highcharts-react-official";
import { useState } from "react";

const HighchartsReact = HCR.default;

const DemandBarChart = ({ demands }) => {
  const [hidden, setHidden] = useState([]);

  // 👉 remove hidden ones
  const visibleDemands = demands.filter(
    (item) => !hidden.includes(item.location_id)
  );

  // 👉 sort + take top 7
  const topLocations = [...visibleDemands]
    .sort((a, b) => b.demand - a.demand)
    .slice(0, 7);

  // 👉 prepare data
  const categories = topLocations.map((item) => item.location_name);

  const data = topLocations.map((item) => ({
    y: item.demand,
    location_id: item.location_id,
  }));

  // 👉 click handler
  const handleClick = function () {
    const locId = this.options.location_id;

    setHidden((prev) => [...prev, locId]);
  };

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Top 7 Locations Demand",
    },
    xAxis: {
      categories,
    },
    yAxis: {
      title: {
        text: "Demand Quantity",
      },
    },
    plotOptions: {
      column: {
        cursor: "pointer",
        point: {
          events: {
            click: handleClick,
          },
        },
      },
    },
    series: [
      {
        name: "Demand",
        data,
        colorByPoint: true,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DemandBarChart;