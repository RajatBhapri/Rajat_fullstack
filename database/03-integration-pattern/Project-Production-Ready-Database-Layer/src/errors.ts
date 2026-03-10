export function mapPgError(err: any) {
  if (err.code === "23505")
    return { status: 409, message: "Duplicate resource" };

  if (err.code === "23503")
    return { status: 400, message: "Invalid reference" };

  return { status: 500, message: "Database error" };
}
