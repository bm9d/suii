import { useState } from 'react';
import { Product } from '@shared/schema';
import ShopSection from '../components/ShopSection';
import ProductModal from '../components/ProductModal';

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="pt-16">
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif font-bold text-charcoal mb-6">Our Collection</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover premium fragrances from the world's most prestigious perfume houses. 
            Each scent is carefully selected for its exceptional quality and unique character.
          </p>
        </div>
      </div>
      
      <ShopSection onProductClick={handleProductClick} />
      
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
