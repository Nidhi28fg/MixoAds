"use client";
import { useRouter } from "next/navigation";
import img from "@/public/images/dashboard.png";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-bold mb-8">Welcome to MixoAds Dashboard</h1>

        <button className="bg-blue-500 text-white text-2xl py-2 my-2 px-8 rounded " onClick={() => router.push(`/campaigns`)}>Campaigns</button>
        <button className="bg-blue-500 text-white text-2xl py-2 my-2 px-8 rounded" onClick={() => router.push(`/campaigns/insights`)}>Insights</button>
      </div>
  );
}
