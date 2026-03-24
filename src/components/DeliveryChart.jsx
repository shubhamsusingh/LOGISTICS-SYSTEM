import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DeliveryChart = () => {
  const options = {
    chart: { type: "column" },
    title: { text: "Delivery Performance" },
    xAxis: { categories: ["Completed", "Delayed", "Pending"] },
    series: [
      {
        name: "Deliveries",
        data: [10, 5, 3],
      },
    ],
  };

  return (
    <HighchartsReact.default 
      highcharts={Highcharts} 
      options={options} 
    />
  );
};

export default DeliveryChart;