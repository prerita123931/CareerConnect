

"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const categories = [
    "💻 Software Development",
    "📊 Data Science",
    "🎨 UI/UX Design",
    "📱 Digital Marketing",
  ];

  const jobs = [
    {
      title: "Frontend Developer",
      company: "Tech Solutions",
      location: "Remote",
      type: "Full Time",
    },
    {
      title: "React Developer Intern",
      company: "Digital Labs",
      location: "Work From Home",
      type: "Internship",
    },
    {
      title: "UI/UX Designer",
      company: "Creative Studio",
      location: "Delhi, India",
      type: "Full Time",
    },
  ];

  const buttonStyle = {
    padding: "12px 22px",
    borderRadius: "9px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
  } as const;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f8ff",
        color: "#172554",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          padding: "20px 6%",
          background: "white",
          boxShadow: "0 3px 15px rgba(37,99,235,0.08)",
        }}
      >
        <h1 style={{ color: "#2563eb", fontSize: "26px", fontWeight: 800 }}>
          CareerConnect
        </h1>

        <div style={{ display: "flex", gap: "22px", flexWrap: "wrap" }}>
          <a href="/" style={{ color: "#2563eb" }}>Home</a>
          <a href="/jobs" style={{ color: "#334155" }}>Find Jobs</a>
          <a href="/jobs" style={{ color: "#334155" }}>Companies</a>
          <a href="#about" style={{ color: "#334155" }}>About Us</a>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => router.push("/login")}
            style={{
              ...buttonStyle,
              background: "white",
              color: "#2563eb",
              border: "1px solid #2563eb",
            }}
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            style={buttonStyle}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #1d4ed8, #4f46e5)",
          padding: "95px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800 }}>
          Find Your Dream Job Today
        </h2>

        <p
          style={{
            maxWidth: "650px",
            margin: "18px auto 32px",
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#dbeafe",
          }}
        >
          Discover thousands of job opportunities and internships.
          Build your career with CareerConnect.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            maxWidth: "850px",
            margin: "auto",
            padding: "12px",
            borderRadius: "14px",
            background: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <input
            id="job-search"
            type="text"
            placeholder="Job title or keyword"
            style={{
              flex: 1,
              minWidth: "150px",
              padding: "14px",
              border: "1px solid #dbeafe",
              borderRadius: "8px",
              color: "#1e293b",
            }}
          />

          <input
            id="job-location"
            type="text"
            placeholder="Location"
            style={{
              flex: 1,
              minWidth: "150px",
              padding: "14px",
              border: "1px solid #dbeafe",
              borderRadius: "8px",
              color: "#1e293b",
            }}
          />

          <button
            onClick={() => {
              const title = (
                document.getElementById("job-search") as HTMLInputElement
              ).value;
              const location = (
                document.getElementById("job-location") as HTMLInputElement
              ).value;

              router.push(
                `/jobs?search=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}`
              );
            }}
            style={buttonStyle}
          >
            Search Jobs
          </button>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: "70px 6%" }}>
        <h2 style={{ textAlign: "center", fontSize: "30px", fontWeight: 800 }}>
          Explore Job Categories
        </h2>

        <p style={{ textAlign: "center", color: "#64748b", margin: "12px 0 35px" }}>
          Find opportunities in your favorite field.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "22px",
            maxWidth: "1150px",
            margin: "auto",
          }}
        >
          {categories.map((category) => (
            <div
              key={category}
              style={{
                background: "white",
                padding: "30px 15px",
                borderRadius: "14px",
                textAlign: "center",
                fontWeight: 700,
                border: "1px solid #dbeafe",
                boxShadow: "0 5px 18px rgba(37,99,235,0.07)",
              }}
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section style={{ background: "white", padding: "70px 6%" }}>
        <h2 style={{ textAlign: "center", fontSize: "30px", fontWeight: 800 }}>
          Featured Jobs
        </h2>

        <p style={{ textAlign: "center", color: "#64748b", margin: "12px 0 35px" }}>
          Explore opportunities from top companies.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "22px",
            maxWidth: "1150px",
            margin: "auto",
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.title}
              style={{
                padding: "25px",
                border: "1px solid #dbeafe",
                borderRadius: "14px",
                boxShadow: "0 5px 18px rgba(37,99,235,0.07)",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>
                {job.title}
              </h3>

              <p style={{ color: "#64748b", marginBottom: "18px" }}>
                {job.company}
              </p>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "22px" }}>
                <span style={{ background: "#eff6ff", color: "#1d4ed8", padding: "7px 12px", borderRadius: "20px", fontSize: "13px" }}>
                  {job.location}
                </span>

                <span style={{ background: "#ecfdf5", color: "#047857", padding: "7px 12px", borderRadius: "20px", fontSize: "13px" }}>
                  {job.type}
                </span>
              </div>

              <button
                onClick={() => router.push("/jobs")}
                style={{ ...buttonStyle, width: "100%" }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        style={{
          padding: "55px 20px",
          textAlign: "center",
          background: "#eff6ff",
        }}
      >
        <h2 style={{ fontSize: "27px", fontWeight: 800, marginBottom: "12px" }}>
          About CareerConnect
        </h2>
        <p style={{ color: "#475569", maxWidth: "650px", margin: "auto", lineHeight: 1.7 }}>
          CareerConnect helps students discover internships and job opportunities
          while connecting recruiters with talented candidates.
        </p>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#172554",
          color: "white",
          padding: "35px 20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "23px", fontWeight: 800, marginBottom: "10px" }}>
          CareerConnect
        </h2>

        <p style={{ color: "#bfdbfe" }}>
          Connecting Talent With Opportunities.
        </p>

        <p style={{ marginTop: "18px", fontSize: "12px", color: "#94a3b8" }}>
          © 2026 CareerConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
