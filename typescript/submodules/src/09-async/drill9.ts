async function sendEmail(email: string) {
  await new Promise((res) => setTimeout(res, 1000));

  if (Math.random() < 0.5) throw new Error("SMTP failed");

  console.log(`Email sent to ${email}`);
}

sendEmail("alice@example.com");

sendEmail("alice@example.com").catch((err) =>
  console.error("Background email error:", err),
);

function runInBackground<T>(promise: Promise<T>, name?: string) {
  promise.catch((err) => {
    console.error(`Background task${name ? ` (${name})` : ""} failed:`, err);
  });
}

runInBackground(sendEmail("bob@example.com"), "sendEmail");
