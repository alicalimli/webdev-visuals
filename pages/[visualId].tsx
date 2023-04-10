import supabase from "@/config/supabaseClient";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { VisualButtons } from "@/components";

interface VisualProps {}

const Visual = ({}: VisualProps) => {
  const router = useRouter();

  const { visualId } = router.query;

  const [loading, setLoading] = useState(false);
  const [visual, setVisual] = useState<any>(null);

  const fetchVisuals = async (visualId: number) => {
    setLoading(true);

    let query = supabase.from("visuals").select().eq("id", visualId);

    const { data, error } = await query;
    const fetchedVisual = data?.[0];

    error && console.error(error);
    data && setVisual(fetchedVisual as any);

    setLoading(false);
  };

  console.log(visual, loading, visualId);

  useEffect(() => {
    visualId && fetchVisuals(+visualId);
  }, [visualId]);

  return (
    <div className="mx-auto flex w-fit flex-col gap-4">
      {visual && !loading ? (
        <img
          src={visual?.imageURL}
          alt={`Image ${visual?.name}`}
          className="max-h-[75vh] w-fit rounded-xl"
        />
      ) : null}
      {visual ? <VisualButtons visualInfo={visual} /> : null}
    </div>
  );
};

export default Visual;
