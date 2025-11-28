"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { AgCharts } from "ag-charts-react";
import "ag-charts-enterprise";


export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await fetch(
          "https://mixo-fe-backend-task.vercel.app/campaigns"
        );
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message);
       }
        const data = await res.json();
        setCampaigns(data.campaigns);
        console.log(data.campaigns);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);


   const [options, setOptions] = useState({
    title: {
      text: "Total Budget vs Daily Budget",
    },
    subtitle: {
      text: "In Billion U.S. Dollars",
    },
    // data: campaigns,
     data: [],
    series: [
      {
        type: "radar-area",
             angleKey: "id",
        radiusKey: "budget",
        radiusName: "budget",
      },
      {
        type: "radar-area",
           angleKey: "id",
        radiusKey: "daily_budget",
        radiusName: "daily_budget",
      },
    ],
  });

  useEffect(() => {
  setOptions((prev) => ({
    ...prev,
    data: campaigns,
  }));
}, [campaigns]);



  if (loading)
    return (
      <p className="h-screen w-full flex justify-center items-center gap-5">
        {" "}
        <Spinner className="size-18" /> Loading...
      </p>
    );
  if (error)
    return (
      <p
        style={{ color: "red" }}
        className="h-screen flex flex-col justify-center items-center gap-5"
      >
        Error: {error}
      </p>
    );

  return (
    <div className="w-full p-4 "
    style={{
    height: "749px"
}}
    >
      <h1 className="text-2xl font-bold mb-4" >Budget of Campaigns</h1>
         <AgCharts options={options}
          style={{
    height: 749
}} 
     />

        </div>
  );
}
