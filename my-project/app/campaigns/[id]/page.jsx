"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AgGridReact } from 'ag-grid-react'; 
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import axios from "axios";

ModuleRegistry.registerModules([AllCommunityModule]);


export default function CampaignDetail({ params }) {
  const [campaigns1, setCampaigns1] = useState([]);
  const { id } = React.use(params);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    
    const [colDefs, setColDefs] = useState([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);



  useEffect(() => {
    async function fetchCampaigns1() {
      try {
        const res = await axios.get(
          `https://mixo-fe-backend-task.vercel.app/campaigns/${id}`
        );
       
        setCampaigns1(res.data.campaign);
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
    <div className="p-6 flex justify-center items-center w-full gap-4 h-screen">
       
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
