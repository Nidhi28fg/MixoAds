"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";


export default function CampaignDetail({ params }) {
  const [campaigns1, setCampaigns1] = useState([]);
  const { id } = React.use(params);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCampaigns1() {
      try {
        const res = await fetch(
          `https://mixo-fe-backend-task.vercel.app/campaigns/${id}`
        );
        if (!res.ok) {
            const err = await res.json();
        throw new Error(err.message);
        //   throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setCampaigns1(data.campaign);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns1();
  }, [id]);

    if (loading) return <p className="h-screen w-full flex justify-center items-center gap-5">Loading...</p>;
  if (error) return <p style={{ color: "red" }} className="h-screen w-full flex flex-col justify-center items-center gap-5" >Error: {error}</p>;

  return (
    <div className="p-6 flex justify-center items-center flex-col gap-4 h-screen w-full">
       <div className="shadow-lg p-8 text-white bg-black rounded-lg">
     <Button className="bg-blue-500 text-white py-1 px-2 my-4 rounded" onClick={() => window.history.back()}>Go Back</Button>
       <h1 className="text-2xl font-bold mb-4">{campaigns1.name}</h1>
      <p>Id: {campaigns1.id}</p>
      <p>Brand id: {campaigns1.brand_id}</p>
      <p>Status: {campaigns1.status}</p>
      <p>Budget: ${campaigns1.budget}</p>
      <p>Daily Budget: ${campaigns1.daily_budget}</p>
      <p>Created At: {new Date(campaigns1.created_at).toLocaleString()}</p>

      <Button className="bg-blue-500 text-white py-1 px-2 my-4 rounded"
        onClick={() => router.push(`/campaigns/${campaigns1.id}/insights`)}
      >
        Metrics for Specific Campaign
      </Button>
      </div>
    </div>
  );
}
