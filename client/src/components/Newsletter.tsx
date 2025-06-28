import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate newsletter signup
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-charcoal text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-4xl font-serif font-bold mb-4">Stay In Touch</h3>
        <p className="text-lg mb-8 text-gray-300">
          Be the first to discover new arrivals and exclusive offers
        </p>
        
        {isSubscribed ? (
          <div className="bg-gold/20 border border-gold text-gold px-6 py-4 rounded-lg max-w-md mx-auto">
            Thank you for subscribing! Check your email for exclusive offers.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-4 py-3 text-charcoal rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button 
                type="submit"
                className="bg-gold hover:bg-yellow-600 px-6 py-3 rounded-r-lg transition-colors font-medium"
              >
                Subscribe
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
