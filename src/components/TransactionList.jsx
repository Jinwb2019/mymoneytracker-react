function TransactionList({ transactions, onDelete, onEdit }) {
  if (transactions.length === 0) {
    return <p>No transactions yet.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Type</th>
          <th>Category</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((t) => (
            <tr key={t.id}>
              <td className={t.type === "Income" ? "income" : "expense"}>
                ${Number(t.amount).toFixed(2)}
              </td>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>{t.date}</td>
              <td>
                <button onClick={() => onEdit(t)}>Edit</button>
                <button onClick={() => onDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default TransactionList;
