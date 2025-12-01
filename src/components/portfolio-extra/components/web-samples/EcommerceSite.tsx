import { ShoppingBag, Heart, Star } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const products = [
  { id: 1, name: 'Minimal Tech Tee', price: 89, rating: 4.8, image: 'https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?w=400' },
  { id: 2, name: 'Urban Hoodie', price: 129, rating: 4.9, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400' },
  { id: 3, name: 'Streetwear Jacket', price: 189, rating: 4.7, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
  { id: 4, name: 'Premium Crewneck', price: 99, rating: 4.6, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400' },
  { id: 5, name: 'Tech Cargo Pants', price: 149, rating: 4.8, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400' },
  { id: 6, name: 'Oversized Shirt', price: 79, rating: 4.5, image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400' },
];

export function EcommerceSite() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative bg-black text-white rounded-xl overflow-hidden h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY0NTI5MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex items-center px-12">
          <div className="max-w-xl">
            <div className="text-zinc-300 mb-2">Spring Collection 2025</div>
            <h3 className="text-white mb-4">
              Modern Streetwear<br />Meets Technology
            </h3>
            <p className="text-zinc-300 mb-6">
              Discover our latest collection of tech-inspired apparel designed for the modern creative.
            </p>
            <button className="px-8 py-3 bg-white text-black rounded-lg hover:bg-zinc-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-black">Featured Products</h4>
          <div className="flex items-center gap-2">
            <select className="px-4 py-2 border border-zinc-300 rounded-lg">
              <option>All Products</option>
              <option>Tops</option>
              <option>Bottoms</option>
              <option>Outerwear</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Cart Preview */}
      <div className="bg-zinc-50 rounded-xl p-8">
        <h5 className="text-black mb-6">Shopping Cart</h5>
        
        <div className="space-y-4 mb-6">
          {products.slice(0, 2).map((product) => (
            <div key={product.id} className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="text-black mb-1">{product.name}</div>
                <div className="text-zinc-500">Quantity: 1</div>
              </div>
              <div className="text-black">${product.price}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-200 pt-4 space-y-2 mb-6">
          <div className="flex items-center justify-between text-zinc-600">
            <span>Subtotal</span>
            <span>$218</span>
          </div>
          <div className="flex items-center justify-between text-zinc-600">
            <span>Shipping</span>
            <span>$10</span>
          </div>
          <div className="flex items-center justify-between text-black pt-2 border-t border-zinc-200">
            <span>Total</span>
            <span>$228</span>
          </div>
        </div>

        <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart size={18} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} fill="currentColor" className="text-yellow-500" />
          <span className="text-zinc-600">{product.rating}</span>
        </div>
        <h5 className="text-black mb-2">{product.name}</h5>
        <div className="flex items-center justify-between">
          <span className="text-black">${product.price}</span>
          <button className="p-2 bg-black text-white rounded-lg hover:bg-zinc-800">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
