import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Loan from './pages/Loan';
import Recovery from './pages/Recovery';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/crédit" element={<Loan />} />
        <Route path="/services/recouvrement" element={<Recovery />} />
        <Route path="/services/formations" element={<Courses />} />
        <Route path="/services/formations/:id" element={<CourseDetails />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <AnimatedRoutes />
        </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;
