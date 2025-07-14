import { useState } from "react";

const CATEGORY_OPTIONS = {
  Income: ["salary", "gift", "other"],
  Expense: ["food", "shopping", "entertainment", "restaurant", "other"],
};

// App.jsx : <TransactionForm onSave={addOrUpdateTransaction} />
function TransactionForm({ onSave }) {
  const [transaction, setTransaction] = useState({
    id: "",
    amount: "",
    type: "",// income or expense
    category: "",
    date: "",// yyyy-mm-dd
    description: "",// optional
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(transaction.amount) || transaction.amount === "") {
      alert("Amount must be a valid number");
      return;
    }
    onSave(transaction);
    setTransaction({
      id: "",
      amount: "",
      type: "",
      category: "",
      date: "",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="amount"
        type="number"
        value={transaction.amount}
        placeholder="Amount"
        onChange={handleChange}
        required
      />

      <select
        name="type"
        value={transaction.type}
        onChange={handleChange}
        required
      >
        <option value="">Select Type</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      <select
        name="category"
        value={transaction.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {(CATEGORY_OPTIONS[transaction.type] || []).map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        name="date"
        type="date"
        value={transaction.date}
        onChange={handleChange}
        required
      />

      <input
        name="description"
        type="text"
        value={transaction.description}
        placeholder="Description (optional)"
        onChange={handleChange}
      />

      <button type="submit">Save Transaction</button>
    </form>
  );
}

export default TransactionForm;
