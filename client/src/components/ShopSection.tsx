import { useState, useMemo } from 'react';
import { Search, Heart } from 'lucide-react';
import { Product } from '@shared/schema';
import { useCart } from '../contexts/CartContext';
import productsData from '../data/products.json';

interface ShopSectionProps {
  onProductClick: (product: Product) => void;
}

export default function ShopSection({ onProductClick }: ShopSectionProps) {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScentType, setSelectedScentType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const products = productsData as Product[];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesScentType = selectedScentType === 'all' || product.scentType === selectedScentType;
      
      return matchesSearch && matchesCategory && matchesScentType;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo purposes, sort by name as we don't have creation dates
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured first, then by rating
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedScentType, sortBy]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[1] || product.sizes[0];
    addItem(product, defaultSize.size);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-serif font-bold text-charcoal mb-4">Our Collection</h3>
          <p className="text-lg text-gray-600">Discover the perfect fragrance for every occasion</p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-grow max-w-md">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search fragrances..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['all', 'women', 'men', 'unisex'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gold text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gold hover:text-white'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
              {['oriental', 'fresh', 'floral', 'woody', 'citrus'].map(scentType => (
                <button
                  key={scentType}
                  onClick={() => setSelectedScentType(scentType)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    selectedScentType === scentType
                      ? 'bg-gold text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gold hover:text-white'
                  }`}
                >
                  {scentType.charAt(0).toUpperCase() + scentType.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="product-card bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={`${product.name} perfume bottle`}
                  className="product-image w-full h-64 object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300"></div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle wishlist
                  }}
                  className="absolute top-3 right-3 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
                <button 
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="absolute bottom-3 left-3 right-3 bg-gold text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 font-medium hover:bg-yellow-600"
                >
                  Quick Add to Cart
                </button>
              </div>
              <div className="p-4">
                <h4 className="font-serif font-semibold text-lg mb-1">{product.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                <p className="text-gray-500 text-xs mb-3 capitalize">
                  {product.scentType} • {product.category}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-semibold text-lg">${product.price}</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
