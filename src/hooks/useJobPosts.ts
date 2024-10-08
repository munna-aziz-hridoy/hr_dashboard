import { useEffect, useState } from "react";
import { getAllJobPosts } from "@/api";

type D = {
  job_id: string;
  role: string;
  company_name: string;
  type: string;
  status: string;
  createdAt: string;
  id: string;
};

function useJobPosts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState([]);
  const [modifiedData, setModifiedData] = useState([]);

  useEffect(() => {
    const fetchJobPosts = async () => {
      setLoading(true);
      try {
        const data = await getAllJobPosts();

        if (data.data) {
          setData(data.data);
          const modifed = data?.data?.map((d: D) => ({
            job_id: `j_${d?.id?.slice(0, 3)}`,
            role: d?.role,
            company_name: d?.company_name,
            type: d?.type,
            status: d?.status,
            createdAt: d?.createdAt?.split("T")[0],
            id: d?.id,
          }));

          setModifiedData(modifed);
        } else setError("No data found");
      } catch (error) {
        console.log(error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, []);

  return { loading, error, data, modifiedData };
}

export default useJobPosts;
