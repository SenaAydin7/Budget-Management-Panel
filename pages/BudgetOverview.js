export default function BudgetOverview({ categories, transactions, budgetLimits }) {
    const categorySummaries = categories.map((category) => {
      const totalSpent = transactions
        .filter((t) => t.category === category && t.type === 'Gider')
        .reduce((sum, t) => sum + t.amount, 0);
      return { category, totalSpent, limit: budgetLimits[category] || 'Belirtilmedi' };
    });
  
    return (
      <div className="bg-gray-100 p-2 rounded">
        <h2 className="text-xl font-semibold mb-4 text-[#922B21]">Kategori Durumu</h2>
        <ul>
          {categorySummaries.map(({ category, totalSpent, limit }) => (
            <li key={category} className="mb-2">
              <strong>{category}:</strong> {totalSpent} ₺
              {limit !== 'Belirtilmedi' ? ` / ${limit} ₺` : ''}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  