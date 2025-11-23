"use client"; 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import img from "@/public/images/dashboard.png";
export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
   const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
  useEffect(() => {
    async function fetchCampaigns() {
        try {
      const res = await fetch("https://mixo-fe-backend-task.vercel.app/campaigns");
      if(!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
        //   throw new Error(`HTTP error! Status: ${res.status}`);
        }
      const data = await res.json();
      setCampaigns(data.campaigns); 
       } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } 
    fetchCampaigns();
  }, []);
     if (loading) return <p className="h-screen flex flex-col justify-center items-center gap-5">Loading...</p>;
  if (error) return <p style={{ color: "red" }} className="h-screen flex flex-col justify-center items-center gap-5" >Error: {error}</p>;


  return (
<div className="h-fit m-8 p-8">
      <h1 className="text-2xl font-bold mb-4">All Campaigns</h1>
      <ul className="space-y-2 flex flex-wrap gap-4 justify-center">
        {campaigns.map(c => (
          <li key={c.id} className="p-3 rounded" >
                <div className="shadow-lg p-8 text-white bg-black rounded-lg">
            <p className="font-semibold ">{c.name}</p>
            <p>Status: {c.status}</p>
            <p>Budget: {c.budget}</p>
            <p>Daily Budget: {c.daily_budget}</p>
            <p>Platforms: {c.platforms.join(", ")}</p>
            <button className="bg-blue-500 text-white py-2 rounded-xl my-4 px-2" onClick={() => router.push(`/campaigns/${c.id}`)}>Single Compaign Details</button>
            </div>
          </li>
        ))}
      </ul>
    
    </div>
  );
}
