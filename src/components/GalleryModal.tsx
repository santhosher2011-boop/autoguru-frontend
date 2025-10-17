"use client";
export default function GalleryModal({ images, onClose }: { images: string[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-4 rounded max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <button className="float-right text-xl font-bold" onClick={onClose}>×</button>
        <h2 className="text-xl mb-4">Gallery</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {images.map((src, i) => (
            <img key={i} src={src.trim()} className="rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}