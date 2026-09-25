# Kisan Mitra — IVRS Simulator

Standalone Interactive Voice Response (IVR) simulator for **Kisan Mitra**, an agricultural marketplace platform connecting farmers with mandis and buyers.

## Features

- Phone-call style UI with calling animation and live chat-bubble transcript
- Simulated voice flow:
  1. Language select (Hindi / English / Marathi / Punjabi)
  2. Crop select (Wheat / Onion / Rice / Cotton)
  3. Quantity input (quintals)
  4. Price comparison across 3 mandis + best buyer offer + active PriceAlert
  5. Accept / Reject → creates a new `Lot` object matching the shared data model
- Reference number on successful listing
- Design system: Primary green `#4A7C59`, earth brown `#8B6F47`, warm off-white background, Inter + Poppins fonts

> Production version integrates with a telecom IVR gateway (Twilio/Exotel).

## Run locally

```bash
# Any static server works
python3 -m http.server 8765
# Open http://localhost:8765
```

Or open `index.html` directly in a modern browser (React & Tailwind load via CDN).

## Tech stack

- React 18 (CDN)
- Tailwind CSS (CDN)
- Single-page, no backend — all mock data in `data.js`

## Shared data model

- **Mandi**: id, name, location, crop, price, priceHistory[7], lastUpdated
- **Farmer**: id, name, village, phone
- **Lot**: id, farmerId, crop, quantity, grade (A/B/C), status (listed/matched/pickedup/paid)
- **Buyer**: id, name, type, verified, rating, demand{crop, quantity}
- **Offer**: id, lotId, buyerId, price, status
- **Transaction**, **Grievance**, **PriceAlert**

## License

MIT
