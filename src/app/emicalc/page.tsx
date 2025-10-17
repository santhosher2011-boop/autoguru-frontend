"use client";
import { useState } from "react";

export default function EMICalc() {
  const [price, setPrice] = useState(1200000);
  const [down, setDown] = useState(200000);
  const [tenure, setTenure] = useState(60);
  const [roi, setRoi] = useState(9.5);

  const principal = price - down;
  const r = roi / 12 / 100;
  const emi = principal * r * (1 + r) ** tenure / ((1 + r) ** tenure - 1);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">EMI Calculator</h1>
      <div className="max-w-xl bg-white rounded-xl shadow p-6 space-y-4">
        <label>Car Price ₹{price.toLocaleString()}</label>
        <input type="range" min="200000" max="5000000" value={price} onChange={e => setPrice(+e.target.value)} className="w-full" />
        <label>Down Payment ₹{down.toLocaleString()}</label>
        <input type="range" min="0" max={price} value={down} onChange={e => setDown(+e.target.value)} className="w-full" />
        <label>Tenure {tenure} months</label>
        <input type="range" min="12" max="84" value={tenure} onChange={e => setTenure(+e.target.value)} className="w-full" />
        <label>Interest {roi}%</label>
        <input type="range" min="6" max="15" step="0.1" value={roi} onChange={e => setRoi(+e.target.value)} className="w-full" />
        <div className="text-xl font-bold mt-4">Monthly EMI: ₹{Math.round(emi).toLocaleString()}</div>
        <div className="text-sm text-gray-600">Total payable: ₹{Math.round(emi * tenure).toLocaleString()}</div>
      </div>
    </main>
  );
}