"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
};

export default function ProductDetails() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`http://localhost:4000/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-lg text-gray-700 font-medium">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <p className="text-red-600 text-xl bg-red-100 p-6 rounded-lg shadow-md">
          Error: {error}. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-6 sm:px-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
          🌟 Explore Our Best Products
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-gray-600">
          Quality you can trust, crafted for you.
        </p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Link href="/pages/login">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-md shadow-lg hover:scale-105 hover:from-blue-700 transition duration-200">
              🔐 Login
            </button>
          </Link>
          <Link href="/components/create">
            <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-md shadow-lg hover:scale-105 hover:from-green-600 transition duration-200">
              ➕ Create Product
            </button>
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-200"
          >
            {product.image && (
              <Image
                src={`http://localhost:4000/uploads/${product.image}`}
                alt={product.name}
                height={300}
                width={400}
                className="w-full h-52 object-cover"
              />
            )}
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-indigo-600 font-semibold text-lg mb-3">
                  ${product.price}
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-snug">
                  {product.description.length > 120
                    ? product.description.substring(0, 120) + "..."
                    : product.description}
                </p>
              </div>
              <Link
                href={`/product/${product.id}`}
                className="inline-block mt-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition text-center"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {products.length === 0 && !loading && !error && (
        <div className="text-center mt-10">
          <p className="text-xl text-gray-700">No products found.</p>
        </div>
      )}
    </div>
  );
}
