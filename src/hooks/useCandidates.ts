import { useEffect, useState } from "react";
import { getCandidates } from "@/api";
import { Candidates } from "@/types";

function useCandidates(id: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<Candidates[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const data = await getCandidates(id);

        if (data) {
          setData(data);
        } else setError("No data found");
      } catch (error) {
        console.log(error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return { loading, error, data };
}

export default useCandidates;
