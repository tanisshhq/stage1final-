'use client';
import { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

type Transaction = {
  _id?: string;
  amount: number;
  description: string;
  date: string;
};

interface TransactionFormProps {
  onAdd: () => void;
  initialData?: Transaction | null;
  onCancelEdit?: () => void;
}

export default function TransactionForm({ onAdd, initialData, onCancelEdit }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount.toString());
      setDescription(initialData.description);
      setDate(initialData.date.slice(0, 10)); // trim to yyyy-mm-dd if needed
    }
  }, [initialData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !description || !date) return alert('All fields are required');

    const payload = {
      amount: parseFloat(amount),
      description,
      date,
    };

    const method = initialData ? 'PUT' : 'POST';
    const url = initialData ? `/api/transactions/${initialData._id}` : '/api/transactions';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Clear form
    setAmount('');
    setDescription('');
    setDate('');

    onAdd();
    if (onCancelEdit) onCancelEdit();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <Input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <div className="flex gap-2">
        <Button type="submit">{initialData ? 'Update' : 'Add'} Transaction</Button>
        {initialData && onCancelEdit && (
          <Button type="button" variant="outline" onClick={onCancelEdit}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
