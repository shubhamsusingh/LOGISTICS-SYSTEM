import Highcharts from "highcharts";
import HCR from "highcharts-react-official";
import "highcharts/highcharts-more"; // ✅ correct (no function call)

// ✅ extract actual component
const HighchartsReact = HCR.default;

const GaugeChart = ({ title, value }) => {
  const options = {
    chart: { type: "gauge" },
    title: { text: title },
    pane: { startAngle: -150, endAngle: 150 },
    yAxis: {
      min: 0,
      max: 100,
    },
    series: [
      {
        name: title,
        data: [value],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GaugeChart;