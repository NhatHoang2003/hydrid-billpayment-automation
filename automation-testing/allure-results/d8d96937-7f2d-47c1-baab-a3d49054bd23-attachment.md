# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\api\get-users.spec.ts >> GET /v1/users - List Users >> @regression @C038 @USER-GET-038 should find user by name keyword
- Location: tests\users\api\get-users.spec.ts:268:13

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```