import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';

// GET all transactions
export async function GET() {
  await connectToDatabase();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

// CREATE a new transaction
export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const newTransaction = await Transaction.create(data);
  return NextResponse.json(newTransaction);
}
