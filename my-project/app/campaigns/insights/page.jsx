"use client"; 

import { useEffect, useState } from "react";

export default function InsightsPage() {
  const [insights, setInsights] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
     useEffect(() => {
      async function fetchCampaigns() {
         try {
        const res = await fetch("https://mixo-fe-backend-task.vercel.app/campaigns/insights");
        if (!res.ok) {
            const err = await res.json();
        throw new Error(err.message);
        //   throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setInsights(data.insights);
        console.log(data.insights);
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
    <div className="p-6 h-screen flex justify-center items-center">
        <div className="shadow-lg p-8 text-white bg-black rounded-lg">
          <button className="bg-blue-500 text-white py-1 px-2 my-4 rounded" onClick={() => window.history.back()}>Go Back</button>
       
      <h1 className="text-2xl font-bold mb-4">Campaign Insights</h1>
      <p>Active Campaigns: {insights.active_campaigns}</p>
        <p>Active: {insights.avg_conversion_rate}</p>
         <p>Avg CPC: ${insights.avg_cpc}</p>
   <p>Avg CTR: {insights.avg_ctr}%</p>
       <p>Completed: {insights.completed_campaigns}</p>
       <p>Paused: {insights.paused_campaigns}</p>
     
   
      <p>Total Campaigns: {insights.total_campaigns}</p>
     
      <p>Total Clicks: {insights.total_clicks}</p>
      <p>Total Conversions: {insights.total_conversions}</p>
      <p>Total Impressions: {insights.total_impressions}</p>
       <p>Total Spend: ${insights.total_spend}</p>
       </div>
      
    </div>
  );
}
