"use client";

import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyBarChart from '@/components/MonthlyBarChart';
import { useState } from 'react';

type Transaction = {
  _id: string;
  description: string;
  amount: number;
  date: string;
};

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);
  const [editData, setEditData] = useState<Transaction | null>(null);

  function handleRefresh() {
    setRefresh(!refresh);
    setEditData(null); // Clear edit form after any operation
  }

  function handleEdit(tx: Transaction) {
    setEditData(tx);
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete this transaction?');
    if (!confirmDelete) return;

    await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    handleRefresh();
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Personal Finance Visualizer</h1>

      <TransactionForm 
        onAdd={handleRefresh} 
        initialData={editData} 
        onCancelEdit={() => setEditData(null)} 
      />

      <TransactionList 
        refresh={refresh} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      <MonthlyBarChart />
    </div>
  );
}

