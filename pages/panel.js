import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import TransactionForm from './TransactionForm';
import BudgetOverview from './BudgetOverview';

export default function PanelPage() {
  const [transactions, setTransactions] = useState([]);
  const [budgetLimits, setBudgetLimits] = useState({});
  const categories = ['Yiyecek', 'Ulaşım', 'Eğlence', 'Diğer'];

  const addTransaction = useCallback((newTransaction) => {
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  }, [transactions]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);

    const savedBudgetLimits = JSON.parse(localStorage.getItem('budgetLimits')) || {};
    setBudgetLimits(savedBudgetLimits);
  }, []);

  const getCategoryData = useMemo(() => {
    const incomeData = categories.map((category) =>
      transactions
        .filter((t) => t.category === category && t.type === 'Gelir')
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const expenseData = categories.map((category) =>
      transactions
        .filter((t) => t.category === category && t.type === 'Gider')
        .reduce((sum, t) => sum + t.amount, 0)
    );

    return { incomeData, expenseData };
  }, [transactions, categories]);

  const incomeChartData = useMemo(() => ({
    labels: categories,
    datasets: [
      {
        data: getCategoryData.incomeData,
        backgroundColor: ['#a7ddc3', '#9feadc', '#93c8be', '#76a29a'],
        hoverBackgroundColor: ['#77aca2', '#599388', '#2d6c61', '#618f84'],
      },
    ],
  }), [getCategoryData]);

  const expenseChartData = useMemo(() => ({
    labels: categories,
    datasets: [
      {
        data: getCategoryData.expenseData,
        backgroundColor: ['#a7ddc3', '#9feadc', '#93c8be', '#76a29a'],
        hoverBackgroundColor: ['#77aca2', '#599388', '#2d6c61', '#618f84'],
      },
    ],
  }), [getCategoryData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#bcdbd7] to-[#3fa19a] flex justify-center items-center font-inter p-4">
      <div className="container max-w-5xl bg-white bg-opacity-70  rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-[#1e494c] mb-6">
          Bütçe Yönetimi Paneli
        </h1>

        {/* Gelir/Gider Formu */}
        <div className="bg-[#f2fdfd] shadow-md rounded-lg mb-6">
          <TransactionForm onAddTransaction={addTransaction} categories={categories} />
        </div>

        {/* Grafikler ve Bütçe Genel Durumu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gelir Grafiği */}
          <div className="flex flex-col items-center bg-[#f2fdfd] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-[#1e494c] mb-4">Gelirler</h2>
            <div className="w-64 h-64">
              <Pie
                data={incomeChartData}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        color: '#1e494c',
                        font: { size: 12 },
                      },
                    },
                  },
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
            </div>
          </div>

          {/* Gider Grafiği */}
          <div className="flex flex-col items-center bg-[#f2fdfd] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-[#1e494c] mb-4">Giderler</h2>
            <div className="w-64 h-64">
              <Pie
                data={expenseChartData}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        color: '#1e494c',
                        font: { size: 12 },
                      },
                    },
                  },
                  maintainAspectRatio: true,
                  responsive: true,
                }}
              />
            </div>
          </div>

          {/* Bütçe Genel Durumu */}
          <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-lg p-4">
            <BudgetOverview
              categories={categories}
              transactions={transactions}
              budgetLimits={budgetLimits}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
