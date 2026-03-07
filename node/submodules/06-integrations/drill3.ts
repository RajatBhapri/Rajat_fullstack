import { withAuth } from "./helper/authHelper";

const client = fetch;

const authClient = withAuth(client, "abc123");

await authClient("https://api.example.com/data");
