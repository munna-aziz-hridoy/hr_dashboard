const api_url = process.env.NEXT_PUBLIC_API_URL;

export async function getCandidates(id: string) {
  const url = `${api_url}/candidates/list/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch candidates");
  }
  const data = await response.json();
  return data;
}
