"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;

    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const users = await res.json();

      // Check if any user matches the credentials
      const foundUser = users.find(
        (user: any) => user.username === username && user.password === password
      );

      if (foundUser) {
        alert("✅ Login successful!");
        router.push("/home"); // or use window.location.href = "/home"
      } else {
        setError("❌ Invalid username or password");
      }
    } catch (err: any) {
      setError("❌ Error logging in. Please try again later.");
      console.error(err);
    }
  };

  return (
    <>
      <h1>Login Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
        <Link href="/pages/register">Register</Link>
      </form>
    </>
  );
}
