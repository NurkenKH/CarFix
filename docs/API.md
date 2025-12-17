# API Specification
## CarFix Studio - API Documentation

**Base URL (Production)**: `https://carfix-studio.netlify.app/`  
**Base URL (Development)**: `http://localhost:8080`

---

## Authentication

All authenticated endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

Tokens are obtained via Supabase Auth and stored in localStorage after successful login.

---

## 1. Authentication Endpoints

### 1.1 User Registration

**Endpoint**: `/auth/v1/signup`  
**Method**: `POST`  
**Purpose**: Create a new user account  
**Authentication**: None required

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "options": {
    "data": {
      "full_name": "John Doe"
    }
  }
}
```

**Success Response** (200 OK):
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "email_confirmed_at": null,
    "created_at": "2025-12-17T10:30:00.000Z",
    "user_metadata": {
      "full_name": "John Doe"
    }
  },
  "session": null
}
```

**Error Responses**:
- `400 Bad Request`: Invalid email format or weak password
```json
{
  "error": "Password should be at least 8 characters"
}
```

- `409 Conflict`: Email already registered
```json
{
  "error": "User already registered"
}
```

---

### 1.2 User Login

**Endpoint**: `/auth/v1/token?grant_type=password`  
**Method**: `POST`  
**Purpose**: Authenticate user and obtain JWT token  
**Authentication**: None required

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Success Response** (200 OK):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "expires_at": 1734440000,
  "refresh_token": "v1.Mjt7InVz...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "email_confirmed_at": "2025-12-17T10:35:00.000Z",
    "created_at": "2025-12-17T10:30:00.000Z"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid credentials
```json
{
  "error": "Invalid login credentials"
}
```

- `401 Unauthorized`: Email not confirmed
```json
{
  "error": "Email not confirmed"
}
```

---

### 1.3 Get Current User

**Endpoint**: `/auth/v1/user`  
**Method**: `GET`  
**Purpose**: Retrieve authenticated user's information  
**Authentication**: Required (JWT token)

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response** (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "email_confirmed_at": "2025-12-17T10:35:00.000Z",
  "phone": null,
  "created_at": "2025-12-17T10:30:00.000Z",
  "updated_at": "2025-12-17T11:00:00.000Z",
  "user_metadata": {
    "full_name": "John Doe"
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired token
```json
{
  "error": "JWT expired"
}
```

---

### 1.4 User Logout

**Endpoint**: `/auth/v1/logout`  
**Method**: `POST`  
**Purpose**: Invalidate user session  
**Authentication**: Required (JWT token)

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response** (204 No Content):
```
(Empty response body)
```

---

## 2. Edge Functions

### 2.1 AI Assistant

**Endpoint**: `/functions/v1/ai-assistant`  
**Method**: `POST`  
**Purpose**: Send message to AI assistant and receive car-related advice  
**Authentication**: Optional (anon key sufficient for MVP)

**Request Headers**:
```
Content-Type: application/json
Authorization: Bearer <SUPABASE_ANON_KEY>
```

**Request Body**:
```json
{
  "message": "How do I change a side mirror on a Toyota Corolla?",
  "context": {
    "car_model": "Toyota Corolla 2020",
    "user_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**Success Response** (200 OK):
```json
{
  "response": "To change a side mirror on a Toyota Corolla:\n\n1. Remove the interior door panel\n2. Disconnect the electrical connector\n3. Remove the three mounting bolts\n4. Carefully remove the old mirror\n5. Install the new mirror in reverse order\n\nEstimated time: 30-45 minutes. Difficulty: Moderate.\n\nYou can purchase a replacement mirror on Kolesa.kz for approximately 45,000 KZT.",
  "timestamp": "2025-12-17T12:00:00.000Z",
  "model": "gpt-4" 
}
```

**Error Responses**:
- `400 Bad Request`: Missing message field
```json
{
  "error": "Message field is required"
}
```

- `500 Internal Server Error`: AI service unavailable
```json
{
  "error": "AI service temporarily unavailable"
}
```

---

## 3. Database REST API (Supabase Auto-generated)

### 3.1 Get User Configurations (Future Feature)

**Endpoint**: `/rest/v1/saved_configurations`  
**Method**: `GET`  
**Purpose**: Retrieve user's saved car configurations  
**Authentication**: Required (JWT token)

**Query Parameters**:
- `user_id=eq.<user_id>` - Filter by user ID
- `select=*` - Fields to return

**Request URL**:
```
GET /rest/v1/saved_configurations?user_id=eq.550e8400-e29b-41d4-a716-446655440000&select=*
```

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
apikey: <SUPABASE_ANON_KEY>
```

**Success Response** (200 OK):
```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "car_model": "Toyota Corolla 2020",
    "configuration_data": {
      "parts": [
        { "id": "mirror", "name": "Side Mirror", "price": 45000 },
        { "id": "windshield", "name": "Front Windshield", "price": 125000 }
      ],
      "total_price": 170000
    },
    "created_at": "2025-12-17T10:00:00.000Z",
    "updated_at": "2025-12-17T10:00:00.000Z"
  }
]
```

**Error Responses**:
- `401 Unauthorized`: Invalid token or RLS policy violation
```json
{
  "message": "JWT expired",
  "code": "PGRST301"
}
```

---

### 3.2 Create Configuration (Future Feature)

**Endpoint**: `/rest/v1/saved_configurations`  
**Method**: `POST`  
**Purpose**: Save a new car configuration  
**Authentication**: Required (JWT token)

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
apikey: <SUPABASE_ANON_KEY>
Content-Type: application/json
Prefer: return=representation
```

**Request Body**:
```json
{
  "car_model": "Toyota Corolla 2020",
  "configuration_data": {
    "parts": [
      { "id": "mirror", "name": "Side Mirror", "price": 45000 },
      { "id": "windshield", "name": "Front Windshield", "price": 125000 }
    ],
    "total_price": 170000
  }
}
```

**Success Response** (201 Created):
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "car_model": "Toyota Corolla 2020",
    "configuration_data": {
      "parts": [
        { "id": "mirror", "name": "Side Mirror", "price": 45000 },
        { "id": "windshield", "name": "Front Windshield", "price": 125000 }
      ],
      "total_price": 170000
    },
    "created_at": "2025-12-17T12:30:00.000Z",
    "updated_at": "2025-12-17T12:30:00.000Z"
  }
]
```

**Error Responses**:
- `400 Bad Request`: Invalid data format
```json
{
  "message": "Invalid input syntax for type json",
  "code": "22P02"
}
```

---

### 3.3 Update Configuration (Future Feature)

**Endpoint**: `/rest/v1/saved_configurations?id=eq.<config_id>`  
**Method**: `PATCH`  
**Purpose**: Update existing configuration  
**Authentication**: Required (JWT token, must own config)

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
apikey: <SUPABASE_ANON_KEY>
Content-Type: application/json
Prefer: return=representation
```

**Request Body**:
```json
{
  "configuration_data": {
    "parts": [
      { "id": "mirror", "name": "Side Mirror", "price": 45000 },
      { "id": "windshield", "name": "Front Windshield", "price": 125000 },
      { "id": "door_panel", "name": "Left Body Panel Door", "price": 165000 }
    ],
    "total_price": 335000
  }
}
```

**Success Response** (200 OK):
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "car_model": "Toyota Corolla 2020",
    "configuration_data": {
      "parts": [
        { "id": "mirror", "name": "Side Mirror", "price": 45000 },
        { "id": "windshield", "name": "Front Windshield", "price": 125000 },
        { "id": "door_panel", "name": "Left Body Panel Door", "price": 165000 }
      ],
      "total_price": 335000
    },
    "created_at": "2025-12-17T12:30:00.000Z",
    "updated_at": "2025-12-17T13:00:00.000Z"
  }
]
```

---

### 3.4 Delete Configuration (Future Feature)

**Endpoint**: `/rest/v1/saved_configurations?id=eq.<config_id>`  
**Method**: `DELETE`  
**Purpose**: Remove a saved configuration  
**Authentication**: Required (JWT token, must own config)

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
apikey: <SUPABASE_ANON_KEY>
```

**Success Response** (204 No Content):
```
(Empty response body)
```

**Error Responses**:
- `404 Not Found`: Configuration doesn't exist
```json
{
  "message": "No rows found",
  "code": "PGRST116"
}
```

---

## 4. External APIs (Third-Party)

### 4.1 Overpass API (OpenStreetMap)

**Endpoint**: `https://overpass-api.de/api/interpreter`  
**Method**: `POST` or `GET`  
**Purpose**: Query nearby auto service centers  
**Authentication**: None required

**Request (GET with URL encoding)**:
```
GET https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node["shop"="car_repair"](around:5000,43.238949,76.945465);node["amenity"="car_repair"](around:5000,43.238949,76.945465););out%20center;
```

**Response** (200 OK):
```json
{
  "version": 0.6,
  "generator": "Overpass API",
  "elements": [
    {
      "type": "node",
      "id": 123456789,
      "lat": 43.2401,
      "lon": 76.9489,
      "tags": {
        "name": "AutoMaster STO",
        "shop": "car_repair",
        "addr:street": "Abay Avenue",
        "addr:housenumber": "150",
        "phone": "+7 727 123 4567",
        "opening_hours": "Mo-Sa 09:00-18:00"
      }
    },
    {
      "type": "way",
      "id": 987654321,
      "center": {
        "lat": 43.2355,
        "lon": 76.9521
      },
      "tags": {
        "name": "СТО Garage",
        "amenity": "car_repair",
        "phone": "+7 727 987 6543"
      }
    }
  ]
}
```

**Rate Limits**: ~10,000 queries/day per IP

---

### 4.2 Kolesa.kz (External Marketplace)

**Integration Type**: Direct hyperlinks (no API)

**Example URLs**:
- Engine parts: `https://kolesa.kz/a/show/181374114`
- Transmission: `https://kolesa.kz/a/show/201653716`
- Wheels: `https://kolesa.kz/zapchasti/shiny/almaty/`
- Side Mirror: `https://kolesa.kz/zapchasti/prodazha/toyota/corolla/?_txt_=зеркало`

**Future**: Potential API partnership for:
- Real-time pricing updates
- Stock availability
- Affiliate commission tracking

---

### 4.3 YouTube Data API (Future Integration)

**Purpose**: Embed tutorial videos, track view counts

**Current**: Direct video links (no API calls)

**Future Endpoint**: `https://www.googleapis.com/youtube/v3/videos`

**Example Response**:
```json
{
  "items": [
    {
      "id": "4vZlf69OfXM",
      "snippet": {
        "title": "How to Replace Car Engine Parts",
        "description": "Step-by-step guide...",
        "thumbnails": {
          "high": {
            "url": "https://i.ytimg.com/vi/4vZlf69OfXM/hqdefault.jpg"
          }
        }
      },
      "statistics": {
        "viewCount": "123456"
      }
    }
  ]
}
```

---

## 5. Error Handling

### Standard Error Response Format
```json
{
  "error": "Error message description",
  "code": "ERROR_CODE",
  "details": {
    "field": "email",
    "issue": "Invalid format"
  },
  "timestamp": "2025-12-17T12:00:00.000Z"
}
```

### Common HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PATCH, PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource (e.g., email already exists) |
| 422 | Unprocessable Entity | Valid JSON but semantic errors |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | Temporary outage |

---

## 6. Rate Limiting

### Supabase Auth
- 30 requests per hour per IP for unauthenticated endpoints
- 100 requests per minute for authenticated endpoints

### Edge Functions
- 500,000 invocations per month (free tier)
- ~16,666 invocations per day

### Overpass API
- ~10,000 queries per day per IP
- Recommended: 1 query per second max

---

## 7. Webhooks (Future Feature)

### Order Confirmation Webhook (Future)
**Endpoint**: `https://your-domain.com/webhooks/order-confirmation`  
**Method**: `POST`  
**Triggered By**: Kolesa.kz (if API partnership established)

**Payload**:
```json
{
  "event": "order.confirmed",
  "order_id": "ORD-123456",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "items": [
    {
      "part_id": "mirror",
      "quantity": 1,
      "price": 45000
    }
  ],
  "total": 45000,
  "timestamp": "2025-12-17T14:00:00.000Z"
}
```

**Prepared by**: Nurken (Developer)  
**Status**: MVP Implementation Complete
