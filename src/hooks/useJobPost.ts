import { useEffect, useState } from "react";
import { getJobPostById } from "@/api";
import { Job_Post_Data } from "@/types";

function useJobPost(id: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<Job_Post_Data>();

  useEffect(() => {
    const fetchJobPosts = async () => {
      setLoading(true);
      try {
        const data = await getJobPostById(id);

        if (data.data) {
          setData(data.data);
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

  return { loading, error, data };
}

export default useJobPost;
