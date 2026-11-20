"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #dbe4f0",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#172554",
    background: "#f8faff",
    marginTop: "9px",
    marginBottom: "22px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 16px",
        background: "linear-gradient(135deg, #dbeafe, #f5f8ff, #e0e7ff)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "#ffffff",
          padding: "42px 35px",
          borderRadius: "22px",
          boxShadow: "0 20px 60px rgba(30, 64, 175, 0.13)",
          border: "1px solid #e5edff",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "65px",
              height: "65px",
              margin: "0 auto 15px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #2563eb, #1e40af)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            C
          </div>

          <h1
            style={{
              fontSize: "29px",
              fontWeight: "800",
              color: "#1d4ed8",
              margin: "0 0 12px",
            }}
          >
            CareerConnect
          </h1>

          <h2
            style={{
              fontSize: "25px",
              fontWeight: "700",
              color: "#172554",
              margin: "0 0 9px",
            }}
          >
            Welcome Back!
          </h2>

          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Login to continue your career journey
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label style={{ fontWeight: "600", color: "#334155", fontSize: "14px" }}>
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          <label style={{ fontWeight: "600", color: "#334155", fontSize: "14px" }}>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "11px",
              background: loading
                ? "#93c5fd"
                : "linear-gradient(120deg, #2563eb, #1e40af)",
              color: "white",
              fontSize: "16px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 7px 18px rgba(37, 99, 235, 0.22)",
            }}
          >
            {loading ? "Logging in..." : "Login to Account →"}
          </button>
        </form>

        <p
          style={{
            marginTop: "27px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/signup"
            style={{ color: "#2563eb", fontWeight: "700", textDecoration: "none" }}
          >
            Sign Up
          </a>
        </p>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a
            href="/"
            style={{
              color: "#64748b",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

