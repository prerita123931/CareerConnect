
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    resume: "",
    coverLetter: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Frontend demo only: database submission is not connected yet.
    alert(`Application form completed for Job ID: ${jobId}`);

    setLoading(false);
    router.push("/jobs");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 15px",
    border: "1px solid #dbeafe",
    borderRadius: "10px",
    background: "#f8fafc",
    color: "#1e293b",
    fontSize: "14px",
    marginTop: "8px",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    fontWeight: 600,
    color: "#334155",
  };

  const sectionHeading: React.CSSProperties = {
    fontSize: "19px",
    fontWeight: 800,
    color: "#172554",
    marginBottom: "7px",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbeafe, #f8fafc, #e0e7ff)",
        padding: "45px 16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "auto",
          background: "white",
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow: "0 15px 45px rgba(37,99,235,0.12)",
          border: "1px solid #dbeafe",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1d4ed8, #4f46e5)",
            padding: "35px",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "35px",
            }}
          >
            <h1 style={{ fontSize: "25px", fontWeight: 800 }}>
              CareerConnect<span style={{ color: "#bfdbfe" }}>.</span>
            </h1>

            <span
              style={{
                background: "rgba(255,255,255,0.15)",
                padding: "9px 15px",
                borderRadius: "30px",
                fontSize: "13px",
              }}
            >
              Job Application
            </span>
          </div>

          <p style={{ color: "#bfdbfe", fontSize: "13px", fontWeight: 700 }}>
            TAKE THE NEXT STEP
          </p>

          <h2
            style={{
              fontSize: "clamp(27px, 5vw, 36px)",
              fontWeight: 800,
              marginTop: "10px",
            }}
          >
            Apply for Your Dream Job
          </h2>

          <p style={{ color: "#dbeafe", marginTop: "12px", lineHeight: 1.6 }}>
            Share your details and let your skills speak for themselves.
          </p>

          <p style={{ color: "#bfdbfe", marginTop: "15px", fontSize: "13px" }}>
            Application for Job ID: {jobId}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ padding: "35px", display: "flex", flexDirection: "column", gap: "28px" }}
        >
          {/* Personal Information */}
          <section>
            <h3 style={sectionHeading}>Personal Information</h3>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "22px" }}>
              Tell us a little about yourself.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  required
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>
          </section>

          <div style={{ borderTop: "1px solid #e2e8f0" }} />

          {/* Professional Details */}
          <section>
            <h3 style={sectionHeading}>Professional Details</h3>
            <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "22px" }}>
              Highlight your skills and experience.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <div>
                <label style={labelStyle}>Your Skills *</label>
                <textarea
                  required
                  name="skills"
                  rows={3}
                  placeholder="Example: HTML, CSS, JavaScript, React, Node.js..."
                  value={form.skills}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <div>
                <label style={labelStyle}>Resume Link *</label>
                <input
                  required
                  type="url"
                  name="resume"
                  placeholder="Paste your Google Drive resume link"
                  value={form.resume}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <p style={{ color: "#64748b", fontSize: "12px", marginTop: "8px" }}>
                  Make sure your resume link has permission to be viewed.
                </p>
              </div>

              <div>
                <label style={labelStyle}>Cover Letter</label>
                <textarea
                  name="coverLetter"
                  rows={4}
                  placeholder="Tell the recruiter why you are a good fit for this role..."
                  value={form.coverLetter}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
            </div>
          </section>

          {/* Reminder */}
          <div
            style={{
              background: "#eff6ff",
              color: "#1e40af",
              padding: "16px",
              borderRadius: "11px",
              fontSize: "13px",
              lineHeight: 1.6,
            }}
          >
            <strong>Before submitting:</strong> Please check that your contact
            details and resume link are correct.
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "13px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                flex: 1,
                minWidth: "130px",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                background: "white",
                color: "#475569",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                minWidth: "180px",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                background: loading ? "#93c5fd" : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                color: "white",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 5px 15px rgba(37,99,235,0.2)",
              }}
            >
              {loading ? "Submitting..." : "Submit Application →"}
            </button>
          </div>

          <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8" }}>
            © 2026 CareerConnect. All rights reserved.
          </p>
        </form>
      </div>
    </main>
  );
}
