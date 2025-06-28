import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onCartToggle: () => void;
  onSearchToggle: () => void;
}

export default function Header({ onCartToggle, onSearchToggle }: HeaderProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/' && location === '/') return true;
    if (href !== '/' && location.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl font-serif font-bold text-charcoal">
              <span className="text-gold">E</span>ssence
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-gold'
                    : 'text-charcoal hover:text-gold'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onSearchToggle}
              className="hidden md:block text-charcoal hover:text-gold transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <button 
              onClick={onCartToggle}
              className="text-charcoal hover:text-gold transition-colors relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-charcoal hover:text-gold transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-gold'
                      : 'text-charcoal hover:text-gold'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={() => {
                  onSearchToggle();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-charcoal hover:text-gold transition-colors text-left"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
