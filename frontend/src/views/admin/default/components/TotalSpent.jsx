import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "components/card"; // Assuming you have a Card component

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TotalSpent = () => {
  // Data for the chart
  const years = [2018, 2019, 2020, 2021, 2022, 2023];
  const fraudCasesPercentage = [45, 50, 55, 58, 60, 60]; // Percentage of insurers reporting fraud
  const fraudRiseCases = [20, 30, 35, 40, 55, 60];       // Number of fraud cases in thousands

  // Chart data for "Percentage of Insurers Reporting Fraud"
  const dataPercentage = {
    labels: years,
    datasets: [
      {
        label: 'Percentage of Insurers Reporting Fraud Rise',
        data: fraudCasesPercentage,
        borderColor: 'rgba(59, 130, 246, 1)', // Tailwind blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: 'rgba(59, 130, 246, 1)',
        fill: true,
      },
    ],
  };

  // Chart data for "Estimated Fraud Cases"
  const dataCases = {
    labels: years,
    datasets: [
      {
        label: 'Estimated Fraud Cases (in thousands)',
        data: fraudRiseCases,
        borderColor: 'rgba(239, 68, 68, 1)', // Tailwind red-500
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        pointBorderColor: 'rgba(239, 68, 68, 1)',
        fill: true,
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
        text: 'Trends in Motor Vehicle Insurance Fraud in India (2018-2023)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card extra="!p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Motor Vehicle Insurance Fraud Trends</h2>
      
      {/* Chart for Percentage of Insurers Reporting Fraud */}
      <div className="mb-8">
        <Line data={dataPercentage} options={options} />
      </div>

      {/* Chart for Estimated Fraud Cases */}
      <div>
        <Line data={dataCases} options={options} />
      </div>
    </Card>
  );
};

export default TotalSpent;
