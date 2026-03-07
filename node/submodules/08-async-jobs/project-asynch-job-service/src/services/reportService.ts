export async function generateFakePdf(jobId: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return `report-${jobId}.pdf`;
}
