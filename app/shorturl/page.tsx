"use client";

import { useState } from "react";
import { domain } from "../lib/domain";
import Link from "next/link";
import axios from "axios";

export default function Shortify() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/long", {
        longUrl,
      });
      const shortUrlToSet = domain + res.data.shorturl;
      setShortUrl(shortUrlToSet);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <div className="max-w-lg w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 px-2 py-1 rounded hover:text-blue-700 hover:bg-blue-50 active:scale-95 transition-all duration-200"
        >
          ← Back
        </Link>
        <h1 className="text-2xl font-semibold mb-4">Create a short link</h1>
        <input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://example.com/..."
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <div className="flex gap-2">
          <button
            onClick={handleShorten}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:scale-105 transition-all duration-200"
          >
            Shorten
          </button>
          <button
            onClick={handleCopy}
            className="border px-4 py-2 rounded
               hover:bg-gray-100 hover:scale-105
               transition-all duration-200"
            disabled={!shortUrl}
          >
            Copy
          </button>
        </div>
        {shortUrl && (
          <p className="mt-4 text-sm">
            Short URL: <span className="font-mono">{shortUrl}</span>
          </p>
        )}
      </div>
    </div>
  );
}
