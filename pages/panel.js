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
        backgroundColor: ['#F5B7B1', '#F1948A', '#EC7063', '#E74C3C'],
        hoverBackgroundColor: ['#D98880', '#CD6155', '#A93226', '#922B21'],
      },
    ],
  }), [getCategoryData]);

  const expenseChartData = useMemo(() => ({
    labels: categories,
    datasets: [
      {
        data: getCategoryData.expenseData,
        backgroundColor: ['#A52A2A', '#B03A2E', '#CB4335', '#E74C3C'],
        hoverBackgroundColor: ['#922B21', '#7B241C', '#641E16', '#512E2E'],
      },
    ],
  }), [getCategoryData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dbbcbc] to-[#a13f3f] flex justify-center items-center font-inter p-4">
      <div className="container max-w-5xl bg-white bg-opacity-70  rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-[#800020] mb-6">
          Bütçe Yönetimi Paneli
        </h1>

        {/* Gelir/Gider Formu */}
        <div className="bg-[#FDF2F2] shadow-md rounded-lg mb-6">
          <TransactionForm onAddTransaction={addTransaction} categories={categories} />
        </div>

        {/* Grafikler ve Bütçe Genel Durumu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gelir Grafiği */}
          <div className="flex flex-col items-center bg-[#FDF2F2] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-[#922B21] mb-4">Gelirler</h2>
            <div className="w-64 h-64">
              <Pie
                data={incomeChartData}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        color: '#922B21',
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
          <div className="flex flex-col items-center bg-[#FDF2F2] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold text-[#922B21] mb-4">Giderler</h2>
            <div className="w-64 h-64">
              <Pie
                data={expenseChartData}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        color: '#922B21',
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
