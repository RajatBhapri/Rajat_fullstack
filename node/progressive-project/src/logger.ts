export function log(level: string, message: string) {
  const time = new Date().toISOString();

  console.log(
    JSON.stringify({
      time,
      level,
      message,
    }),
  );
}
