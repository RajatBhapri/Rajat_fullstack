export const sendEmail = async (to: string, subject: string) => {
  console.log(`Sending email to ${to}`);

  if (Math.random() < 0.5) {
    throw new Error("Email service failed");
  }

  console.log(`Email sent to ${to}`);
};
