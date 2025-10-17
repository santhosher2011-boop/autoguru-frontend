"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GalleryModal from "@/components/GalleryModal";

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

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cars`)
      .then((r) => r.json())
      .then(setCars)
      .catch(console.error);
  }, []);

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      {/* Header bar with EMI link */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">AutoGuru – Pi Car Lot</h1>
        <Link href="/emicalc" className="ml-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">EMI Calc</Link>
      </div>

      {/* Car grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((c) => (
          <div key={c._id} className="rounded-xl shadow bg-white p-4 flex flex-col">
            <img src={c.thumbnail.trim()} alt={c.model} className="w-full h-40 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-3">{c.make} {c.model}</h2>
            <p className="text-sm text-gray-600">{c.year} · {c.body_type}</p>



            <div className="mt-3 space-y-2">
              {c.variants.map((v) => (
                <div key={v.name} className="flex justify-between text-sm">
                  {/*  dark grey label  */}
                  <span className="text-gray-700">
                    {v.name} ({v.fuel}, {v.transmission})
                  </span>
                  {/*  bold dark price  */}
                  <span className="text-gray-900 font-semibold">
                    ₹{v.price_inr.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={() => setGallery(c.images)} className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">View Photos</button>
              <button onClick={() => router.push(`/compare?left=${cars[0]?._id}&right=${c._id}`)} className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Compare</button>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery modal */}
      {gallery.length > 0 && <GalleryModal images={gallery} onClose={() => setGallery([])} />}
    </main>
  );
}