# OrderFi

A decentralized order management system built on Web3 technology, providing real-time transaction tracking and secure wallet integration.

## Overview

OrderFi enables secure order creation and management with live status updates through blockchain integration.

## Core Technologies

- Next.js 15 / TypeScript
- RainbowKit / Wagmi
- TanStack Query
- Zustand
- Tailwind CSS
- Axios

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

```bash
git clone https://github.com/Rahmannugar/order-fi.git
cd order-fi
npm install
```

### Configuration

1. Copy the environment template:

```bash
cp .env.example .env.local
```

2. Configure required variables:

```env
NEXT_PUBLIC_PROJECT_ID=your_rainbowkit_project_id
WEBHOOK_SECRET=your_webhook_secret
```

### Development

```bash
npm run dev     # Start development server
npm run build   # Create production build
npm run start   # Run production server
```

## Architecture

```
order-fi/
├── app/                  # Application router
├── components/
│   ├── order/           # Order components
│   └── ui/              # UI components
├── lib/
│   ├── db/             # Data layer
│   ├── hooks/          # React hooks
│   ├── providers/      # Context providers
│   ├── server/         # Server utilities
│   ├── stores/         # State management
│   └── types/          # TypeScript definitions
└── public/             # Static assets
```

## Core Features

### Order Management

- Transaction creation and processing
- Real-time status tracking
- Automatic retry mechanism
- Order history

### Wallet Integration

- Multi-wallet support
- Secure transaction handling
- Connection state management

### Status Tracking

- Real-time polling
- Status indicators
- Timeout handling
- Webhook integration

## Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/enhancement`)
3. Commit changes (`git commit -am 'Add enhancement'`)
4. Push branch (`git push origin feature/enhancement`)
5. Create Pull Request

## License

MIT © [Your Name]

## Support

For support inquiries, please [open an issue](https://github.com/Rahmannugar/order-fi/issues).
