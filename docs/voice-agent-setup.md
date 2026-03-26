# Voice Agent Setup Guide

## Overview

This guide covers setting up a voice ordering agent for Jumbo Pizza using VAPI or Bland.ai.

---

## Option A: VAPI (vapi.ai)

### 1. Create VAPI Account
- Sign up at https://vapi.ai
- Get your API key from the dashboard

### 2. Create an Assistant
- Go to Assistants > Create New
- Set the system prompt from `/docs/voice-agent-prompt.md`
- Configure voice: use a warm, friendly voice (e.g., "alloy" or "nova" on OpenAI)

### 3. Configure the Phone Number
- Purchase a phone number in VAPI dashboard
- Assign the assistant to that number
- Forward calls from 613-446-1291 to this VAPI number (or replace it)

### 4. Set Up Webhook
- In VAPI dashboard, set the "end of call" webhook to:
  `POST https://your-domain.com/api/voice-webhook`
- The webhook receives the transcribed order details

### 5. Environment Variables
```env
VAPI_API_KEY=your_vapi_api_key
VAPI_PHONE_NUMBER=+1xxxxxxxxxx
```

### 6. Test
- Call the VAPI number
- Verify orders arrive at `/api/voice-webhook`

---

## Option B: Bland.ai

### 1. Create Bland.ai Account
- Sign up at https://bland.ai
- Get your API key

### 2. Create a Phone Agent
```bash
curl -X POST https://api.bland.ai/v1/agents \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jumbo Pizza Order Agent",
    "system_prompt": "<content from voice-agent-prompt.md>",
    "voice": "calm_lady",
    "language": "en"
  }'
```

### 3. Buy a Phone Number
```bash
curl -X POST https://api.bland.ai/v1/inbound \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"area_code": "613", "agent_id": "YOUR_AGENT_ID"}'
```

### 4. Configure Webhook
In the Bland.ai dashboard, set webhook URL:
`POST https://your-domain.com/api/voice-webhook`

### 5. Environment Variables
```env
BLAND_API_KEY=your_bland_api_key
```

---

## Webhook Payload

The `/api/voice-webhook` endpoint expects:
```json
{
  "callId": "string",
  "customerPhone": "string",
  "transcript": "string",
  "parsedOrder": {
    "items": [],
    "orderType": "pickup | delivery",
    "customerName": "string",
    "phone": "string",
    "address": "string (if delivery)"
  }
}
```

## Production Integration

For production, update `/app/api/voice-webhook/route.ts` to:
1. Parse the voice order payload
2. Save to your database (Supabase recommended)
3. Send confirmation SMS to the customer
4. Notify kitchen/staff via notification system
5. Return order ID for tracking

## Security

- Validate webhook signatures in production
- Rate limit the webhook endpoint
- Store API keys in environment variables, never in code
