import React from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function IncomeExpenseChart({ data, title }) {
  return (
    <div className="flex-1 bg-[#f2fdfd] dark:bg-[#2C2C2C] rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-[#1e494c] dark:text-[#F5F5F5] text-center mb-4">
        {title}
      </h2>
      <Pie data={data} options={{ maintainAspectRatio: true, responsive: true }} />
    </div>
  );
}
