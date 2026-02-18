import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import '@/i18n';
import Home from '@/pages/Home';
import Calendar from '@/pages/Calendar';
import Program from '@/pages/Program';
import Contact from '@/pages/Contact';
import Appointment from '@/pages/Appointment';
import Support from '@/pages/Support';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/program" element={<Program />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/support" element={<Support />} />
        {/* Fallback routes for other pages */}
        <Route path="/departments" element={<Home />} />
        <Route path="/youth" element={<Home />} />
        <Route path="/reservation" element={<Home />} />
        <Route path="/faq" element={<Home />} />
        <Route path="/legal" element={<Home />} />
        <Route path="/privacy" element={<Home />} />
        <Route path="/charter" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
