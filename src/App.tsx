import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';
import { useThemeStore } from './stores/themeStore';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CartSidebar from './components/Cart/CartSidebar';
import WishlistSidebar from './components/Wishlist/WishlistSidebar';
import ProfileSettings from './components/Profile/ProfileSettings';
import Home from './pages/Home';
import Artworks from './pages/Artworks';
import ArtworkDetail from './pages/ArtworkDetail';
import Artists from './pages/Artists';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const { i18n } = useTranslation();
  const { isDark } = useThemeStore();
  
  // Apply theme class to document
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Apply RTL direction for Arabic
  React.useEffect(() => {
    const isRTL = i18n.language === 'ar';
    document.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${isDark ? 'dark' : ''}`}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artworks" element={<Artworks />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileSettings />} />
          </Routes>
        </main>
        <Footer />
        <CartSidebar />
        <WishlistSidebar />
      </div>
    </Router>
  );
}

export default App;