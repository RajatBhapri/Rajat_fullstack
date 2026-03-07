export function problem(
  res: any,
  status: number,
  title: string,
  detail: string,
) {
  res.status(status).json({
    type: "about:blank",
    title,
    status,
    detail,
  });
}
