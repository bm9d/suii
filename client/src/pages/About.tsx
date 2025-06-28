export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif font-bold text-charcoal mb-6">Our Story</h1>
          <p className="text-xl text-gray-600">
            Curating the world's finest fragrances for the discerning individual
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
              alt="Luxury perfume collection display"
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
            
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">The Art of Fragrance</h2>
            <p className="text-gray-600 mb-6">
              Since our founding, Essence has been dedicated to bringing you the most exquisite fragrances 
              from renowned perfumers around the world. We believe that fragrance is more than just a scent—it's 
              an expression of personality, a memory, and an art form.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-4">Our Mission</h3>
            <p className="text-gray-600 mb-6">
              To make luxury fragrances accessible to everyone who appreciates the finer things in life. 
              We carefully curate our collection to include only the most exceptional scents, each with 
              its own unique story and character.
            </p>

            <h3 className="text-2xl font-serif font-semibold text-charcoal mb-4">Quality Promise</h3>
            <p className="text-gray-600 mb-6">
              Every fragrance in our collection is authentic and sourced directly from authorized distributors. 
              We believe in transparency and quality, ensuring that every bottle you receive meets our 
              exacting standards.
            </p>

            <div className="bg-gold/10 p-6 rounded-lg">
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">Our Values</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Authenticity in every product</li>
                <li>• Exceptional customer service</li>
                <li>• Sustainable packaging practices</li>
                <li>• Supporting artisan perfumers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
