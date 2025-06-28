import { Heart } from 'lucide-react';
import { Product } from '@shared/schema';
import { useCart } from '../contexts/CartContext';
import productsData from '../data/products.json';

interface FeaturedProductsProps {
  onProductClick: (product: Product) => void;
}

export default function FeaturedProducts({ onProductClick }: FeaturedProductsProps) {
  const { addItem } = useCart();
  const featuredProducts = productsData.filter(product => product.featured).slice(0, 3) as Product[];

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[1] || product.sizes[0]; // Default to 100ml or first available
    addItem(product, defaultSize.size);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-serif font-bold text-charcoal mb-4">Featured Fragrances</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-selected perfumes that capture the essence of luxury and sophistication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div 
              key={product.id}
              className="group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative overflow-hidden bg-gray-100 rounded-lg mb-4">
                <img 
                  src={product.image} 
                  alt={`${product.name} perfume bottle`}
                  className="w-full h-80 object-cover product-image transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle wishlist functionality
                  }}
                  className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
                <button 
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="absolute bottom-4 left-4 right-4 bg-gold text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 font-medium hover:bg-yellow-600"
                >
                  Quick Add to Cart
                </button>
              </div>
              <h4 className="text-xl font-serif font-semibold mb-2">{product.name}</h4>
              <p className="text-gray-600 mb-2">{product.description.slice(0, 50)}...</p>
              <p className="text-gold font-semibold text-lg">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
