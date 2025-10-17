"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

type Car = {
  _id: string;
  make: string;
  model: string;
  year: number;
  body_type: string;
  thumbnail: string;
  images: string[];
  variants: { name: string; price_inr: number; fuel: string; transmission: string; mileage: number }[];
};

type CompareResp = { left: Car; right: Car; ai_summary: string };

type CompareResp = { left: Car; right: Car; ai_summary: string };
export default function ComparePage() {
  const sp = useSearchParams();
  const [data, setData] = useState<CompareResp | null>(null);

  useEffect(() => {
    const left = sp.get("left");
    const right = sp.get("right");
    if (!left || !right) return;
    axios.post("http://localhost:8000/api/v1/compare", { left_id: left, right_id: right })
      .then(r => setData(r.data));
  }, [sp]);

  if (!data) return <p className="p-6">Loading comparison...</p>;

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Compare Cars</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { label: "Left", car: data.left },
          { label: "Right", car: data.right }
        ].map(({ label, car }) => (
          <div key={label} className="bg-white rounded-xl shadow p-4">
            <img src={car.thumbnail.trim()} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{car.make} {car.model}</h2>
            <table className="w-full text-sm mt-3">
              <tbody>
                <tr><td>Price</td><td className="font-bold">₹{car.variants[0].price_inr.toLocaleString()}</td></tr>
                <tr><td>Mileage</td><td>{car.variants[0].mileage} kmpl</td></tr>
                <tr><td>Fuel</td><td>{car.variants[0].fuel}</td></tr>
                <tr><td>Type</td><td>{car.body_type}</td></tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-white rounded-xl shadow p-4">
        <h3 className="font-semibold mb-2">AI Says</h3>
        <p className="text-sm">{data.ai_summary}</p>
      </div>
    </main>
  );
}