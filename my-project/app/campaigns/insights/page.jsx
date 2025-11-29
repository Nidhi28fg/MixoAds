"use client"; 

import { useEffect, useState } from "react";
import { AgCharts } from "ag-charts-react";
import axios from "axios";

export default function InsightsPage() {
  const [insights, setInsights] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState({
      width: 1000,      // ✅ Width
  height: 800,
    data: [],
    title: {
      text: "Campaign Insights",
  },
    series: [
      {
        type: "pie",
        angleKey: "value",
        calloutLabelKey: 'category',
        sectorLabelKey: 'value',
            sectorLabel: {
                color: 'white',
                fontWeight: 'bold',
            },
      },
    ],
   });
  
    useEffect(() => {
      async function fetchCampaigns() {
         try {
        const res = await axios.get("https://mixo-fe-backend-task.vercel.app/campaigns/insights");
        setInsights(res.data.insights);
        console.log(res.data.insights);      
         } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      }
      fetchCampaigns();
    }, []);

    

  useEffect(() => {
  if (insights) {
    const pieData = [
      { category: "Active Campaigns", value: insights.active_campaigns || 0 },
      { category: "Avg CTR", value: insights.avg_ctr || 0 },
      { category: "Paused", value: insights.paused_campaigns || 0 },
      { category: "Avg Conversion Rate", value: insights.avg_conversion_rate || 0 },
      { category: "Avg CPC", value: insights.avg_cpc || 0 },
      { category: "Completed Campaigns", value: insights.completed_campaigns || 0 },
      { category: "Paused Campaigns", value: insights.paused_campaigns || 0 },
      { category: "Total Clicks", value: insights.total_clicks || 0 },
      { category: "Total Conversions", value: insights.total_conversions || 0 },
      { category: "Total Spend", value: insights.total_spend || 0 }

    ];
    setOptions(prev => ({ ...prev, data: pieData }));
  }
}, [insights]);


   if (loading) return <p className="h-screen flex flex-col justify-center items-center gap-5">Loading...</p>;
  if (error) return <p style={{ color: "red" }} className="h-screen flex flex-col justify-center items-center gap-5" >Error: {error}</p>;


  return (
    <>
      <AgCharts options={options}  style={{
        height: "800",
      }}  />
     </>      
  );
}
