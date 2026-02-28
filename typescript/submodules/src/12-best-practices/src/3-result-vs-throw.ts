type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function parseConfigResult(input: string): Result<{ port: number }> {
  const port = Number(input);

  if (Number.isNaN(port)) {
    return { ok: false, error: "invalid port" };
  }

  return { ok: true, value: { port } };
}

class AppError extends Error {}

function parseConfigThrow(input: string): { port: number } {
  const port = Number(input);

  if (Number.isNaN(port)) {
    throw new AppError("invalid port");
  }

  return { port };
}

// result style
const r = parseConfigResult("3000");
if (r.ok) {
  console.log(r.value.port);
} else {
  console.log(r.error);
}

// throw style
try {
  const c = parseConfigThrow("oops");
  console.log(c.port);
} catch (e) {
  console.log("caught error");
}
