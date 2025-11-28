"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { AgGridReact } from 'ag-grid-react'; 
// import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import {
  CellStyleModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
} from "ag-grid-community";ModuleRegistry.registerModules([
  CellStyleModule,
  ClientSideRowModelModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

function currencyFormatter(params) {
  const value = Math.floor(params.value);
  if (isNaN(value)) {
    return "";
  }
  return "£" + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}


// ModuleRegistry.registerModules([AllCommunityModule]);


export default function CampaignsPage() {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
 const [rowData, setRowData] = useState([]);

  const columnTypes = useMemo(() => {
    return {
      currency: {
        width: 150,
        valueFormatter: currencyFormatter,
      },
      shaded: {
        cellClass: "shaded-class",
      },
    };
  }, []);

const [colDefs , setColDefs] = useState([
  { field: "id" },
  { field: "name" },
  { field: "brand_id" },
  { field: "status" },
  { field: "budget", type: "currency" },
  { field: "daily_budget", type: ["currency", "shaded"] },
  {
    headerName: "platforms",
    valueGetter: (params) => params.data.platforms.join(", "),
  },
  { field: "created_at" },
]);

//  const defaultColDef = {
//     flex: 1,
//   };


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
    <div style={containerStyle}>
      <h2 className="my-8 font-bold text-2xl">All Campaigns Student Lists</h2>
      <div style={{ height: 900, boxSizing: "border-box" }}>
        <div style={gridStyle}>
         <AgGridReact 
                    rowData={rowData}
                    columnTypes={columnTypes}
                    columnDefs={colDefs}
                  
                    //  defaultColDef={defaultColDef}
           />
</div>
      </div>
    </div>
  );
};