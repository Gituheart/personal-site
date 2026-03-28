"use client";

import { useEffect, useState } from "react";

export default function TotalViews() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views/total")
      .then((r) => r.json())
      .then((d) => setViews(d.views));
  }, []);

  if (views === null) return null;

  return (
    <span
      className="text-xs tracking-widest text-[#F0F0F0]/30"
      style={{ fontFamily: "var(--font-bangers)" }}
    >
      {views.toLocaleString()} TOTAL VIEWS
    </span>
  );
}
