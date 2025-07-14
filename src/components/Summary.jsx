function Summary({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  
  const balance = income - expense;

  return (
    <div className="summary">
      <p><strong>Total Income:</strong> ${income.toFixed(2)}</p>
      <p><strong>Total Expenses:</strong> ${expense.toFixed(2)}</p>
      <p><strong>Net Balance:</strong> ${balance.toFixed(2)}</p>
    </div>
  );
}

export default Summary;
