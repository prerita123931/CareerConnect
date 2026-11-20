"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return <p className="p-8">Loading Dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-blue-600 p-5 text-white">
        <h1 className="text-2xl font-bold">
          CareerConnect
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-white px-4 py-2 font-semibold text-blue-600"
        >
          Logout
        </button>
      </nav>

      {/* Dashboard Content */}
      <main className="p-8">

        <h2 className="text-3xl font-bold text-gray-800">
          Welcome, {user.name}! 👋
        </h2>

        <p className="mt-2 text-gray-600">
          Welcome to your CareerConnect Dashboard.
        </p>

        {/* Dashboard Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold text-blue-600">
              Browse Jobs
            </h3>
            <p className="mt-2 text-gray-600">
              Explore job opportunities.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold text-blue-600">
              Internships
            </h3>
            <p className="mt-2 text-gray-600">
              Find internships and gain experience.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold text-blue-600">
              My Applications
            </h3>
            <p className="mt-2 text-gray-600">
              Track your applications.
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}
