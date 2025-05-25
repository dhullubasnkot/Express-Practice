import { useEffect, useState } from "react";

export default function ProductDetails() {
  const [products, setProducts] = useState([]); // use array for multiple products
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data); // set the full array
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setError(err.message);
      });
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!products.length) return <p>Loading...</p>; // wait until we get array

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
