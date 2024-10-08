import { Job_Post_Payload, Save_Job_Post } from "@/types";

const api_url = process.env.NEXT_PUBLIC_API_URL;
// const api_url = "http://localhost:5000";

export async function getAllJobPosts() {
  const url = `${api_url}/job-posts/all`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch job posts");
  }
  const data = await response.json();
  return data;
}

export async function getJobPostById(id: string) {
  const url = `${api_url}/job-posts/details/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch job post");
  }
  const data = await response.json();
  return data;
}

export async function createJobPost(payload: Job_Post_Payload) {
  const url = `${api_url}/job-posts/create`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to create job post");
  }
  const data = await response.json();
  return data;
}

export async function saveJobPost(payload: Save_Job_Post) {
  const url = `${api_url}/job-posts/save`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Failed to save job post");
  }
  const data = await response.json();
  return data;
}

export async function getResumeRanking(payload: FormData) {
  const response = await fetch(
    "https://resume-sorter.onrender.com/resume-upload/upload-multiple",
    {
      method: "POST",
      body: payload,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to get resume ranking");
  }
  const data = await response.json();
  return data;
}
