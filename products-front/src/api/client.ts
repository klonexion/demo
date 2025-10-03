
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001';

async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json();
}

export const api = {
  listProducts(companyId?: string) {
    const q = companyId ? `?companyId=${encodeURIComponent(companyId)}` : '';
    return http(`/products${q}`);
  },
  createProduct(payload: any) {
    return http('/products', { method: 'POST', body: JSON.stringify(payload) });
  },
  updateProduct(id: string, payload: any) {
    return http(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
  },
  deleteProduct(id: string) {
    return http(`/products/${id}`, { method: 'DELETE' });
  },
};
