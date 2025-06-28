import { useState } from 'react';
import { X, Heart } from 'lucide-react';
import { Product } from '@shared/schema';
import { useCart } from '../contexts/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  if (!isOpen || !product) return null;

  // Set default size when product changes
  if (selectedSize === '' && product.sizes.length > 0) {
    setSelectedSize(product.sizes[1]?.size || product.sizes[0].size);
  }

  const selectedPrice = product.sizes.find(size => size.size === selectedSize)?.price || product.price;

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem(product, selectedSize);
      onClose();
    }
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Images */}
          <div className="p-6">
            <div className="mb-4">
              <img 
                src={product.images[selectedImage] || product.image} 
                alt={`${product.name} detailed view`}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className={`w-full h-20 object-cover rounded cursor-pointer transition-opacity ${
                      selectedImage === index ? 'opacity-100 ring-2 ring-gold' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-serif font-bold text-charcoal mb-2">{product.name}</h2>
                <p className="text-lg text-gray-600">{product.brand}</p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-charcoal transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-serif font-bold text-gold">${selectedPrice}</span>
              <div className="flex items-center mt-2">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600 ml-2">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-charcoal mb-3">Scent Notes</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Top Notes:</span>
                  <span className="font-medium">{product.notes.top.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Middle Notes:</span>
                  <span className="font-medium">{product.notes.middle.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Notes:</span>
                  <span className="font-medium">{product.notes.base.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-charcoal mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-charcoal mb-3">Size</h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedSize === size.size
                        ? 'border-gold bg-gold text-white'
                        : 'border-gray-300 hover:border-gold'
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-charcoal hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Add to Cart
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gold transition-colors">
                <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
