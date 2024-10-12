import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "components/card"; // Assuming you have a Card component

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyRevenue = () => {
  // Data for the chart
  const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat'];
  const totalClaims = [122000, 76000, 63000, 55000, 50000];
  const legitClaims = [81500, 52000, 41000, 36000, 33000];

  // Chart data
  const data = {
    labels: states,
    datasets: [
      {
        label: 'Total Claims',
        data: totalClaims,
        backgroundColor: 'rgba(75, 192, 192, 1)', // Blue color
        barThickness: 30,
      },
      {
        label: 'Legitimate Claims',
        data: legitClaims,
        backgroundColor: 'rgba(54, 162, 235, 1)', // Green color
        barThickness: 30,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'State-wise Motor Insurance Claims in India',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Claims',
        },
      },
    },
  };

  return (
    <Card extra="!p-4 text-center">
      <h2 className="text-xl font-bold mb-4">State-wise Motor Insurance Claims</h2>
      <Bar data={data} options={options} />
    </Card>
  );
};

export default WeeklyRevenue;
