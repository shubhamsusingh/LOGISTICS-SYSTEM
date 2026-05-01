import Highcharts from "highcharts";
import HCR from "highcharts-react-official";

const HighchartsReact = HCR.default;

const DemandPieChart = ({ demands }) => {
  // 👉 Total Milk Demand (dynamic)
  const totalMilk = demands.reduce((sum, item) => sum + item.demand, 0);

  // 👉 Static Paneer
  const paneer = 150;

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Demand Summary",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.y}",
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Demand",
        data: [
          { name: "Milk", y: totalMilk },   // ✅ dynamic
          { name: "Paneer", y: paneer },    // ✅ static
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DemandPieChart;
