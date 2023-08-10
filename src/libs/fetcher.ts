export function fetcher(path: string, data?: any) {
  return fetch(`${window.location.origin}/api/${path}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
}
