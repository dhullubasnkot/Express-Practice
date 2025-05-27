"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement)
      .value;
    const phone = parseInt(
      (document.getElementById("phone") as HTMLInputElement).value,
      10
    );
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    if (!username || !name || !email || !address || isNaN(phone) || !password) {
      setError("⚠️ Please fill out all fields correctly.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          email,
          address,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      alert("✅ Registration successful!");
      router.push("/login"); // Redirect to login page
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" required />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" required />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="number" id="phone" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
