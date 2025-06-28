import { useState } from 'react';
import { Product } from '@shared/schema';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import ScentQuiz from '../components/ScentQuiz';
import Newsletter from '../components/Newsletter';
import ProductModal from '../components/ProductModal';

export default function Home() {
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
    <div>
      <HeroSection />
      <FeaturedProducts onProductClick={handleProductClick} />
      <ScentQuiz />
      <Newsletter />
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
