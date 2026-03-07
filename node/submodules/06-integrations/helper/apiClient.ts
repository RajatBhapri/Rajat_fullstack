import dotenv from "dotenv";

dotenv.config();

export async function callApi(url: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });

  return res.json();
}
