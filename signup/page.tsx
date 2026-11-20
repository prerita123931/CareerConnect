"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("Student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          account_type: accountType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed.");
        return;
      }

      alert("Account created successfully!");
      router.push("/login");
    } catch {
      setError("Backend server is not running!");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 15px",
    border: "1px solid #dbeafe",
    borderRadius: "10px",
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    fontSize: "14px",
    marginTop: "7px",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    fontWeight: 600,
    color: "#334155",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbeafe, #f5f8ff, #e0e7ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "35px 16px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#ffffff",
          padding: "35px",
          borderRadius: "22px",
          boxShadow: "0 15px 45px rgba(37, 99, 235, 0.12)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "15px",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: "bold",
              margin: "0 auto 12px",
            }}
          >
            C
          </div>

          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#2563eb",
              margin: 0,
            }}
          >
            CareerConnect
          </h1>

          <h2
            style={{
              fontSize: "23px",
              fontWeight: 700,
              color: "#1e293b",
              marginTop: "20px",
              marginBottom: "8px",
            }}
          >
            Create Account
          </h2>

          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Join CareerConnect and start your journey!
          </p>
        </div>

        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: "17px" }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "17px" }}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "17px" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "17px" }}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label style={labelStyle}>Account Type</label>

            <div
              style={{
                display: "flex",
                gap: "28px",
                marginTop: "13px",
                color: "#334155",
                fontSize: "14px",
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="radio"
                  value="Student"
                  checked={accountType === "Student"}
                  onChange={(e) => setAccountType(e.target.value)}
                  style={{ accentColor: "#2563eb" }}
                />
                Student
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="radio"
                  value="Recruiter"
                  checked={accountType === "Recruiter"}
                  onChange={(e) => setAccountType(e.target.value)}
                  style={{ accentColor: "#2563eb" }}
                />
                Recruiter
              </label>
            </div>
          </div>

          {error && (
            <p
              style={{
                color: "#dc2626",
                background: "#fef2f2",
                padding: "10px",
                borderRadius: "8px",
                fontSize: "13px",
                marginBottom: "15px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "10px",
              background: loading
                ? "#93c5fd"
                : "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white",
              fontSize: "16px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 5px 15px rgba(37, 99, 235, 0.2)",
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "#2563eb", fontWeight: 700 }}
          >
            Login
          </Link>
        </p>

        <div style={{ textAlign: "center", marginTop: "18px" }}>
          <Link
            href="/"
            style={{ color: "#2563eb", fontSize: "14px", fontWeight: 600 }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
