export function fetcher(path: string, data?: any) {
  return fetch(`${window.location.origin}/api/${path}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error('Fetching error');
    }
    return res.json();
  });
}
