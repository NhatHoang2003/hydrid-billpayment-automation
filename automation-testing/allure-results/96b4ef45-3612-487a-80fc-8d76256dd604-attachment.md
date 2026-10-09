# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\api\get-users.spec.ts >> GET /v1/users - List Users >> @regression @C009 @USER-GET-009 should return empty data for page just exceeding totalPages
- Location: tests\users\api\get-users.spec.ts:121:9

# Error details

```
TypeError: Cannot read properties of undefined (reading 'pagination')
```