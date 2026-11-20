"use client";
import "./jobs.css";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  job_type: string;
  salary: string;
  description: string;
}

export default function BrowseJobs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => {
        if (!res.ok) throw new Error("Unable to fetch jobs");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setJobs(data.jobs);
        } else {
          setError("Unable to load jobs. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Jobs Error:", error);
        setError("Unable to connect to the server. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location} ${job.job_type}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eff6ff, #f8fafc, #e0e7ff)",
      fontFamily: "Arial, sans-serif",
      color: "#172554",
    } as React.CSSProperties,
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 6%",
      background: "white",
      boxShadow: "0 3px 15px rgba(37,99,235,0.08)",
    } as React.CSSProperties,
    heading: {
      fontSize: "36px",
      fontWeight: 800,
      color: "#172554",
      margin: "10px 0",
    } as React.CSSProperties,
    card: {
      background: "white",
      padding: "25px",
      borderRadius: "16px",
      border: "1px solid #dbeafe",
      boxShadow: "0 8px 25px rgba(37,99,235,0.08)",
    } as React.CSSProperties,
    button: {
      width: "100%",
      padding: "13px",
      border: "none",
      borderRadius: "9px",
      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
      color: "white",
      fontWeight: 700,
      fontSize: "15px",
      cursor: "pointer",
    } as React.CSSProperties,
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={{ fontSize: "25px", fontWeight: 800, color: "#2563eb" }}>
          CareerConnect
        </h1>

        <button
          onClick={() => router.push("/dashboard")}
          style={{
            background: "#eff6ff",
            color: "#2563eb",
            border: "1px solid #bfdbfe",
            padding: "10px 18px",
            borderRadius: "9px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ← Dashboard
        </button>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "auto", padding: "55px 25px" }}>
        <div style={{ marginBottom: "30px" }}>
          <p style={{ color: "#2563eb", fontWeight: 700, fontSize: "13px", letterSpacing: "2px" }}>
            EXPLORE OPPORTUNITIES
          </p>

          <h2 style={styles.heading}>
            Find Your Dream Job 💼
          </h2>

          <p style={{ color: "#64748b", fontSize: "16px", lineHeight: 1.6 }}>
            Discover jobs and internships that match your skills and career goals.
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search by job title, company, location or job type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "17px 20px",
            border: "1px solid #bfdbfe",
            borderRadius: "12px",
            background: "white",
            color: "#1e293b",
            fontSize: "15px",
            boxShadow: "0 5px 18px rgba(37,99,235,0.06)",
            outline: "none",
          }}
        />

        {/* Available Opportunities */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            margin: "40px 0 25px",
          }}
        >
          <h3 style={{ fontSize: "23px", fontWeight: 800 }}>
            Available Opportunities
          </h3>

          <span
            style={{
              background: "#dbeafe",
              color: "#1d4ed8",
              padding: "9px 16px",
              borderRadius: "30px",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            {filteredJobs.length} {filteredJobs.length === 1 ? "Opportunity" : "Opportunities"}
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ ...styles.card, textAlign: "center", padding: "45px" }}>
            <p style={{ fontWeight: 700 }}>Loading opportunities...</p>
            <p style={{ color: "#64748b", marginTop: "10px" }}>
              Please wait while we fetch the latest jobs.
            </p>
          </div>
        ) : error ? (
          <div style={{ ...styles.card, textAlign: "center", padding: "40px" }}>
            <p style={{ color: "#dc2626", fontWeight: 700 }}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={{ ...styles.button, maxWidth: "180px", marginTop: "20px" }}
            >
              Try Again
            </button>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div style={{ ...styles.card, textAlign: "center", padding: "45px 20px" }}>
            <div style={{ fontSize: "42px", marginBottom: "12px" }}>🔎</div>
            <h3 style={{ fontSize: "21px", fontWeight: 800 }}>
              {search ? "No Matching Opportunities Found" : "No Jobs Available Yet!"}
            </h3>
            <p style={{ color: "#64748b", marginTop: "10px" }}>
              {search
                ? "Try searching with a different job title, company or location."
                : "Please check back later for new opportunities."}
            </p>

            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  marginTop: "18px",
                  color: "#2563eb",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                }}
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
              gap: "23px",
            }}
          >
            {filteredJobs.map((job) => (
              <div key={job.id} style={styles.card}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "9px" }}>
                      {job.title}
                    </h3>
                    <p style={{ color: "#64748b", fontWeight: 600 }}>
                      {job.company}
                    </p>
                  </div>

                  <span
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      padding: "7px 10px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      height: "fit-content",
                    }}
                  >
                    #{job.id}
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "9px", margin: "20px 0" }}>
                  <span style={{ background: "#eff6ff", color: "#1d4ed8", padding: "8px 11px", borderRadius: "20px", fontSize: "12px" }}>
                    📍 {job.location || "Location not specified"}
                  </span>

                  <span style={{ background: "#ecfdf5", color: "#047857", padding: "8px 11px", borderRadius: "20px", fontSize: "12px" }}>
                    💼 {job.job_type || "Job"}
                  </span>
                </div>

                <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "14px", minHeight: "50px" }}>
                  {job.description || "Explore this exciting career opportunity."}
                </p>

                <p style={{ color: "#2563eb", fontWeight: 700, margin: "18px 0" }}>
                  💰 {job.salary || "Salary not disclosed"}
                </p>

                <button
                  onClick={() => router.push(`/apply/${job.id}`)}
                  style={styles.button}
                >
                  Apply Now →
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

