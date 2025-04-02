"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import Dashboard from "../../components/Dashboard";

export default function Dashboards() {
  const router = useRouter();
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Check authentication on mount
  }, []);

  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      router.push("/login"); // Redirect unauthenticated users to login
    }
  }, [isCheckingAuth, authUser, router]);

  if (isCheckingAuth) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-12 w-12 border-4 border-t-transparent border-blue-500 rounded-full"
        />
      </motion.div>
    );
  }

  return authUser ? <Dashboard /> : null;
}
