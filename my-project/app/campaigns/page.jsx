"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const res = await axios.get(
          "https://mixo-fe-backend-task.vercel.app/campaigns"
        );
        setCampaigns(res.data.campaigns);
        console.log(res.data.campaigns);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCampaigns();
  }, []);
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
    <div className="w-full h-full p-4 ">
      <h1 className="text-2xl font-bold mb-4">All Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {campaigns.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle className="font-bold text-xl">{c.name}</CardTitle>
              <CardDescription className="font-bold">${c.budget}</CardDescription>
              <CardAction><Button className={`${c.status === 'active' ? 'bg-green-600 ' : 'bg-red-500'} text-white font-bold w-full uppercase`}>{c.status}</Button></CardAction>
            </CardHeader>
            <CardContent>
              <p>Daily Budget: {c.daily_budget}</p>
              <p>Platforms: {c.platforms.join(", ")}</p>
            </CardContent>
            <CardFooter>
              <Button
                className="text-white w-full font-bold bg-amber-700 my-4"
                variant="link"
                size="sm"
                onClick={() => router.push(`/campaigns/${c.id}`)}
              >
                Compaign Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
