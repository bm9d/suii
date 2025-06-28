import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartOverlay({ isOpen, onClose }: CartOverlayProps) {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-xl font-serif font-semibold">Shopping Cart</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-charcoal transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button 
                  onClick={onClose}
                  className="text-gold hover:text-yellow-600 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => {
                  const sizePrice = item.product.sizes.find(size => size.size === item.selectedSize)?.price || item.product.price;
                  
                  return (
                    <div key={`${item.productId}-${item.selectedSize}`} className="flex items-center space-x-4 pb-6 border-b">
                      <img 
                        src={item.product.image} 
                        alt={`${item.product.name} in cart`}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h4 className="font-medium text-charcoal">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">{item.selectedSize}</p>
                        <p className="text-sm text-gray-600">${sizePrice}</p>
                        <div className="flex items-center mt-2">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.selectedSize, item.quantity - 1)}
                            className="text-gray-400 hover:text-charcoal"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-3 font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                            className="text-gray-400 hover:text-charcoal"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.productId, item.selectedSize)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-serif font-bold text-gold">${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-charcoal hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors mb-3">
                Proceed to Checkout
              </button>
              <button 
                onClick={onClose}
                className="w-full text-charcoal hover:text-gold transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
