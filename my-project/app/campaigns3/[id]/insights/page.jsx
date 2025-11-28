"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

export default function CampaignDetail({ params }) {
  const [campaigns1, setCampaigns1] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = React.use(params);
    const router = useRouter();
  useEffect(() => {
    async function fetchCampaigns1() {
      try {
        const res = await fetch(
          `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights`
        );
        if (!res.ok) {
            const err = await res.json();
        throw new Error(err.message);
        }
        const data = await res.json();
        console.log(data);
        setCampaigns1(data.insights);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns1();
  }, [id]);

   if (loading) return <p className="h-screen flex flex-col justify-center items-center gap-5">Loading...</p>;
  if (error) return <p style={{ color: "red" }} className="h-screen flex flex-col justify-center items-center gap-5" >Error: {error}</p>;

  return (
    <div className="p-6 flex justify-center items-center flex-col gap-4 h-screen">
          <div className="shadow-lg p-8 text-white bg-black rounded-lg">
      <button className="bg-blue-500 text-white py-2 my-4 px-2 rounded" onClick={() => window.history.back()}>Go Back</button>
      <p>Compaign id: {campaigns1.campaign_id}</p>
      <p>Clicks: {campaigns1.clicks}</p>
      <p>Conversions: {campaigns1.conversions}</p>
      <p>Spend: {campaigns1.spend}</p>
      <p>impressions: {campaigns1.impressions}</p>
      <p>ctr: {campaigns1.ctr}</p>
      <p>Cpc: {campaigns1.cpc}</p>
      <p>Conversion Rate: {campaigns1.conversion_rate}</p>
      <button className="bg-blue-500 text-white py-2 my-4 px-2 rounded"
        onClick={() => router.push(`/campaigns/${id}/insights/stream`)}
      >
        Stream real-time metrics via SSE
      </button>
      </div>
    </div>
  );
}
