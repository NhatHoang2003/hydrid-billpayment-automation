# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\api\get-users.spec.ts >> GET /v1/users - List Users >> @regression @C052 @USER-GET-052 ignore unknown params parameters gracefully
- Location: tests\users\api\get-users.spec.ts:423:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```