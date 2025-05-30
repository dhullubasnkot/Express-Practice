"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export default function ProductById() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err: unknown) {
        console.error("❌ Error fetching product:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-semibold bg-red-100 p-4 rounded-md shadow-md">
          Error: {error}
        </p>
      </div>
    );
  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading product {id}...</p>
      </div>
    );

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-3 text-center">
          {product.name}
        </h2>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-2xl font-bold text-indigo-600 mb-4 text-center">
            ${product.price}
          </p>
          <p className="text-base text-gray-700 leading-relaxed text-center">
            {product.description}
          </p>
          <Image
            src={`http://localhost:4000/uploads/${product.image}`}
            alt={product.name}
            height={200}
            width={200}
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        onClick={async () => {
          try {
            const response = await fetch(
              `http://localhost:4000/products/${id}`,
              {
                method: "DELETE",
              }
            );
            if (!response.ok) {
              throw new Error("Failed to delete product");
            }
            alert(`Product with id ${id} deleted successfully`);
            window.location.href = "/";
          } catch (err: unknown) {
            console.error("❌ Error deleting product:", err);
            if (err instanceof Error) {
              alert(err.message);
            } else {
              alert("An unknown error occurred while deleting the product");
            }
          }
        }}
      >
        Delete
      </button>
      <button
        className="mt-6 ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        onClick={() => {
          window.location.href = `/edit/${id}`;
        }}
      >
        Edit
      </button>
    </div>
  );
}
