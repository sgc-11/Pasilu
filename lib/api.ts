// lib/api.ts
export async function post<T, B = unknown>(url: string, body: B): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",           // por si luego usas cookies
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = (await res.json()).error ?? res.statusText;
    throw new Error(msg);
  }
  return res.json();
}
