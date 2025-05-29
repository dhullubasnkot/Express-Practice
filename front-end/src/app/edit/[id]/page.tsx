"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
export default function EditProductPage() {
  const params = useParams();
  const idParam = params?.id;
  const id = Number(idParam);

  // State to hold fetched product data
  const [product, setProduct] = useState<{
    name?: string;
    price?: number;
    stock_quantity?: number;
    description?: string;
    image?: string;
  }>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:4000/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct({
          name: data.name,
          price: data.price,
          stock_quantity: data.stock_quantity,
          description: data.description,
          image: data.image, // assuming image is the filename or URL stored on server
        });
      } catch (err: any) {
        setError(err.message || "Error fetching product");
      } finally {
        setLoading(false);
      }
    }

    if (!isNaN(id)) {
      fetchProduct();
    } else {
      setError("Invalid product ID");
      setLoading(false);
    }
  }, [id]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement)?.value;
    const price = parseFloat(
      (document.getElementById("price") as HTMLInputElement)?.value
    );
    const description = (
      document.getElementById("description") as HTMLTextAreaElement
    )?.value;
    const stock_quantity = parseInt(
      (document.getElementById("stock_quantity") as HTMLInputElement)?.value,
      10
    );

    if (!name || isNaN(price) || !description || isNaN(stock_quantity)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price.toString());
      formData.append("description", description);
      formData.append("stock_quantity", stock_quantity.toString());

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: "PUT",
        body: formData, // send as multipart/form-data
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update product");
      }

      const data = await response.json();
      alert(`✅ Product updated successfully: ${data.name}`);
      window.location.href = `/products/${id}`;
    } catch (error: any) {
      console.error("❌ Error updating product:", error);
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading product data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-semibold bg-red-100 p-4 rounded-md shadow-md">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-200">
        <h1 className="text-2xl font-bold mb-6">Edit Product {id}</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={product.name}
              placeholder={product.name || "Enter product name"}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={product.price}
              placeholder={product.price?.toString() || "Enter product price"}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              step="0.01"
            />
          </div>

          <div>
            <label
              htmlFor="stock_quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock_quantity"
              name="stock_quantity"
              defaultValue={product.stock_quantity}
              placeholder={
                product.stock_quantity?.toString() || "Enter stock quantity"
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={product.description}
              placeholder={product.description || "Enter product description"}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Image
            </label>

            {product.image && (
              <Image
                src={`http://localhost:4000/uploads/${product.image}`}
                height={200}
                width={200}
                alt="Current product"
                className="mb-2 w-48 h-auto rounded-md border"
              />
            )}

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="block"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
