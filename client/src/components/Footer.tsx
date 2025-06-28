import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h4 className="text-2xl font-serif font-bold text-charcoal mb-4">
              <span className="text-gold">E</span>ssence
            </h4>
            <p className="text-gray-600 mb-4">
              Curating the world's finest fragrances for the discerning individual.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h5 className="font-semibold text-charcoal mb-4">Shop</h5>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/shop" className="hover:text-gold transition-colors">Women's Fragrances</Link></li>
              <li><Link href="/shop" className="hover:text-gold transition-colors">Men's Fragrances</Link></li>
              <li><Link href="/shop" className="hover:text-gold transition-colors">Unisex</Link></li>
              <li><Link href="/shop" className="hover:text-gold transition-colors">Gift Sets</Link></li>
              <li><Link href="/shop" className="hover:text-gold transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="font-semibold text-charcoal mb-4">Customer Care</h5>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-semibold text-charcoal mb-4">Company</h5>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-gold transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
          <p>&copy; 2024 Essence Fragrances. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
