# 💳 Bill Payment Automation

> Full-stack test automation framework cho **Bill Payment API** — bao gồm API testing, UI testing, hybrid E2E flows, CI/CD pipeline, và tích hợp JIRA/TestRail.

![Playwright](https://img.shields.io/badge/Playwright-1.63+-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=nodedotjs&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

---

## 📋 Mục lục

- [Tổng quan](#-tổng-quan)
- [Kiến trúc](#-kiến-trúc)
- [Cài đặt](#-cài-đặt)
- [Cấu hình](#-cấu-hình)
- [Chạy test](#-chạy-test)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [API Clients](#-api-clients)
- [Authentication](#-authentication)
- [Page Object Model](#-page-object-model-ui)
- [Fixtures & Factories](#-fixtures--factories)
- [Schema Validation](#-schema-validation)
- [CI/CD](#-cicd)
- [Tích hợp](#-tích-hợp)
- [Manual Testing](#-manual-testing)

---

## 🎯 Tổng quan

Framework tự động hóa kiểm thử cho **Bill Payment API** (`https://billpay-api.gauravkhurana-practice-api.workers.dev`) — một REST API quản lý thanh toán hóa đơn với các tính năng:

- **User management** — CRUD người dùng
- **Biller catalog** — Tìm kiếm & quản lý nhà cung cấp dịch vụ (Airtel, Jio, Tata Power, ...)
- **Bill management** — Tạo, cập nhật, xóa hóa đơn
- **Payment processing** — Thanh toán hóa đơn qua UPI/Card
- **Async job tracking** — Theo dõi trạng thái xử lý bất đồng bộ
- **OAuth2 authentication** — Nhiều phương thức xác thực (API Key, Bearer, Basic, Cookie, OAuth2)

### Test Coverage

| Layer        | Mô tả                                     | Số file |
| ------------ | ------------------------------------------ | ------- |
| **API**      | CRUD + validation + negative cases         | 20+     |
| **UI**       | Page Object Model với Chromium             | 4       |
| **Hybrid**   | API setup → UI verify → API assert         | 1       |
| **E2E**      | Full payment workflow (9 bước)             | 1       |
| **Protocol** | HTTP QUERY, ETag, Idempotency              | 3       |

---

## 🏗 Kiến trúc

```
┌─────────────────────────────────────────────────────┐
│                    Test Specs                        │
│  (auth / billers / bills / payments / users / e2e)  │
├─────────────────────────────────────────────────────┤
│              Fixtures & Factories                    │
│         (apiFixture / hybrid.fixture)                │
├─────────────────────────────────────────────────────┤
│     API Clients              Page Objects           │
│  ┌──────────────┐        ┌────────────────┐         │
│  │ BaseApiClient│        │   BasePage     │         │
│  │  ├─ Auth     │        │  ├─ Billers    │         │
│  │  ├─ User     │        │  ├─ Bills      │         │
│  │  ├─ Biller   │        │  └─ Payment    │         │
│  │  ├─ Bill     │        │    Modal       │         │
│  │  └─ Payment  │        └────────────────┘         │
│  └──────────────┘                                   │
├─────────────────────────────────────────────────────┤
│  Config (env.config)  │  Helpers  │  Schemas (Zod)  │
├─────────────────────────────────────────────────────┤
│            Reporters (TestRail / JIRA)               │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Cài đặt

### Yêu cầu

- **Node.js** ≥ 18 (LTS)
- **npm** ≥ 9

### Setup

```bash
# Clone repository
git clone <repo-url>
cd bill-payment-automation

# Cài đặt dependencies
npm install

# Cài đặt Playwright browsers (cho UI tests)
npx playwright install --with-deps
```

---

## ⚙️ Cấu hình

Tạo file `.env` tại root (copy từ mẫu bên dưới):

```env
# API
API_BASE_URL=https://billpay-api.gauravkhurana-practice-api.workers.dev
API_TIMEOUT_MS=30000
API_RETRIES=2

# Default authentication method
# Options: apiKeyHeader | apiKeyQuery | bearer | basic | cookie | oauth2ClientCredentials | oauth2Password
DEFAULT_AUTH_METHOD=apiKeyHeader

# API Key
API_KEY=demo-api-key-123

# Bearer Token
BEARER_TOKEN=demo-jwt-token-456

# Basic Auth
BASIC_AUTH_USER=demo
BASIC_AUTH_PASSWORD=password123

# Cookie Auth
SESSION_COOKIE=demo-session-abc123

# OAuth2 - Client Credentials
OAUTH_CLIENT_ID=demo-client
OAUTH_CLIENT_SECRET=demo-secret-789

# OAuth2 - Password Flow
OAUTH_USERNAME=demo
OAUTH_PASSWORD=password123

# Reporting
TESTRAIL_ENABLE=false
JIRA_ENABLE=false
```

### Đổi môi trường

```bash
# Sử dụng file env khác (staging, production, ...)
ENV_FILE=.env.staging npx playwright test
```

---

## 🧪 Chạy test

```bash
# Chạy tất cả tests
npx playwright test

# Chạy chỉ API tests
npx playwright test --project=api

# Chạy chỉ UI tests (Chromium)
npx playwright test --project=chromium

# Chạy test theo module
npx playwright test tests/auth/
npx playwright test tests/bills/
npx playwright test tests/payments/
npx playwright test tests/e2e/

# Chạy test cụ thể
npx playwright test tests/bills/api/create-bill.spec.ts

# Chạy với tag
npx playwright test --grep @smoke

# Chạy với UI mode (debug)
npx playwright test --ui

# Xem report
npx playwright show-report
```

---

## 📁 Cấu trúc thư mục

```
bill-payment-automation/
├── .env                          # Biến môi trường (không commit)
├── .github/workflows/
│   └── playwright.yml            # CI pipeline (GitHub Actions)
├── playwright.config.ts          # Cấu hình Playwright
├── package.json
│
├── src/                          # Source code framework
│   ├── config/
│   │   └── env.config.ts         # Centralized config, auth headers
│   │
│   ├── api/                      # API Clients (Axios-based)
│   │   ├── BaseApiClient.ts      # Base class: auth, X-Request-Id, HTTP methods
│   │   ├── AuthClient.ts         # OAuth2 flows, /v1/auth/me
│   │   ├── UserClient.ts         # /v1/users CRUD
│   │   ├── BillerClient.ts       # /v1/billers + search
│   │   ├── BillClient.ts         # /v1/bills CRUD
│   │   └── PaymentClient.ts      # /v1/payments
│   │
│   ├── pages/                    # Page Object Model (UI)
│   │   ├── BasePage.ts           # Common page actions
│   │   ├── BillersPage.ts        # Biller catalog page
│   │   ├── BillsPage.ts          # Bill management page
│   │   └── PaymentModal.ts       # Payment modal component
│   │
│   ├── types/                    # TypeScript interfaces
│   │   ├── index.ts              # Barrel export
│   │   ├── user.types.ts
│   │   ├── bill.types.ts
│   │   ├── biller.types.ts
│   │   ├── payment.types.ts
│   │   ├── payment-method.types.ts
│   │   ├── auth.types.ts
│   │   ├── common.types.ts
│   │   └── error.types.ts
│   │
│   ├── schemas/                  # Zod schemas (response validation)
│   │   ├── auth.schemas.ts
│   │   ├── bill.schemas.ts
│   │   ├── biller.schemas.ts
│   │   ├── common.schemas.ts
│   │   ├── payment.schemas.ts
│   │   ├── payment-method.schemas.ts
│   │   └── user.schemas.ts
│   │
│   ├── factories/                # Test data factories
│   │   ├── userFactory.ts
│   │   └── billFactory.ts
│   │
│   ├── fixtures/                 # Playwright fixtures
│   │   ├── apiFixture.ts         # API-only fixture (AuthClient)
│   │   └── hybrid.fixture.ts     # Combined API + UI fixture
│   │
│   ├── helpers/                  # Utility helpers
│   │   ├── schemaValidator.ts    # Zod-based validation
│   │   ├── pollingHelper.ts      # Async job polling
│   │   └── jiraIntegration.ts    # Auto-create JIRA bugs
│   │
│   └── reporters/
│       └── testrailReporter.ts   # TestRail integration
│
├── tests/                        # Test specifications
│   ├── auth/api/                 # Authentication tests
│   │   ├── oauth-client.spec.ts
│   │   ├── oauth-password.spec.ts
│   │   ├── oauth-refresh.spec.ts
│   │   ├── oauth-validation.spec.ts
│   │   └── get-user.spec.ts
│   │
│   ├── billers/
│   │   ├── api/                  # Biller API tests
│   │   │   ├── get-biller.spec.ts
│   │   │   ├── get-billers.spec.ts
│   │   │   └── search-billers.spec.ts
│   │   └── ui/
│   │       └── biller-catalog.spec.ts
│   │
│   ├── bills/
│   │   ├── api/                  # Bill CRUD API tests
│   │   │   ├── create-bill.spec.ts
│   │   │   ├── get-bill.spec.ts
│   │   │   ├── update-bill.spec.ts
│   │   │   └── delete-bill.spec.ts
│   │   └── ui/
│   │       └── bill-management.spec.ts
│   │
│   ├── payments/
│   │   ├── api/                  # Payment API tests
│   │   │   ├── create-payment.spec.ts
│   │   │   ├── get-payment.spec.ts
│   │   │   └── payment-validation.spec.ts
│   │   └── ui/
│   │       └── payment.spec.ts
│   │
│   ├── users/
│   │   ├── api/                  # User CRUD API tests
│   │   │   ├── create-user.spec.ts
│   │   │   ├── get-user.spec.ts
│   │   │   ├── update-user.spec.ts
│   │   │   ├── patch-user.spec.ts
│   │   │   └── delete-user.spec.ts
│   │   └── ui/
│   │       └── user-management.spec.ts
│   │
│   ├── e2e/
│   │   ├── api/
│   │   │   └── payment-workflow.spec.ts    # Full 9-step payment flow
│   │   └── hybrid/
│   │       └── payment-hybrid-flow.spec.ts # API + UI combined test
│   │
│   ├── jobs/api/                 # Async job tests
│   │   ├── async-job.spec.ts
│   │   └── get-job.spec.ts
│   │
│   └── protocol/api/            # HTTP protocol tests
│       ├── conditional-etag.spec.ts
│       ├── http-query.spec.ts
│       └── idempotency.spec.ts
│
├── data/
│   └── api/
│       └── auth.data.ts          # Auth test data
│
└── manual-testing/               # Manual testing artifacts
    ├── TEST_PLAN.md
    ├── RTM.md                    # Requirements Traceability Matrix
    ├── TEST_CASES_TESTRAIL.csv
    └── JIRA_BUG_TEMPLATE.md
```

---

## 🔌 API Clients

Tất cả API clients kế thừa từ `BaseApiClient`, sử dụng **Axios** với các tính năng:

- **Auto authentication** — Tự động gắn header auth theo phương thức được cấu hình
- **Request ID tracking** — Mỗi request tự sinh `X-Request-Id` (UUID v4)
- **Configurable timeout** — Timeout từ `.env`
- **No auto-throw** — `validateStatus: () => true` để test cả response lỗi

```typescript
// Sử dụng API client
const userClient = new UserClient();

// Mặc định dùng auth method từ .env
const response = await userClient.get('/v1/users/user-demo-001');

// Override auth method cho test cụ thể
const response = await userClient.get('/v1/users/user-demo-001', {
  authMethod: 'bearer'
});
```

---

## 🔐 Authentication

Framework hỗ trợ **7 phương thức xác thực**:

| Method                   | Header / Mechanism                       |
| ------------------------ | ---------------------------------------- |
| `apiKeyHeader`           | `X-API-Key: <key>`                       |
| `apiKeyQuery`            | `?api_key=<key>` (query param)           |
| `bearer`                 | `Authorization: Bearer <token>`          |
| `basic`                  | `Authorization: Basic <base64>`          |
| `cookie`                 | `Cookie: session_id=<cookie>`            |
| `oauth2ClientCredentials`| OAuth2 Client Credentials flow           |
| `oauth2Password`         | OAuth2 Resource Owner Password flow      |

Phương thức mặc định được cấu hình qua `DEFAULT_AUTH_METHOD` trong `.env`.

---

## 🖥 Page Object Model (UI)

UI tests sử dụng **Page Object Model** pattern với Playwright:

- `BasePage` — Common page interactions
- `BillersPage` — Biller catalog (search, filter, select biller)
- `BillsPage` — Bill management (create, view, delete bills)
- `PaymentModal` — Payment dialog (select method, confirm payment)

UI tests chạy trên project `chromium` và được match bởi pattern `**/ui/**/*.spec.ts`.

---

## 🏭 Fixtures & Factories

### Fixtures

- **`apiFixture.ts`** — Cung cấp `AuthClient` cho API-only tests
- **`hybrid.fixture.ts`** — Kết hợp API clients + Page Objects cho hybrid tests

### Factories

- **`userFactory.ts`** — Tạo test data cho User entity
- **`billFactory.ts`** — Tạo test data cho Bill entity

```typescript
// Sử dụng factory
import { createUser } from '../factories/userFactory';

const userData = createUser({ name: 'Test User' });
```

---

## ✅ Schema Validation

Sử dụng **Zod** để validate API response schemas, đảm bảo response khớp contract:

```typescript
import { userSchema } from '../schemas/user.schemas';

// Validate response body
const result = userSchema.safeParse(response.data);
expect(result.success).toBe(true);
```

---

## 🔄 CI/CD

**GitHub Actions** pipeline (`.github/workflows/playwright.yml`):

```yaml
Trigger: push/PR to main, master
Runner: ubuntu-latest
Steps:
  1. Checkout code
  2. Setup Node.js (LTS)
  3. npm ci
  4. Install Playwright browsers
  5. Run all Playwright tests
  6. Upload HTML report (30 days retention)
```

CI mode tự động:
- Bật `forbidOnly` (block `.only()`)
- Retry failed tests 2 lần
- Chạy single worker

---

## 🔗 Tích hợp

| Tool       | File                       | Mô tả                                    |
| ---------- | -------------------------- | ----------------------------------------- |
| **TestRail** | `testrailReporter.ts`    | Đẩy kết quả test lên TestRail             |
| **JIRA**   | `jiraIntegration.ts`       | Tự động tạo bug ticket khi test fail      |

Bật/tắt qua `.env`:
```env
TESTRAIL_ENABLE=true
JIRA_ENABLE=true
```

---

## 📝 Manual Testing

Thư mục `manual-testing/` chứa:

- **`TEST_PLAN.md`** — Test plan tổng thể
- **`RTM.md`** — Requirements Traceability Matrix (mapping test case → requirement)
- **`TEST_CASES_TESTRAIL.csv`** — Export test cases cho TestRail import
- **`JIRA_BUG_TEMPLATE.md`** — Template tạo bug report trên JIRA

---

## 🛠 Tech Stack

| Công nghệ        | Mục đích                    |
| ----------------- | --------------------------- |
| **Playwright**    | Test runner + UI automation |
| **TypeScript**    | Type-safe test code         |
| **Axios**         | HTTP client cho API tests   |
| **Zod**           | Runtime schema validation   |
| **dotenv**        | Environment configuration   |
| **GitHub Actions**| CI/CD pipeline              |

---

## 📄 License

ISC
