import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Volunteer from './pages/Volunteer';
import Giver from './pages/Giver';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* main layout wrapper */}
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/donate" element={<Giver />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
