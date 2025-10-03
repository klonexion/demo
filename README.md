
# Productos - Carlos Landin

Este repositorio contiene backend y frontend:

- Node.js 18+ (recomendado 20)
- pnpm **o** npm **o** yarn
- Docker y Docker Compose

### 1) Backend
```bash
cd ms-products
npm install
cp .env.example .env
npm run start:dev
```
El servicio corre por defecto en **http://localhost:3001**

### 2) Frontend 
```bash
cd products-front
npm install
npm run dev
```
Frontend: **http://localhost:5173** 

Backend: `http://localhost:3001` 

## Pruebas

### Backend
```bash
cd ms-products
npm run test
```

### Frontend
```bash
cd products-front
npm run  test
```

---

## env
Archivo `.env` del backend:

```
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

---

## Docker 
### Backend
```bash
cd ms-products
docker build -t ms-products .
docker run -p 3001:3001 --env-file .env ms-products
```

### Frontend
```bash
cd products-front
docker build -t products-front .
docker run -p 5173:5173 -e VITE_API_BASE=http://host.docker.internal:3001 products-front
```

---

## Documentacion

- `GET /products` — lista de productos 
- `GET /products/:id` — detalle
- `POST /products` — crear
- `PATCH /products/:id` — actualizar
- `DELETE /products/:id` — borrar

**Modelo**

```json
{
  "id": "uuid",
  "name": "string",
  "sku": "string",
  "price": 123.45,
  "currency": "MXN|USD|...",
  "companyId": "string",
  "isActive": true,
  "createdAt": "ISO",
  "updatedAt": "ISO"
}
```