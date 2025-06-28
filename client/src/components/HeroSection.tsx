import { Link } from 'wouter';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
        alt="Luxury perfume bottles on elegant surface" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
        <h2 className="text-6xl md:text-8xl font-serif font-bold mb-6 animate-fade-in">
          Discover Your
          <span className="text-gold font-script block text-5xl md:text-7xl mt-2">Signature Scent</span>
        </h2>
        <p className="text-xl md:text-2xl mb-8 font-light animate-slide-up">
          Curated collection of premium fragrances from the world's finest perfumers
        </p>
        <Link 
          href="/shop"
          className="inline-block bg-gold hover:bg-yellow-600 text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:shadow-lg animate-slide-up"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}
