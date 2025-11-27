"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
// import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";


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
      text: "Apple's Revenue by Product Category",
    },
    subtitle: {
      text: "In Billion U.S. Dollars",
    },
    // data: campaigns,
     data: [],
    series: [
      {
        type: "bar",
        direction: "horizontal",
        xKey: "id",
        yKey: "budget",
        yName: "budget",
      },
      {
        type: "bar",
        direction: "horizontal",
        xKey: "id",
        yKey: "daily_budget",
        yName: "daily_budget",
      },
      // {
      //   type: "bar",
      //   direction: "horizontal",
      //   xKey: "id",
      //   yKey: "ipad",
      //   yName: "iPad",
      // },
      // {
      //   type: "bar",
      //   direction: "horizontal",
      //   xKey: "id",
      //   yKey: "wearables",
      //   yName: "Wearables",
      // },
      // {
      //   type: "bar",
      //   direction: "horizontal",
      //   xKey: "id",
      //   yKey: "services",
      //   yName: "Services",
      // },
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
      <h1 className="text-2xl font-bold mb-4">Sample One Campaigns</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> */}
    <AgCharts options={options}
     style={{
    height: "749px"
}}  />

        </div>
  );
}
