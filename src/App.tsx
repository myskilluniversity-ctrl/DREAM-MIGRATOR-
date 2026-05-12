/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Contact from './pages/Contact';
import CountryDetail from './pages/CountryDetail';
import ComparisonTool from './pages/ComparisonTool';
import Healthcare from './pages/Healthcare';
import OpportunityCard from './pages/OpportunityCard';
import Ausbildung from './pages/Ausbildung';
import Resources from './pages/Resources';
import Team from './pages/Team';
import Director from './pages/Director';
import CEO from './pages/CEO';
import COO from './pages/COO';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CostCalculator from './pages/CostCalculator';
import SOPReviewer from './pages/SOPReviewer';
import UniversityFinder from './pages/UniversityFinder';
import VisaPredictor from './pages/VisaPredictor';
import ScholarshipFinder from './pages/ScholarshipFinder';
import AICounselor from './pages/AICounselor';
import AdminPanel from './pages/AdminPanel';
import AdminLayout from './layouts/AdminLayout';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from './context/AuthContext';
import { Settings } from 'lucide-react';
import AIAssistant from './components/AIAssistant';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen relative">
          <Navbar />
          
          <main>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/countries/:id" element={<CountryDetail />} />
                <Route path="/compare" element={<ComparisonTool />} />
                <Route path="/healthcare" element={<Healthcare />} />
                <Route path="/opportunity-card" element={<OpportunityCard />} />
                <Route path="/ausbildung" element={<Ausbildung />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/team" element={<Team />} />
                <Route path="/director" element={<Director />} />
                <Route path="/ceo" element={<CEO />} />
                <Route path="/coo" element={<COO />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cost-calculator" element={<CostCalculator />} />
                <Route path="/sop-analyzer" element={<SOPReviewer />} />
                <Route path="/university-finder" element={<UniversityFinder />} />
                <Route path="/visa-timeline" element={<VisaPredictor />} />
                <Route path="/scholarships" element={<ScholarshipFinder />} />
                <Route path="/ai-counselor" element={<AICounselor />} />
                
                {/* Dedicated Admin Portal Routes */}
                <Route path="/admin" element={<AdminLayout><AdminPanel initialTab="leads" /></AdminLayout>} />
                <Route path="/admin/finances" element={<AdminLayout><AdminPanel initialTab="finances" /></AdminLayout>} />
                <Route path="/admin/analytics" element={<AdminLayout><AdminPanel initialTab="analytics" /></AdminLayout>} />
                <Route path="/admin/settings" element={<AdminLayout>
                  <div className="p-12 surface bg-white text-center">
                    <Settings className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                    <h3 className="text-2xl font-display font-black text-slate-900 mb-2">Platform Configuration</h3>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto mb-8">System parameters and security protocols are currently hardcoded for stability. Dynamic configuration will be available in v2.4.</p>
                  </div>
                </AdminLayout>} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
          <AIAssistant />
        </div>
      </AuthProvider>
    </Router>
  );
}
