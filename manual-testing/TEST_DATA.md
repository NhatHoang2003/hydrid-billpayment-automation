# Bill Payment API – Test Data Management

**Project:** Bill Payment API Automation  
**Document:** Test Data Management  
**Testing Approach:** Hybrid Manual and Automation Testing  
**Manual Testing Tool:** Postman  
**Automation Framework:** Playwright + TypeScript + Axios + Zod  
**Test Management:** Jira + Google Sheets  
**Document Status:** In Progress

---

## 1. Introduction

This document defines the test data management approach for the
Bill Payment API testing project.

It describes how test data is identified, prepared, generated,
maintained, protected, and cleaned up during manual and automated
API testing.

Test data is used to validate API functionality, request validation,
boundary conditions, error handling, and response behavior.

Detailed test scenarios and expected results are maintained in
Google Sheets. This document focuses on test data management
principles, representative data sets, and operational procedures.

## 2. Objectives

The objectives of test data management are to:

- Provide valid and invalid data for API test execution.
- Support positive, negative, boundary, and validation testing.
- Maintain consistency between manual and automated tests.
- Reduce dependencies on hardcoded test data.
- Prevent unintended modification of shared test records.
- Support repeatable and independent test execution.
- Minimize duplicate data conflicts.
- Protect authentication credentials and sensitive information.
- Ensure test data can be traced to related test cases.
- Define cleanup procedures for test-created resources.

## 3. Scope

### 3.1 In-Scope Modules

| Module          | Status      | Test Data Coverage                         |
| --------------- | ----------- | ------------------------------------------ |
| Authentication  | In Progress | OAuth credentials, grants, tokens, errors  |
| Users           | In Progress | User CRUD, pagination, filtering, search   |
| Billers         | Planned     | TBD                                        |
| Bills           | Planned     | TBD                                        |
| Payments        | Planned     | TBD                                        |
| Payment Methods | Planned     | TBD                                        |

The Authentication and Users modules are the current focus.

Test data requirements for planned modules will be defined
when their test design activities begin.

### 3.2 Out-of-Scope Areas

The following API areas are excluded from the current test scope:

- Files
- HTTP QUERY
- Jobs
- Bulk Operations
- Webhooks
- Simulation

The following Users sub-resource endpoints are also excluded:

- `GET /v1/users/{id}/bills`
- `GET /v1/users/{id}/payment-methods`
- `GET /v1/users/{id}/transactions`
- `POST /v1/users/{id}/verify-kyc`

## 4. Test Data Categories

### 4.1 Data Classification

| Category      | Description                                  | Example                      |
| ------------- | -------------------------------------------- | ---------------------------- |
| Valid         | Data satisfying API requirements             | Valid email address          |
| Invalid       | Data violating API requirements              | Invalid email format         |
| Boundary      | Data at or around documented limits          | `limit = 100`, `limit = 101` |
| Missing       | Required field or parameter omitted          | Missing `grant_type`         |
| Null          | Field explicitly assigned `null`             | `firstName: null`            |
| Empty         | Empty string, object, or request body        | `firstName: ""`              |
| Duplicate     | Data already existing in the system          | Existing email address       |
| Non-existing  | Identifier not associated with a resource    | Unknown user ID              |
| Malformed     | Incorrect request syntax or representation   | Invalid JSON syntax          |
| Unauthorized  | Request with missing or invalid credentials  | Invalid access token         |

### 4.2 Test Data Selection Principles

Test data should be selected according to:

1. API specification requirements.
2. Input field constraints.
3. Test scenario objectives.
4. Positive and negative test conditions.
5. Boundary values.
6. Expected response status codes.
7. Existing test environment limitations.

Expected results must be based on documented requirements
or confirmed acceptance criteria.

Observed backend behavior must not automatically replace
the expected result of a test case.

## 5. Authentication Test Data

### 5.1 Module Overview

**Module:** Authentication

**Endpoint:** `POST /oauth/token`

**Supported Grant Types in Test Scope:**

- `client_credentials`
- `password`
- `refresh_token`

Authentication test data covers valid requests, invalid
credentials, missing parameters, unsupported grant types,
content-type validation, and token response validation.

### 5.2 Client Credentials Grant

| Field           | Valid Data Source        | Invalid Data Example |
| --------------- | ------------------------ | -------------------- |
| `grant_type`    | `client_credentials`     | `unsupported_grant`  |
| `client_id`     | Environment variable     | `invalid-client`     |
| `client_secret` | Secure environment value | `invalid-secret`     |

#### Example Request Structure

```json
{
  "grant_type": "client_credentials",
  "client_id": "{{client_id}}",
  "client_secret": "{{client_secret}}"
}
```

The values above are placeholders, not actual credentials.

#### Test Data Scenarios

- Valid client ID and client secret.
- Invalid client ID.
- Invalid client secret.
- Missing client ID.
- Missing client secret.
- Missing grant type.
- Unsupported grant type.
- Empty request body.
- Unsupported content type.

### 5.3 Password Grant

| Field           | Valid Data Source        | Invalid Data Example |
| --------------- | ------------------------ | -------------------- |
| `grant_type`    | `password`               | `invalid_grant`      |
| `client_id`     | Environment variable     | `invalid-client`     |
| `client_secret` | Secure environment value | `invalid-secret`     |
| `username`      | Test account             | `unknown-user`       |
| `password`      | Secure environment value | `invalid-password`   |

#### Client Credentials Test Data Scenarios

```json
{
  "grant_type": "password",
  "client_id": "{{client_id}}",
  "client_secret": "{{client_secret}}",
  "username": "{{username}}",
  "password": "{{password}}"
}
```

#### Password Grant Request Structure

- Valid username and password.
- Invalid username.
- Invalid password.
- Missing username.
- Missing password.
- Empty username.
- Empty password.
- Invalid client credentials.

The final scenario coverage must match the approved
Authentication test cases in Google Sheets.

### 5.4 Refresh Token Grant

| Field           | Data Source              | Description               |
| --------------- | ------------------------ | ------------------------- |
| `grant_type`    | `refresh_token`          | OAuth grant type          |
| `client_id`     | Environment variable     | Client identifier         |
| `client_secret` | Secure environment value | Client secret             |
| `refresh_token` | Authentication response  | Token used for refresh    |

#### Password Grant Test Data Scenarios

```json
{
  "grant_type": "refresh_token",
  "client_id": "{{client_id}}",
  "client_secret": "{{client_secret}}",
  "refresh_token": "{{refresh_token}}"
}
```

#### Refresh Token Request Structure

- Valid refresh token.
- Invalid refresh token.
- Missing refresh token.
- Empty refresh token.
- Malformed refresh token.

Refresh tokens should be obtained from supported
authentication flows.

Tests must not assume that every token response
contains a refresh token.

If the required refresh token cannot be obtained,
the test should report an appropriate blocked or
setup-failure condition rather than using fabricated data.

### 5.5 Authentication Response Data

The following response fields are relevant to token
response validation:

| Field           | Expected Data Type | Validation Purpose       |
| --------------- | ------------------ | ------------------------ |
| `access_token`  | String             | Token presence and type  |
| `token_type`    | String             | Token type validation    |
| `expires_in`    | Number             | Expiration metadata      |
| `refresh_token` | String, optional   | Refresh token validation |
| `scope`         | String             | Granted scope validation |

Response fields should be validated against the
applicable Zod schema.

Actual access tokens and refresh tokens must not
be recorded in public documentation.

## 6. Users Test Data

### 6.1 Module Overview

**Module:** Users

**In-Scope Endpoints:**

- `GET /v1/users`
- `POST /v1/users`
- `GET /v1/users/{id}`
- `PUT /v1/users/{id}`
- `PATCH /v1/users/{id}`
- `DELETE /v1/users/{id}`

Test data must support user creation, retrieval,
updates, deletion, pagination, filtering, and search.

### 6.2 User Data Model

The following fields are relevant to Users API testing:

| Field        | Data Type | Test Data Considerations      |
| ------------ | --------- | ----------------------------- |
| `id`         | String    | Existing and non-existing IDs |
| `email`      | String    | Valid, invalid, duplicate     |
| `phone`      | String    | Valid and invalid values      |
| `firstName`  | String    | Valid, missing, empty, type   |
| `lastName`   | String    | Valid, missing, empty, type   |
| `kycStatus`  | Enum      | Pending, verified, rejected   |
| `address`    | Object    | Valid and invalid structure   |
| `createdAt`  | String    | Response timestamp validation |
| `updatedAt`  | String    | Response timestamp validation |

Not all response fields are necessarily accepted
as writable request fields.

Request data must follow the relevant endpoint schema.

### 6.3 Create User – Valid Test Data

#### Example Request

```json
{
  "email": "qa.user@example.com",
  "firstName": "QA",
  "lastName": "Tester",
  "phone": "+84900000000",
  "address": {
    "line1": "Test Street",
    "city": "Test City",
    "state": "Test State",
    "postalCode": "700000",
    "country": "VN"
  }
}
```

This is a representative example, not a guaranteed
valid payload for every environment.

The request must be adjusted to match the confirmed
API specification and test case requirements.

For automated execution, a unique email should be
generated for each test that creates a new user.

### 6.4 Create User – Negative Test Data

| Scenario              | Field       | Example Value          |
| --------------------- | ----------- | ---------------------- |
| Missing email         | `email`     | Omitted                |
| Invalid email format  | `email`     | `invalid-email`        |
| Duplicate email       | `email`     | Existing test email    |
| Empty first name      | `firstName` | `""`                   |
| Invalid first name    | `firstName` | `123`                  |
| Null first name       | `firstName` | `null`                 |
| Invalid phone         | `phone`     | `invalid-phone`        |
| Invalid address       | `address`   | `"invalid-address"`    |
| Malformed JSON        | Body        | Invalid JSON syntax    |

Each expected status code must be defined in
the corresponding test case.

Actual results may differ due to backend defects
or environment instability.

### 6.5 List Users – Pagination Data

**Endpoint:** `GET /v1/users`

| Parameter | Test Data | Purpose                       |
| --------- | --------- | ----------------------------- |
| `page`    | Omitted   | Default pagination            |
| `page`    | `1`       | Minimum valid page            |
| `page`    | `75`      | Middle-page scenario          |
| `page`    | `0`       | Invalid lower boundary        |
| `page`    | `-1`      | Negative page validation      |
| `page`    | `1.5`     | Non-integer validation        |
| `limit`   | Omitted   | Default page size             |
| `limit`   | `1`       | Minimum positive limit        |
| `limit`   | `100`     | Documented maximum limit      |
| `limit`   | `101`     | Above maximum boundary        |

Page availability depends on the current number
of users in the test environment.

Tests must not assume a fixed total user count
unless the environment uses a controlled dataset.

### 6.6 List Users – KYC Status Data

**Parameter:** `kyc_status`

| Category | Test Value  |
| -------- | ----------- |
| Valid    | `pending`   |
| Valid    | `verified`  |
| Valid    | `rejected`  |
| Invalid  | `approved`  |
| Missing  | Omitted     |
| Empty    | `""`        |

Expected filtering behavior must be confirmed
against the API specification.

### 6.7 List Users – Search Data

**Parameter:** `search`

| Scenario             | Test Data Source              |
| -------------------- | ----------------------------- |
| Search by email      | Existing test user's email    |
| Search by first name | Existing test user's name     |
| Search by last name  | Existing test user's surname  |
| Search by phone      | Existing test user's phone    |
| No matching results  | Unique non-existing value     |
| Empty search         | Empty string                  |

Search data should preferably be obtained from
controlled test records.

Tests should not rely on unknown production users
or arbitrary records that may change.

### 6.8 Get User by ID

**Endpoint:** `GET /v1/users/{id}`

Required data categories:

- Existing user ID.
- Non-existing user ID.
- Invalid user ID format.
- Missing or empty ID where applicable.

An existing user ID may be obtained from
a successful create-user operation.

### 6.9 Update User

**Endpoint:** `PUT /v1/users/{id}`

Required data categories:

- Existing user ID with valid update payload.
- Existing user ID with invalid update payload.
- Non-existing user ID.
- Missing required update fields, where applicable.
- Invalid field data types.

The test must verify that the resulting user data
matches the documented update behavior.

### 6.10 Partial Update User

**Endpoint:** `PATCH /v1/users/{id}`

Required data categories:

- Existing user ID.
- One valid updatable field.
- Multiple valid updatable fields.
- Invalid field type.
- Non-existing user ID.
- Empty update payload, where applicable.

Tests must distinguish full-update behavior
from partial-update behavior.

### 6.11 Delete User

**Endpoint:** `DELETE /v1/users/{id}`

Required data categories:

- Existing test-created user ID.
- Non-existing user ID.
- Invalid user ID format.

Deletion tests should use disposable test records.

Shared or manually maintained reference users
must not be deleted.

## 7. Test Data Preparation

### 7.1 Preparation Workflow

1. Review the related requirement and test case.
2. Identify the required data category.
3. Determine whether the data must already exist.
4. Create or retrieve the required test data.
5. Confirm the data meets the test preconditions.
6. Execute the API test.
7. Record the result.
8. Clean up temporary resources where appropriate.

### 7.2 Prerequisite Data

Some tests depend on resources created by other API operations.

Examples:

- Get User requires an existing user ID.
- Update User requires an existing user ID.
- Delete User requires an existing disposable user.
- Refresh Token requires a valid refresh token.

Where possible, tests should create their own
prerequisite data during setup.

### 7.3 Test Data Independence

Each automated test should be independently executable.

Avoid relying on:

- The execution order of unrelated tests.
- A user created by a previous test case.
- A fixed database record that may be deleted.
- A hardcoded user count.
- A refresh token that may expire.

Shared fixtures may be used when they are
explicitly designed for safe reuse.

## 8. Test Data Management

### 8.1 Static Test Data

Static test data includes values that do not
require runtime generation.

Examples:

- Invalid grant types.
- Invalid field data types.
- Boundary parameter values.
- Invalid KYC status values.
- Missing-field scenarios.

Static data may be stored in dedicated
TypeScript test data files.

### 8.2 Dynamic Test Data

Dynamic data is generated or retrieved
during test execution.

Examples:

- Unique email addresses.
- Newly created user IDs.
- Access tokens.
- Refresh tokens.
- Temporary test users.

Dynamic data should be managed by test
fixtures, setup hooks, or helper functions.

### 8.3 Unique Data Generation

Automated create-user tests should use unique
values to reduce duplicate conflicts.

Example TypeScript helper:

```typescript
export function generateUniqueEmail(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 10);

  return `qa.${timestamp}.${random}@example.com`;
}
```

The generated email must still satisfy
the documented API validation rules.

### 8.4 Test Data Cleanup

Cleanup should be performed for resources
created exclusively for testing.

Recommended cleanup procedure:

1. Capture the created resource ID.
2. Execute the test scenario.
3. Delete the temporary resource when supported.
4. Record cleanup failures.
5. Avoid deleting shared test records.

Cleanup failures should be visible in test results
and must not be silently ignored.

## 9. Manual Testing Data – Postman

### 9.1 Postman Environment Variables

The following variables may be used:

| Variable       | Purpose                     | Handling          |
| -------------- | --------------------------- | ----------------- |
| `base_url`     | API base URL                | Environment       |
| `client_id`    | OAuth client identifier     | Restricted value  |
| `client_secret`| OAuth client secret         | Secret value      |
| `username`     | Test account username       | Restricted value  |
| `password`     | Test account password       | Secret value      |
| `access_token` | Current access token        | Secret value      |
| `refresh_token`| Current refresh token       | Secret value      |
| `user_id`      | Existing test user ID       | Environment       |

### 9.2 Example Postman Request

```json
{
  "grant_type": "client_credentials",
  "client_id": "{{client_id}}",
  "client_secret": "{{client_secret}}"
}
```

### 9.3 Manual Test Data Procedure

1. Select the correct Postman environment.
2. Verify the API base URL.
3. Confirm required environment variables.
4. Prepare the test data for the selected scenario.
5. Send the API request.
6. Compare the actual result with the expected result.
7. Record the execution result in Google Sheets.
8. Create a Jira Bug if a confirmed defect is identified.
9. Perform cleanup if the scenario creates temporary data.

### 9.4 Manual Test Data Restrictions

- Do not share Postman environments containing secrets.
- Do not commit exported credentials to GitHub.
- Do not reuse disposable records for unrelated tests.
- Do not overwrite shared reference data.
- Do not record full authentication tokens in test evidence.

## 10. Automation Testing Data – Playwright

### 10.1 Framework Components

The automation framework uses:

- Playwright Test
- TypeScript
- Axios-based API clients
- Zod response schemas
- Custom API fixtures
- Test data generators
- Allure and Playwright HTML reports

### 10.2 Test Data Organization

Test data should be separated from
test execution logic where practical.

Example logical structure:

```text
src/
├── clients/
├── fixtures/
├── schemas/
└── utils/

tests/
├── auth/
│   └── api/
└── users/
    └── api/
```

Actual test data file locations must follow
the repository's existing structure.

### 10.3 Data-Driven Testing

Data-driven testing may be used for:

- Pagination parameter validation.
- Limit boundary testing.
- KYC status filtering.
- Search parameter validation.
- OAuth invalid credential scenarios.
- Required-field validation.

Example:

```typescript
const pageCases = [
  {
    name: "minimum valid page",
    params: { page: 1 },
    expectedStatus: 200,
  },
  {
    name: "invalid zero page",
    params: { page: 0 },
    expectedStatus: 400,
  },
];
```

The expected status codes in test data
must be based on the approved requirements.

If the backend returns an unexpected status,
the test should report the discrepancy rather
than automatically changing the expected result.

### 10.4 Test Data and Assertions

Test data files should define inputs
and expected outcomes.

Test scripts should:

1. Execute the API request.
2. Assert the HTTP status code.
3. Validate the response schema.
4. Assert scenario-specific business behavior.
5. Record failures in the test report.

Dynamic totals and pagination values should
not be hardcoded when the underlying dataset
is uncontrolled.

### 10.5 Test Data and Fixtures

Fixtures may be responsible for:

- Initializing API clients.
- Providing authentication context.
- Preparing prerequisite resources.
- Supplying reusable test utilities.

Tests should avoid unnecessary dependencies
between unrelated scenarios.

### 10.6 Test Data Cleanup in Automation

For create-user tests, cleanup may be
performed using an `afterEach` hook
or another suitable teardown mechanism.

The cleanup logic must only delete
resources created by the current test.

A failed test must not cause unrelated
shared resources to be deleted.

## 11. Data Security

### 11.1 Sensitive Data

The following values must be protected:

- Client secrets.
- User passwords.
- Access tokens.
- Refresh tokens.
- Private account information.
- Any other sensitive authentication data.

### 11.2 Environment Configuration

Sensitive values should be stored using
appropriate environment variables or
secret-management mechanisms.

Local `.env` files containing secrets
must be excluded from version control.

Example:

```text
.env
.env.local
```

An `.env.example` file may be committed
if it contains placeholders only.

### 11.3 CI/CD Secrets

GitHub Actions secrets should be used
for sensitive CI/CD configuration where needed.

Credentials must not be printed in:

- GitHub Actions logs.
- Playwright reports.
- Allure attachments.
- Console output.
- Public documentation.

### 11.4 Test Data Privacy

Use synthetic or approved test data
whenever possible.

Do not use real customer information
unless explicitly authorized and
appropriately protected.

## 12. Risks and Mitigation

| Risk                         | Impact                          | Mitigation                            |
| ---------------------------- | ------------------------------- | ------------------------------------- |
| Duplicate user data          | User creation fails             | Generate unique test emails           |
| Shared data modification     | Other tests become unstable     | Use disposable test records           |
| Backend instability          | Inconsistent API responses      | Record evidence and retest            |
| Database errors              | Tests cannot complete reliably  | Track environment-related failures    |
| Expired authentication token | Unauthorized API responses      | Obtain fresh tokens when required     |
| Changing pagination totals   | Unstable assertions             | Avoid fixed totals                    |
| Missing prerequisite data    | Test setup fails                | Create controlled prerequisite data   |
| Cleanup failure              | Residual test records           | Track cleanup results                 |
| Credential exposure          | Security risk                   | Use environment secrets               |
| Test data inconsistency      | Unreliable manual/auto results  | Maintain documented data definitions  |

### 12.1 Backend Instability Handling

If the backend returns inconsistent responses:

1. Capture the request parameters.
2. Record the expected HTTP status.
3. Record the actual HTTP status.
4. Preserve relevant error codes and messages.
5. Compare behavior between Postman and Playwright.
6. Retest when the environment is stable.
7. Link confirmed defects to Jira.

An environment-related failure must not
be silently treated as a passing test.

## 13. References

| Document                        | Location                                |
| ------------------------------- | --------------------------------------- |
| Master Test Plan                | `manual-testing/TEST_PLAN.md`           |
| Requirement Traceability Matrix | `manual-testing/RTM.md`                 |
| Test Cases                      | Google Sheets – TBD                     |
| Test Execution                  | `manual-testing/TEST_EXECUTION.md`      |
| Defect Tracking                 | `manual-testing/DEFECT_TRACKING.md`     |
| Test Summary Report             | `manual-testing/TEST_SUMMARY_REPORT.md` |
| Jira Stories and Bugs           | Jira – TBD                              |
| Automation Tests                | `tests/`                                |

## 14. Revision History

| Version | Date       | Description                         | Updated By |
| ------- | ---------- | ----------------------------------- | ---------- |
| 1.0     | 2026-10-09 | Initial test data management draft  | TBD        |

---
