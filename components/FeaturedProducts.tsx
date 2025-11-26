import { ProductCard } from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Shadow Elite Tee",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1587795624737-b01ec19e1a1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRzaGlydCUyMGZhc2hpb258ZW58MXx8fHwxNzY0MTU2NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Pure Culture Tee",
    price: "$42.00",
    image: "https://images.unsplash.com/photo-1688111421202-bda886f5e215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHRzaGlydCUyMG1vZGVsfGVufDF8fHx8MTc2NDE0MDgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Neon Dreams Tee",
    price: "$48.00",
    image: "https://images.unsplash.com/photo-1655141559812-42f8c1e8942d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwdHNoaXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2NDE3ODM0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    name: "Street Fusion Tee",
    price: "$46.00",
    image: "https://images.unsplash.com/photo-1593726856932-b5b9a661ed46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHRzaGlydCUyMHN0cmVldHxlbnwxfHx8fDE3NjQxNzgzNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 5,
    name: "Urban Essence Tee",
    price: "$44.00",
    image: "https://images.unsplash.com/photo-1760126119649-47177320763b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVuZHklMjB0c2hpcnQlMjBmYXNoaW9ufGVufDF8fHx8MTc2NDE3ODM0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 6,
    name: "Minimal Wave Tee",
    price: "$43.00",
    image: "https://images.unsplash.com/photo-1542219550-b1b13a6a29eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwdHNoaXJ0JTIwc3R5bGV8ZW58MXx8fHwxNzY0MTc4MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-20 px-4 relative">
      {/* Background accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #00FFE5 0%, transparent 70%)'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00FFE5] to-[#FF00B3] bg-clip-text text-transparent">
              Featured
            </span>
            <span className="text-white"> Collection</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our latest designs that blend premium quality with cutting-edge street style
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-16">
          <button className="group relative px-10 py-4 rounded-full border-2 border-[#00FFE5] text-[#00FFE5] font-semibold overflow-hidden transition-all duration-300 hover:text-[#1D1D2C]">
            <span className="relative z-10">View All Products</span>
            <div className="absolute inset-0 bg-[#00FFE5] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>
      </div>
    </section>
  );
}
