'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function ServiceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
//   Icon: React.ComponentType<any>;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black/10"
    >
      <div className="flex items-start gap-4">
        <div className="rounded-2xl border border-gray-200 p-3">
          {/* <Icon className="h-6 w-6" /> */}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <Link 
            href={href}
            className="mt-3 inline-flex items-center text-sm font-medium text-gray-900"
          >
            Enter
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}