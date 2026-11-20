"use client";
import { useState } from "react";

export default function AddJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "Full Time",
    salary: "",
    description: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        alert("Please login first");
        return;
      }

      const user = JSON.parse(savedUser);

      if (user.account_type !== "Recruiter") {
        alert("Only recruiters can add jobs");
        return;
      }

      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          recruiter_id: user.id
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to add job");
        return;
      }

      alert("Job added successfully!");

      setForm({
        title: "",
        company: "",
        location: "",
        job_type: "Full Time",
        salary: "",
        description: ""
      });

    } catch (error) {
      alert("Server connection failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-3xl font-bold text-blue-600">
          CareerConnect
        </h1>

        <h2 className="mb-6 text-2xl font-semibold">
          Post a New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-3"
          />

          <input
            name="location"
            placeholder="Job Location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <select
            name="job_type"
            value={form.job_type}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Work From Home</option>
          </select>

          <input
            name="salary"
            placeholder="Salary / Stipend"
            value={form.salary}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-lg border p-3"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Post Job
          </button>

        </form>
      </div>
    </div>
  );
}

