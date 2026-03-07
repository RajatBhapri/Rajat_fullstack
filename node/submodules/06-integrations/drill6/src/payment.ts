import axios from "axios";
import { randomUUID } from "crypto";

export async function createPayment() {
  const key = randomUUID();

  const res = await axios.post(
    "https://api.example.com/pay",
    { amount: 100 },
    {
      headers: {
        "Idempotency-Key": key,
      },
    },
  );

  return res.data;
}
