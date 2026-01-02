# 📚 Thesis Finder API Documentation

Complete API reference untuk Thesis Finder backend.

## 🔧 Base URL

```
Development: http://localhost:3000/api
Production: https://api.your-domain.com/api
```

## 🔐 Authentication

Menggunakan **Session-based** authentication dengan `express-session`.

Request headers tidak perlu Bearer token - session otomatis di-set via cookie.

```bash
# After login, session cookie otomatis included
curl -X GET http://localhost:3000/api/auth/me \
  -H "Cookie: connect.sid=your-session-id"
```

---

## 👤 Auth Endpoints

### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Errors:**
- `400` - Missing fields atau email sudah terdaftar
- `500` - Server error

---

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

**Errors:**
- `400` - Missing email atau password
- `401` - Invalid credentials
- `500` - Server error

---

### Logout
```
POST /auth/logout
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

---

### Get Current User
```
GET /auth/me
```

**Requires:** Authentication (session cookie)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER"
}
```

**Errors:**
- `401` - Not authenticated
- `500` - Server error

---

## 🔍 Search Endpoints

### Search Thesis Titles
```
POST /search
```

**Request Body:**
```json
{
  "query": "machine learning",
  "fieldOfStudy": "Computer Science",
  "limit": 10
}
```

**Query Parameters:**
- `query` (required) - Search keyword
- `fieldOfStudy` (optional) - Filter by field
- `limit` (optional, default: 10) - Number of results

**Response (200 OK):**
```json
{
  "query": "machine learning",
  "count": 5,
  "results": [
    {
      "id": "uuid",
      "title": "Machine Learning for Student Attendance System",
      "fieldOfStudy": "Computer Science",
      "keywords": ["machine learning", "attendance"],
      "method": "Classification",
      "abstractSummary": "...",
      "createdAt": "2024-01-02T10:30:00Z",
      "references": [...]
    }
  ]
}
```

---

### Get Thesis Detail
```
GET /search/:id
```

**Path Parameters:**
- `id` - Thesis ID (UUID)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "title": "Machine Learning for Student Attendance System",
  "fieldOfStudy": "Computer Science",
  "keywords": ["machine learning", "attendance"],
  "method": "Classification",
  "abstractSummary": "...",
  "embedding": [0.1, 0.2, ...],
  "createdAt": "2024-01-02T10:30:00Z",
  "references": [
    {
      "id": "ref-uuid",
      "title": "Machine Learning Basics",
      "authors": "Tom Mitchell",
      "year": 1997,
      "source": "McGraw-Hill",
      "doi": "10.1234/example"
    }
  ]
}
```

**Errors:**
- `404` - Thesis not found
- `500` - Server error

---

### Get Related Thesis
```
GET /search/:id/related
```

**Path Parameters:**
- `id` - Thesis ID (UUID)

**Query Parameters:**
- `limit` (optional, default: 5) - Number of related thesis

**Response (200 OK):**
```json
{
  "thesisId": "uuid",
  "count": 3,
  "related": [
    {
      "id": "uuid",
      "title": "Deep Learning Based Traffic Prediction",
      "fieldOfStudy": "Computer Science",
      "keywords": ["deep learning"],
      "method": "LSTM"
    }
  ]
}
```

---

### Recommend Research Method
```
POST /search/recommend-method
```

**Request Body:**
```json
{
  "keywords": ["machine learning", "classification", "prediction"]
}
```

**Response (200 OK):**
```json
{
  "keywords": ["machine learning", "classification"],
  "recommendedMethod": "Klasifikasi (Naive Bayes, SVM, Random Forest)"
}
```

---

## 📦 Dataset Endpoints

### Get All Datasets
```
GET /dataset
```

**Query Parameters:**
- `fieldOfStudy` (optional) - Filter by field
- `limit` (optional, default: 10)
- `skip` (optional, default: 0) - For pagination

**Response (200 OK):**
```json
{
  "total": 15,
  "count": 10,
  "datasets": [
    {
      "id": "uuid",
      "name": "Attendance Dataset 2023",
      "description": "Student attendance records",
      "fieldOfStudy": "Computer Science",
      "fileUrl": "s3://bucket/file.csv",
      "price": 50000,
      "isPaid": true,
      "createdAt": "2024-01-02T10:30:00Z"
    }
  ]
}
```

---

### Get Dataset Detail
```
GET /dataset/:id
```

**Path Parameters:**
- `id` - Dataset ID (UUID)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "name": "Attendance Dataset 2023",
  "description": "Student attendance records",
  "fieldOfStudy": "Computer Science",
  "fileUrl": "s3://bucket/file.csv",
  "price": 50000,
  "isPaid": true,
  "createdAt": "2024-01-02T10:30:00Z"
}
```

**Errors:**
- `404` - Dataset not found
- `500` - Server error

---

### Download Dataset
```
POST /dataset/:id/download
```

**Requires:** Authentication (session cookie)

**Path Parameters:**
- `id` - Dataset ID (UUID)

**Response (200 OK) - Free Dataset:**
```json
{
  "message": "Download link generated",
  "downloadUrl": "s3://bucket/file.csv"
}
```

**Response (200 OK) - Paid Dataset (After Payment):**
```json
{
  "message": "Download link generated",
  "downloadUrl": "s3://bucket/file.csv"
}
```

**Errors:**
- `401` - Not authenticated
- `403` - Payment required
- `404` - Dataset not found
- `500` - Server error

---

## 💳 Payment Endpoints

### Create Payment Transaction
```
POST /payment/create
```

**Requires:** Authentication (session cookie)

**Request Body:**
```json
{
  "itemType": "DATASET",
  "itemId": "uuid-of-dataset",
  "amount": 50000
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "transaction": {
    "transactionId": "uuid",
    "token": "snap-token-from-midtrans",
    "redirectUrl": "https://app.sandbox.midtrans.com/snap/snap.js"
  }
}
```

**Errors:**
- `400` - Missing required fields
- `401` - Not authenticated
- `500` - Payment creation failed

---

### Check Payment Status
```
GET /payment/:transactionId
```

**Path Parameters:**
- `transactionId` - Transaction ID (UUID)

**Response (200 OK):**
```json
{
  "status": "PAID",
  "amount": 50000,
  "itemType": "DATASET"
}
```

**Possible Status:**
- `PENDING` - Waiting for payment
- `PAID` - Payment successful
- `FAILED` - Payment failed
- `EXPIRED` - Payment expired

**Errors:**
- `404` - Transaction not found
- `500` - Server error

---

### Midtrans Webhook Callback
```
POST /payment/callback
```

**Triggered by:** Midtrans payment gateway

**Request Body (from Midtrans):**
```json
{
  "transaction_time": "2024-01-02 10:30:00",
  "transaction_status": "settlement",
  "transaction_id": "...",
  "status_message": "Settlement has been accepted",
  "status_code": "200",
  "signature_key": "...",
  "settlement_time": "2024-01-02 10:35:00",
  "order_id": "ORDER-...",
  "merchant_id": "...",
  "masked_card": "481111-1114",
  "gross_amount": "50000.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

**Response (200 OK):**
```json
{
  "status": "ok"
}
```

---

## 📊 Example Workflows

### 1. User Registration & Login Flow

```bash
# Step 1: Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'

# Step 2: Login (session automatically set)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Step 3: Check authenticated user
curl -X GET http://localhost:3000/api/auth/me
```

### 2. Search & Get Dataset Flow

```bash
# Step 1: Search thesis
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "machine learning",
    "limit": 5
  }'

# Step 2: Get related datasets
curl -X GET "http://localhost:3000/api/dataset?fieldOfStudy=Computer%20Science"

# Step 3: Get dataset detail
curl -X GET http://localhost:3000/api/dataset/{datasetId}
```

### 3. Purchase & Download Flow

```bash
# Step 1: Create payment transaction
curl -X POST http://localhost:3000/api/payment/create \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=..." \
  -d '{
    "itemType": "DATASET",
    "itemId": "{datasetId}",
    "amount": 50000
  }'

# Step 2: User completes payment at Midtrans

# Step 3: Check payment status
curl -X GET http://localhost:3000/api/payment/{transactionId}

# Step 4: Download dataset (if paid)
curl -X POST http://localhost:3000/api/dataset/{datasetId}/download \
  -H "Cookie: connect.sid=..."
```

---

## ⚙️ Error Responses

All errors follow standard HTTP status codes:

```json
{
  "error": "Error message here"
}
```

**Common Errors:**

| Code | Message | Cause |
|------|---------|-------|
| 400 | Bad Request | Missing/invalid fields |
| 401 | Unauthorized | Not authenticated or invalid token |
| 403 | Forbidden | Don't have permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

---

## 🔒 Security Notes

1. **Session-based Auth** - Automatically managed via cookies
2. **HTTPS** - Use in production
3. **CORS** - Configured for localhost (update for production)
4. **Rate Limiting** - Implement for production
5. **Input Validation** - All inputs validated on backend
6. **Password Hashing** - Using bcryptjs

---

## 📞 Support

For API issues:
1. Check server logs
2. Verify .env configuration
3. Test endpoints with provided curl examples
4. Check database connectivity

Happy coding! 🚀
