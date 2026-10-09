# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\api\get-users.spec.ts >> GET /v1/users - List Users >> @regression @C004 @USER-GET-004 should get users with page and limit
- Location: tests\users\api\get-users.spec.ts:10:13

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```