"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AgGridReact } from 'ag-grid-react'; 
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

ModuleRegistry.registerModules([AllCommunityModule]);


export default function CampaignDetail({ params }) {
  // const [campaigns1, setCampaigns1] = useState([]);
  const { id } = React.use(params);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rowData, setRowData] = useState([
        { name: "", id: "", brand_id: "", status: "" },
    ]);

    
    const [colDefs, setColDefs] = useState([
        { field: "name" },
        { field: "id" },
        { field: "brand_id" },
        { field: "status" }
    ]);



  useEffect(() => {
    async function fetchCampaigns1() {
      try {
        const res = await fetch(
          `https://mixo-fe-backend-task.vercel.app/campaigns/${id}`
        );
        if (!res.ok) {
            const err = await res.json();
        throw new Error(err.message);        
        }
        const data = await res.json();
        setRowData([data.campaign]);
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
       
       <div className="shadow-lg p-8 text-white bg-black  w-full rounded-lg">
     <Button className="bg-blue-500 text-white py-1 px-2 my-4 rounded" onClick={() => window.history.back()}>Go Back</Button>
     <div style={{ height: 500 }}>
        <AgGridReact

            rowData={rowData}
            columnDefs={colDefs}
        />
    </div>
       {/* <h1 className="text-2xl font-bold mb-4">{campaigns1.name}</h1>
      <p>Id: {campaigns1.id}</p>
      <p>Brand id: {campaigns1.brand_id}</p>
      <p>Status: {campaigns1.status}</p>
      <p>Budget: ${campaigns1.budget}</p>
      <p>Daily Budget: ${campaigns1.daily_budget}</p>
      <p>Created At: {new Date(campaigns1.created_at).toLocaleString()}</p> */}

      <Button className="bg-blue-500 text-white py-1 px-2 my-4 rounded"
        onClick={() => router.push(`/campaigns/${rowData[0].id}/insights`)}
      >
        Metrics for Specific Campaign
      </Button>
      </div>
    </div>
  );
}
