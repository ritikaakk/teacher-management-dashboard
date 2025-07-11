// app/(dashboard)/home/layout.tsx
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      {/* You can add sidebar/header here if needed */}
      {children}
    </div>
  );
}
