import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartItemWithProduct, Product } from '@shared/schema';
import productsData from '../data/products.json';

interface CartContextType {
  items: CartItemWithProduct[];
  addItem: (product: Product, selectedSize: string, quantity?: number) => void;
  removeItem: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('essence-cart');
    if (savedCart) {
      try {
        const cartItems: CartItem[] = JSON.parse(savedCart);
        const itemsWithProducts = cartItems
          .map(item => {
            const product = productsData.find(p => p.id === item.productId) as Product;
            return product ? { ...item, product } : null;
          })
          .filter(Boolean) as CartItemWithProduct[];
        setItems(itemsWithProducts);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    const cartItems: CartItem[] = items.map(({ product, ...item }) => item);
    localStorage.setItem('essence-cart', JSON.stringify(cartItems));
  }, [items]);

  const addItem = (product: Product, selectedSize: string, quantity = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, {
        productId: product.id,
        quantity,
        selectedSize,
        product
      }];
    });
  };

  const removeItem = (productId: string, selectedSize: string) => {
    setItems(prev => prev.filter(
      item => !(item.productId === productId && item.selectedSize === selectedSize)
    ));
  };

  const updateQuantity = (productId: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, selectedSize);
      return;
    }

    setItems(prev => 
      prev.map(item => 
        item.productId === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => {
    const sizePrice = item.product.sizes.find(size => size.size === item.selectedSize)?.price || item.product.price;
    return sum + (sizePrice * item.quantity);
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
