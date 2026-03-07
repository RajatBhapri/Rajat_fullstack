import axios from "axios";

export async function fetchExternal() {
  const res = await axios.get("https://api.example.com/data");
  return res.data;
}
