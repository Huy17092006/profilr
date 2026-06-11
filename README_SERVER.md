# 🚀 Profilr - Server Setup & Payment Integration

## 📋 Overview

This document explains how to set up the payment verification server for automatic payment confirmation.

## 🛠️ Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3000
NODE_ENV=development
APP_URL=http://localhost:3000
ADMIN_KEY=your_secure_key_here
```

### 3. Start Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:3000`

---

## 📡 API Endpoints

### 1️⃣ POST /api/verify-payment
**Create bio and initiate payment verification**

**Request:**
```json
{
  "username": "john_doe",
  "bioData": {
    "fullname": "John Doe",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "Hello! I'm John",
    "instagram": "@johndoe",
    "facebook": "johndoe",
    "tiktok": "@johndoe",
    "website": "https://johndoe.com"
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Bio đã được tạo, đang chờ xác thực thanh toán",
  "bioId": "john_doe_1699000000000",
  "bioLink": "http://localhost:3000/bio/john_doe"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Username này đã được sử dụng"
}
```

---

### 2️⃣ POST /api/check-payment-status
**Check if payment has been received**

**Request:**
```json
{
  "username": "john_doe",
  "transactionRef": "optional_transaction_id"
}
```

**Response (Payment Confirmed):**
```json
{
  "success": true,
  "message": "Thanh toán đã được xác nhận!",
  "paymentStatus": "confirmed",
  "bioLink": "http://localhost:3000/bio/john_doe"
}
```

**Response (Payment Pending):**
```json
{
  "success": false,
  "message": "Chưa nhận được thanh toán. Vui lòng kiểm tra lại.",
  "paymentStatus": "pending"
}
```

---

### 3️⃣ GET /api/bio/:username
**Get bio information (only if payment is confirmed)**

**Request:**
```
GET /api/bio/john_doe
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "username": "john_doe",
    "fullname": "John Doe",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "Hello! I'm John",
    "instagram": "@johndoe",
    "facebook": "johndoe",
    "tiktok": "@johndoe",
    "website": "https://johndoe.com",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Bio chưa được xác nhận thanh toán"
}
```

---

### 4️⃣ GET /api/bios
**Get all confirmed bios**

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "username": "john_doe",
      "fullname": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 5️⃣ POST /api/start-payment-polling
**Start payment polling (client-side)**

**Request:**
```json
{
  "username": "john_doe",
  "pollInterval": 5000,
  "maxAttempts": 120
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đã bắt đầu kiểm tra thanh toán",
  "pollInterval": 5000,
  "maxAttempts": 120
}
```

---

### 6️⃣ POST /api/manual-payment-confirmation
**Manually confirm payment (Admin only)**

**Request:**
```json
{
  "username": "john_doe",
  "adminKey": "your_secure_key_here"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thanh toán đã được xác nhận",
  "bioLink": "http://localhost:3000/bio/john_doe"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

## 💳 Payment Flow

```
1. User fills form and submits
   ↓
2. POST /api/verify-payment
   (Bio created with status: pending)
   ↓
3. Show QR Code & Payment Details
   ↓
4. User scans QR and transfers money
   ↓
5. Client polls POST /api/check-payment-status every 5 seconds
   ↓
6. When payment received, update status to "confirmed"
   ↓
7. Show success with bio link
   ↓
8. User can share/view bio
```

---

## 🔐 Security Notes

1. **Admin Key**: Change `ADMIN_KEY` in `.env` to a strong random string
2. **CORS**: Configure allowed origins in production
3. **Rate Limiting**: Add rate limiting middleware to prevent abuse
4. **Database**: Use persistent storage (MongoDB/PostgreSQL) instead of in-memory
5. **Payment Verification**: Implement real MB Bank API integration

---

## 🔗 Integration with Frontend

Update `payment-handler.js` to point to your server:

```javascript
const PAYMENT_CONFIG = {
    apiBaseUrl: 'https://your-server.com' // Change this
    // ... other config
};
```

---

## 🧪 Testing Payment Flow

### Test Locally
1. Start server: `npm run dev`
2. Update `payment-handler.js`:
   ```javascript
   apiBaseUrl: 'http://localhost:3000'
   ```
3. Open browser and test the form submission

### Test Payment Status Check
```bash
curl -X POST http://localhost:3000/api/check-payment-status \
  -H "Content-Type: application/json" \
  -d '{"username":"test_user"}'
```

### Manual Confirmation (Testing)
```bash
curl -X POST http://localhost:3000/api/manual-payment-confirmation \
  -H "Content-Type: application/json" \
  -d '{"username":"test_user","adminKey":"your_secure_key_here"}'
```

---

## 📊 Monitoring & Logging

Monitor server logs:
```bash
npm run dev
```

Key events logged:
- Bio creation
- Payment verification attempts
- Payment confirmations
- Errors

---

## 🚀 Deployment

### Deploy to Heroku

```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set ADMIN_KEY=your_secure_key
heroku config:set APP_URL=https://your-app-name.herokuapp.com

# Deploy
git push heroku main
```

### Deploy to Other Platforms

- **Vercel**: Use serverless functions
- **AWS Lambda**: Deploy as serverless function
- **DigitalOcean**: Use App Platform
- **Railway.app**: Simple deploy with `npm start`

---

## 🔄 Next Steps: Real Payment Integration

To integrate with real MB Bank payments:

1. **Option 1: VietQR Integration**
   - Use VietQR API to check transactions
   - Docs: https://vietqr.io

2. **Option 2: MB Bank API**
   - Request MB Bank API access
   - Integrate transaction checking

3. **Option 3: Payment Gateway**
   - Use Stripe, PayPal, or local payment providers
   - Simpler integration

4. **Database Integration**
   - Replace in-memory storage with MongoDB/PostgreSQL
   - Add user management
   - Add transaction history

---

## 📞 Support

For issues or questions, create an issue on GitHub or contact the developer.

---

**Made with ❤️ for Profilr**
