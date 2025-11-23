"use client";
import { useEffect, useState } from "react";
import React from "react";

export default function CampaignDetail({ params }) {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
   const { id } = React.use(params);

  useEffect(() => {
    const source = new EventSource(
      `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights/stream`
    );

    source.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setMetrics(parsed);
      } catch (err) {
        setError("Invalid stream data");
      }
    };

    source.onerror = (err) => {
         setError("Stream connection failed");
         source.close();
    };

    return () => {
      source.close(); 
    };
  }, [id]);

 
  if (error) return <p style={{ color: "red" }} className="h-screen flex flex-col justify-center items-center gap-5">Error: {error}</p>;
  if (!metrics) return <p className="h-screen flex flex-col justify-center items-center gap-5">Waiting for live data...</p>;

  return (
    <div className="p-6 flex justify-center items-center flex-col gap-4 h-screen">
        <div className="shadow-lg p-8 text-white bg-black rounded-lg">
      <button className="bg-blue-500 text-white py-2 my-4 px-2 rounded" onClick={() => window.history.back()}>Go Back</button>
      <p>Campaign ID: {metrics.campaign_id}</p>
      <p>Timestamp: {new Date(metrics.timestamp).toLocaleString()}</p>
      <p>Impressions: {metrics.impressions}</p>
      <p>Clicks: {metrics.clicks}</p>
      <p>Conversions: {metrics.conversions}</p>
      <p>Spend: ${metrics.spend}</p>
      <p>CTR: {metrics.ctr}%</p>
      <p>CPC: ${metrics.cpc}</p>
      <p>Conversion Rate: {metrics.conversion_rate}%</p>
      </div>
      </div>
  );
}
