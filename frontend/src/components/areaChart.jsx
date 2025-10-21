import React from "react";
import Chart from "react-apexcharts";

const SparklineChart = () => {
  const chartOptions = {
    chart: {
      type: "area",
      sparkline: { enabled: true },
      toolbar: { show: false },
      animations: { enabled: true },
    },
    stroke: {
      curve: "straight", // 👈 makes the lines not rounded
      width: 2,
      colors: ["#3b82f6"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
      colors: ["#60a5fa"],
    },
    grid: { show: false },
    dataLabels: { enabled: false },
    tooltip: { enabled: false },
    responsive: [
      {
        breakpoint: 768,
        options: {
          stroke: { width: 1.5 },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: "Value",
      data: [20, 40, 35, 80, 30, 90, 25, 70, 60, 85, 40, 90, 30, 75, 65],
    },
  ];

  return (
    <div className="mt-6 w-full px-4 sm:px-8 md:px-16">
      <div className="h-[140px] sm:h-[180px] md:h-[220px]">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default SparklineChart;
