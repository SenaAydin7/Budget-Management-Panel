import React, { useState } from 'react';

export default function TransactionForm({ onAddTransaction, categories }) {
  const [transaction, setTransaction] = useState({
    type: 'Gider',
    category: '',
    description: '',
    amount: '',
    date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transaction.category || !transaction.amount || !transaction.date) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }
    onAddTransaction({ ...transaction, amount: parseFloat(transaction.amount) });
    setTransaction({ type: 'Gider', category: '', description: '', amount: '', date: '' });
  };

  return (
    <form className="bg-[#f2fdfd] p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-6 text-[#1e494c]">Gelir/Gider Ekle</h2>
      <select
        className="p-3 border border-[#1e494c] rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e494c] focus:border-transparent"
        value={transaction.type}
        onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
      >
        <option value="Gider">Gider</option>
        <option value="Gelir">Gelir</option>
      </select>
      <select
        className="p-3 border border-[#1e494c] rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e494c] focus:border-transparent"
        value={transaction.category}
        onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
      >
        <option value="">Kategori Seçin</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Açıklama"
        className="p-3 border border-[#1e494c] rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e494c] focus:border-transparent"
        value={transaction.description}
        onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Tutar"
        className="p-3 border border-[#1e494c] rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e494c] focus:border-transparent"
        value={transaction.amount}
        onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
      />
      <input
        type="date"
        className="p-3 border border-[#1e494c] rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#1e494c] focus:border-transparent"
        value={transaction.date}
        onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
      />
      <button
        type="submit"
        className="p-3 bg-[#92c3b8] text-teal-950 rounded w-full hover:bg-[#1e494c] hover:text-white transition duration-300"
      >
        Kaydet
      </button>
    </form>
  );
}
