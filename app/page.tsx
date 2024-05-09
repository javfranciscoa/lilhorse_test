"use client";
import Dashboard from "@/components/todolist/page";
import ProtectedRoute from "@/components/ProtectedRouting";

export default function Home() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
