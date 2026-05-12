
export interface Transaction {
  id: string;
  leadId: string;
  leadName: string;
  amount: number;
  type: 'payment' | 'refund';
  paymentMethod: string;
  category: 'tuition' | 'service_fee' | 'visa_fee' | 'other';
  notes?: string;
  date: string;
  createdAt: string;
}

const STORAGE_KEY = 'dream_migrator_transactions';

function getTransactionsFromStorage(): Transaction[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveTransactionsToStorage(transactions: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export async function getTransactions(): Promise<Transaction[]> {
  return getTransactionsFromStorage().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getTransactionsByLead(leadId: string): Promise<Transaction[]> {
  return getTransactionsFromStorage().filter(t => t.leadId === leadId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>) {
  try {
    const transactions = getTransactionsFromStorage();
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    transactions.push(newTransaction);
    saveTransactionsToStorage(transactions);
    return { success: true, id: newTransaction.id };
  } catch (error) {
    console.error("Error saving transaction:", error);
    return { success: false, error };
  }
}

export async function deleteTransaction(id: string) {
    try {
        const transactions = getTransactionsFromStorage();
        const filtered = transactions.filter(t => t.id !== id);
        saveTransactionsToStorage(filtered);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}
