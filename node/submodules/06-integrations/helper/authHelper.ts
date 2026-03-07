export function withAuth(client: Function, token: string) {
  return async (url: string) => {
    return client(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
