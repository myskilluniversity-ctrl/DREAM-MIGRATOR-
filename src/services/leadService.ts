
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'assessment' | 'download' | 'contact' | 'simulation_confirm';
  status: 'new' | 'contacted' | 'qualified' | 'disqualified' | 'enrolled';
  notes?: string;
  assignedTo?: string;
  budget?: number;
  amountPaid?: number;
  paymentStatus?: 'pending' | 'partially_paid' | 'fully_paid' | 'refunded';
  details?: any;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'dream_migrator_leads';

function getLeadsFromStorage(): Lead[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveLeadsToStorage(leads: Lead[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export async function getLeads(): Promise<Lead[]> {
    return getLeadsFromStorage().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function saveLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: Lead['status'] }) {
  try {
    const leads = getLeadsFromStorage();
    const newLead: Lead = {
      ...lead,
      id: crypto.randomUUID(),
      status: lead.status || 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    leads.push(newLead);
    saveLeadsToStorage(leads);
    return { success: true, id: newLead.id };
  } catch (error) {
    console.error("Error saving lead to storage:", error);
    return { success: false, error };
  }
}

export async function updateLead(leadId: string, updates: Partial<Lead>) {
  try {
    const leads = getLeadsFromStorage();
    const index = leads.findIndex(l => l.id === leadId);
    if (index === -1) return { success: false, error: 'Lead not found' };

    leads[index] = {
      ...leads[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveLeadsToStorage(leads);
    return { success: true };
  } catch (error) {
    console.error("Error updating lead in storage:", error);
    return { success: false, error };
  }
}
