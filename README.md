# OrderFi

An order management system implementing secure wallet integration and real-time transaction tracking.

## Technical Overview

OrderFi is a digital platform for processing and managing blockchain-based orders with real-time status updates.

### Core Stack

- Next.js 15 with TypeScript and App Router
- Web3 Integration: RainbowKit + wagmi
- State Management and Data Fetching: Zustand & TanStack Query
- UI Framework: Tailwind CSS
- Network Layer: Axios

### Key Features

#### Order Management System

- Real-time order creation and processing
- Status tracking with live updates
- Timeout handling and retry mechanisms
- Comprehensive order history

#### Blockchain Integration

- Secure multi-wallet support
- Transaction state management
- Chain-specific configurations

#### Status Monitoring

- Real-time polling system
- Webhook integration
- Status verification
- Timeout management

## Development Setup

### Prerequisites

```bash
Node.js >= 18.0
npm >= 9.0
```

### Installation

```bash
git clone https://github.com/yourusername/order-fi.git
cd order-fi
npm install
```

### Environment Configuration

```bash
cp .env.example .env.local
```

Required variables:

```env
NEXT_PUBLIC_PROJECT_ID=<your-project-id>
WEBHOOK_SECRET=<your-webhook-secret>
```

### Development Commands

```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Production server
```

## Project Architecture

```
order-fi/
├── app/                # Application router
│   ├── api/           # API endpoints
│   └── layout.tsx     # Root layout
├── components/
│   ├── order/        # Order components
│   └── ui/           # UI components
├── lib/
│   ├── db/          # Data layer
│   ├── hooks/       # React hooks
│   ├── providers/   # Context providers
│   ├── server/      # Server utilities
│   ├── stores/      # State management
│   └── types/       # TypeScript types
└── public/          # Static assets
```

## API Documentation

### Order Creation

```typescript
POST /api/mock/orders/create
Content-Type: application/json

{
  "amount": number,
  "currency": string,
  "token": string,
  "note": string?
}
```

### Order Status

```typescript
GET /api/mock/orders/:orderId
```

### Webhook Handler

```typescript
POST /api/webhooks/elementpay
X-Webhook-Signature: t=<timestamp>,v1=<signature>
```

## Testing Webhooks

Valid webhook request:

```bash
curl -X POST http://localhost:3000/api/webhooks/elementpay \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: t=1710000000,v1=3QXTcQv0m0h4QkQ0L0w9ZsH1YFhZgMGnF0d9Xz4P7nQ=" \
  -d '{"type":"order.settled","data":{"order_id":"ord_0xabc123","status":"settled"}}'
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## License

MIT © [Rahmannugar]

## Support

For technical support or feature requests, please [open an issue](https://github.com/yourusername/order-fi/issues).
