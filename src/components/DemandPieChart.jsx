import Highcharts from "highcharts";
import HCR from "highcharts-react-official";

const HighchartsReact = HCR.default;

const DemandPieChart = () => {
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
          { name: "Food Grain", y: 210 },
          { name: "Milk", y: 240 },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DemandPieChart;
