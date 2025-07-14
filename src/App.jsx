import { useEffect, useState } from "react";
import Header from "./components/Header";
import Summary from "./components/Summary";
import TransactionForm from "./components/TransactionForm";
import Filter from "./components/Filter";
import TransactionList from "./components/TransactionList";

const STORAGE_KEY = "MoneyTrackData";

function App() {
  const [transactions, setTransactions] = useState([]);
  
  // for filter function, prevent changing original data
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTransactions(JSON.parse(saved));
      setFilteredTransactions(JSON.parse(saved));
    }
  }, []);// [] : only once

  // save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    setFilteredTransactions(transactions);
  }, [transactions]);

  const addOrUpdateTransaction = (transaction) => {
    if (transaction.id) {
      // edit
      setTransactions((prev) =>
        prev.map((t) => (t.id === transaction.id ? transaction : t))// traverse to find
      );
    } else {
      // add
      transaction.id = Date.now().toString();
      setTransactions((prev) => [...prev, transaction]);
    }
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // edit : update transaction (not just one property of target transaction)
  const editTransaction = (transaction) => {
    return transaction;
  };

  const filterByDate = (date) => {
    if (!date) {
      setFilteredTransactions(transactions);
      return;
    }
    const filtered = transactions.filter((t) => t.date === date);
    setFilteredTransactions(filtered);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Header />
      <Summary transactions={filteredTransactions} />
      <TransactionForm onSave={addOrUpdateTransaction} />
      <Filter onFilter={filterByDate} />
      <TransactionList
        transactions={filteredTransactions}
        onDelete={deleteTransaction}
        onEdit={addOrUpdateTransaction}
      />
    </div>
  );
}

export default App
