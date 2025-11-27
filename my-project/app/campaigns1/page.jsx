"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { AgGridReact } from 'ag-grid-react'; 
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 


ModuleRegistry.registerModules([AllCommunityModule]);


export default function CampaignsPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
 const [rowData, setRowData] = useState([]);

const [colDefs] = useState([
  { field: "id" },
  { field: "name" },
  { field: "brand_id" },
  { field: "status" },
  { field: "budget" },
  { field: "daily_budget" },
  {
    headerName: "platforms",
    valueGetter: (params) => params.data.platforms.join(", "),
  },
  { field: "created_at" },
]);


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
       setRowData(data.campaigns);
        console.log(rowData);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);

  useEffect(() => {
  console.log("rowData updated:", rowData);
}, [rowData]);
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
    <div className="w-full h-full p-4 bg-none "  // या 'ag-theme-balham' या जिस theme को तुमने install किया हो
  style={{ height: 800, width: "100%" }}>
      <h1 className="text-2xl font-bold mb-4">Sample Two Campaigns</h1>
         <AgGridReact 
                    rowData={rowData}
                    columnDefs={colDefs}
           />
    
    
    </div>
  );
}
