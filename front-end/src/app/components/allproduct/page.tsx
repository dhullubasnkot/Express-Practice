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
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched products:", data); // DEBUG
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg text-gray-700">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-xl bg-red-100 p-6 rounded-lg shadow-md">
          Error: {error}. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight sm:text-5xl">
          Discover Our Amazing Products
        </h1>
        <p className="mt-3 text-xl text-gray-600">
          Handpicked for your ultimate satisfaction.
        </p>
      </header>
{/* links */}
      <div className="flex justify-center space-x-4 mb-6">
        <Link href="/pages/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
            Go to Login Page
          </button>
        </Link>
        <Link href="/components/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
            Create Product
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id || Math.random()}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden border border-gray-200"
          >
            {product.image && (
              <div className="overflow-hidden h-64 bg-gray-100">
                <Image
                  src={`http://localhost:4000/uploads/${product.image}`}
                  alt={product.name}
                  width={500}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 rounded-t-xl"
                />
              </div>
            )}

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h2>
              <p className="text-indigo-600 text-xl font-semibold mb-4">
                ${product.price}
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-5">
                {product.description.length > 100
                  ? product.description.substring(0, 100) + "..."
                  : product.description}
              </p>

              {product.id && (
                <Link
                  href={`/product/${product.id}`}
                  className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  View Details
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !loading && !error && (
        <div className="text-center mt-10">
          <p className="text-xl text-gray-700">No products found.</p>
        </div>
      )}
    </div>
  );
}
