import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Map, Hotel, Calendar, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { useWallet } from '../../contexts/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isConnected, connectWallet, walletAddress } = useWallet();
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navClass = isHomePage && !isScrolled && !isMobileMenuOpen
    ? 'bg-transparent text-white'
    : 'bg-white/80 backdrop-blur-md text-gray-800 shadow-sm';

  const navItems = [
    { name: 'Plan Trip', path: '/planner', icon: <Plane className="w-4 h-4" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <Map className="w-4 h-4" /> },
    { name: 'Hotels', path: '/hotels', icon: <Hotel className="w-4 h-4" /> },
    { name: 'Events', path: '/events', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <Logo className={isHomePage && !isScrolled && !isMobileMenuOpen ? 'text-white' : 'text-primary-600'} />
            <span className="font-bold text-xl">Driftly</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 hover:text-primary-500 transition-colors ${
                  location.pathname === item.path ? 'font-medium' : ''
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full">
                <span className="font-medium">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            ) : (
              <Button 
                onClick={connectWallet}
                variant={isHomePage && !isScrolled ? "outline" : "primary"}
                size="sm"
              >
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className="flex items-center gap-2 py-2 text-gray-800 hover:text-primary-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
                
                {isConnected ? (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full">
                    <span className="font-medium">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                ) : (
                  <Button 
                    onClick={() => {
                      connectWallet();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="primary"
                    size="sm"
                    className="w-full"
                  >
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};