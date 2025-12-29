import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">URL Shortener</h1>
        <p className="text-sm text-slate-700 mb-6">
          Shorten long links instantly and share them easily.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/shorturl"
            className="bg-blue-600 text-white px-4 py-2 rounded
               hover:bg-blue-700 hover:scale-105
               transition-all duration-200"
          >
            Shorten a URL
          </Link>
          <button
            className="border px-4 py-2 rounded
               hover:bg-gray-100 hover:scale-105
               transition-all duration-200"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}
