# Bill Payment API – Requirement Traceability Matrix

**Project:** Bill Payment API Automation  
**Document:** Requirement Traceability Matrix (RTM)  
**Testing Type:** API Testing  
**Test Management:** Jira + Google Sheets  
**Manual Testing:** Postman  
**Automation:** Playwright + TypeScript + Axios + Zod  
**Status:** In Progress

---

## 1. Introduction

This Requirement Traceability Matrix (RTM) establishes traceability
between API requirements, Jira Stories, test cases, test execution
results, and defects for the Bill Payment API project.

The RTM is used to verify that applicable requirements are covered
by test cases and to identify requirements with incomplete or
missing test coverage.

Detailed test cases and execution results are maintained in
Google Sheets, while confirmed defects are tracked in Jira.

## 2. Objectives

The objectives of this RTM are to:

- Map API requirements to corresponding test cases.
- Link requirements to Jira Stories where applicable.
- Track test coverage across API modules.
- Identify requirements without test coverage.
- Link failed test cases to confirmed defects.
- Support regression testing and test closure.
- Maintain consistency between requirements, test cases, and defects.

## 3. Scope

### 3.1 In Scope

The RTM covers the following API modules:

- Authentication
- Users
- Billers
- Bills
- Payments
- Payment Methods

Detailed requirement mapping will be added as each module
is analyzed and its test cases are designed.

### 3.2 Out of Scope

The following API areas are excluded:

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

Excluded endpoints will not be included in the in-scope
requirement coverage calculation.

## 4. Traceability Structure

### 4.1 RTM Fields

| Field | Description |
| --- | --- |
| Requirement ID | Unique identifier for a requirement |
| Jira Story ID | Related Jira Story |
| Module | API module |
| Endpoint | HTTP method and API path |
| Requirement Description | Expected API behavior |
| Test Case ID | Related test case in Google Sheets |
| Test Type | Functional, Negative, Boundary, etc. |
| Coverage Status | Covered, Partially Covered, Not Covered |
| Execution Status | Pass, Fail, Blocked, Not Run |
| Defect ID | Related Jira Bug, if applicable |

### 4.2 Identifier Conventions

The following requirement ID format is proposed:

- `REQ-AUTH-XXX`: Authentication requirements
- `REQ-USER-XXX`: Users requirements
- `REQ-BILLER-XXX`: Billers requirements
- `REQ-BILL-XXX`: Bills requirements
- `REQ-PAY-XXX`: Payments requirements
- `REQ-PM-XXX`: Payment Methods requirements

Requirement IDs are project-defined identifiers and
must not be confused with official API specification IDs.

Existing Test Case IDs from Google Sheets should be reused.

Jira Story IDs must be taken from actual Jira records.

## 5. Authentication Requirement Traceability

### 5.1 Module Information

**Module:** Authentication  
**Endpoint:** `POST /oauth/token`  
**Designed Test Cases:** 23  
**Detailed Test Case Source:** Google Sheets

### 5.2 Requirement Mapping

| Requirement ID | Requirement Description | Test Case ID | Jira Story ID | Coverage |
| --- | --- | --- | --- | --- |
| REQ-AUTH-001 | Support client credentials grant | TBD | TBD | TBD |
| REQ-AUTH-002 | Support password grant | TBD | TBD | TBD |
| REQ-AUTH-003 | Support refresh token grant | TBD | TBD | TBD |
| REQ-AUTH-004 | Validate client credentials | TBD | TBD | TBD |
| REQ-AUTH-005 | Validate username and password | TBD | TBD | TBD |
| REQ-AUTH-006 | Validate required request fields | TBD | TBD | TBD |
| REQ-AUTH-007 | Reject unsupported grant types | TBD | TBD | TBD |
| REQ-AUTH-008 | Validate request data types | TBD | TBD | TBD |
| REQ-AUTH-009 | Validate supported content types | TBD | TBD | TBD |
| REQ-AUTH-010 | Validate response status codes | TBD | TBD | TBD |
| REQ-AUTH-011 | Validate token response structure | TBD | TBD | TBD |
| REQ-AUTH-012 | Validate authentication error responses | TBD | TBD | TBD |

**Note:** These are preliminary requirement groups derived from
the Authentication testing scope in the Master Test Plan.

The exact mapping to all 23 designed test cases must be
completed using the Google Sheets test case inventory.

### 5.3 Execution and Defect Traceability

| Requirement ID | Test Case ID | Execution Status | Defect ID |
| -------------- | ------------ | ---------------- | --------- |
| TBD            | TBD          | Not Run / TBD    | TBD       |

Execution statuses must be updated using actual manual
test execution records.

## 6. Users Requirement Traceability

### 6.1 Module Information

**Module:** Users

**In-Scope Endpoints:**

- `GET /v1/users`
- `POST /v1/users`
- `GET /v1/users/{id}`
- `PUT /v1/users/{id}`
- `PATCH /v1/users/{id}`
- `DELETE /v1/users/{id}`

### 6.2 GET /v1/users – List Users

| Requirement ID | Requirement Description | Test Case ID | Jira Story ID | Coverage |
| --- | --- | --- | --- | --- |
| REQ-USER-001 | Retrieve a list of users | TBD | TBD | TBD |
| REQ-USER-002 | Support page-based pagination | TBD | TBD | TBD |
| REQ-USER-003 | Support limit parameter | TBD | TBD | TBD |
| REQ-USER-004 | Support KYC status filtering | TBD | TBD | TBD |
| REQ-USER-005 | Support search functionality | TBD | TBD | TBD |
| REQ-USER-006 | Validate invalid query parameters | TBD | TBD | TBD |
| REQ-USER-007 | Validate response structure | TBD | TBD | TBD |
| REQ-USER-008 | Validate pagination metadata | TBD | TBD | TBD |
| REQ-USER-009 | Validate API error responses | TBD | TBD | TBD |

### 6.3 POST /v1/users – Create User

| Requirement ID | Requirement Description | Test Case ID | Jira Story ID | Coverage |
| --- | --- | --- | --- | --- |
| REQ-USER-010 | Create a user with valid data | TBD | TBD | TBD |
| REQ-USER-011 | Validate required fields | TBD | TBD | TBD |
| REQ-USER-012 | Validate invalid input data | TBD | TBD | TBD |
| REQ-USER-013 | Validate duplicate user data handling | TBD | TBD | TBD |
| REQ-USER-014 | Validate successful creation response | TBD | TBD | TBD |
| REQ-USER-015 | Validate error response structure | TBD | TBD | TBD |

### 6.4 GET /v1/users/{id} – Get User by ID

| Requirement ID | Requirement Description | Test Case ID | Jira Story ID | Coverage |
| --- | --- | --- | --- | --- |
| REQ-USER-016 | Retrieve an existing user by ID | TBD | TBD | TBD |
| REQ-USER-017 | Handle a non-existing user ID | TBD | TBD | TBD |
| REQ-USER-018 | Validate user ID input | TBD | TBD | TBD |
| REQ-USER-019 | Validate user response structure | TBD | TBD | TBD |

### 6.5 PUT /v1/users/{id} – Update User

| Requirement ID | Requirement Description | Test Case ID | Jira Story ID | Coverage |
| --- | --- | --- | --- | --- |
| REQ-USER-020 | Update an existing user | TBD | TBD | TBD |
| REQ-USER-021 | Validate update request data | TBD | TBD | TBD |
| REQ-USER-022 | Handle a non-existing user ID | TBD | TBD | TBD |
| REQ-USER-023 | Validate update response structure | TBD | TBD | TBD |

### 6.6 PATCH /v1/users/{id} – Partial Update

| Requirement ID | Requirement Description | Test Case ID | Jira Story ID | Coverage |
| --- | --- | --- | --- | --- |
| REQ-USER-024 | Partially update an existing user | TBD | TBD | TBD |
| REQ-USER-025 | Validate partial update data | TBD | TBD | TBD |
| REQ-USER-026 | Handle a non-existing user ID | TBD | TBD | TBD |
| REQ-USER-027 | Validate partial update response | TBD | TBD | TBD |

### 6.7 DELETE /v1/users/{id} – Delete User

| Requirement ID | Requirement Description | Test Case ID | Jira Story ID | Coverage |
| --- | --- | --- | --- | --- |
| REQ-USER-028 | Delete an existing user | TBD | TBD | TBD |
| REQ-USER-029 | Handle a non-existing user ID | TBD | TBD | TBD |
| REQ-USER-030 | Validate deletion response | TBD | TBD | TBD |

### 6.8 Execution and Defect Traceability

| Requirement ID | Test Case ID | Execution Status | Defect ID |
| -------------- | ------------ | ---------------- | --------- |
| TBD            | TBD          | Not Run / TBD    | TBD       |

The final mapping must be completed using the actual
Users test cases and execution records in Google Sheets.

## 7. Planned Module Traceability

### 7.1 Billers

**Status:** Planned

Requirement mapping will be added after Billers
requirement analysis and test case design.

### 7.2 Bills

**Status:** Planned

Requirement mapping will be added after Bills
requirement analysis and test case design.

### 7.3 Payments

**Status:** Planned

Requirement mapping will be added after Payments
requirement analysis and test case design.

### 7.4 Payment Methods

**Status:** Planned

Requirement mapping will be added after Payment Methods
requirement analysis and test case design.

## 8. Coverage Status Definitions

| Status | Definition |
| --- | --- |
| Covered | Requirement has all planned test cases designed |
| Partially Covered | Requirement has some, but not all, planned test cases designed |
| Not Covered | No test case has been designed for the requirement |
| TBD | Coverage has not yet been evaluated |

Coverage Status describes test case design coverage,
not whether the requirement has passed testing.

Execution Status is tracked separately.

## 9. Requirement Coverage Metrics

### 9.1 Metrics

The following metrics may be calculated:

- Total In-Scope Requirements
- Covered Requirements
- Partially Covered Requirements
- Not Covered Requirements
- Requirements with Failed Test Cases
- Requirements Linked to Defects

### 9.2 Requirement Coverage Formula

```text
Requirement Coverage (%) =
(Covered Requirements / Total In-Scope Requirements) × 100
```

Partially covered requirements are excluded from the
fully covered requirement count.

The metric should be reported as N/A when the
denominator is zero.

### 9.3 Coverage Reporting

Coverage results will be calculated after requirement
mapping has been completed and reviewed.

No coverage percentage will be reported without
supporting requirement and test case records.

## 10. RTM Maintenance Process

The RTM should be updated when:

1. New API requirements are identified.
2. Existing requirements change.
3. New test cases are designed.
4. Existing test cases are modified or removed.
5. Manual test execution results are updated.
6. Defects are created, resolved, or reopened.
7. New API modules enter the testing scope.
8. Test closure activities are performed.

The RTM must remain consistent with:

- Master Test Plan
- Google Sheets Test Cases
- Test Execution Results
- Jira Stories and Bugs
- Test Summary Report

## 11. References

| Resource | Location |
| --- | --- |
| Master Test Plan | `manual-testing/TEST_PLAN.md` |
| Test Cases | Google Sheets – TBD |
| Test Execution | `manual-testing/TEST_EXECUTION.md` |
| Defect Tracking | `manual-testing/DEFECT_TRACKING.md` |
| Jira Stories and Bugs | Jira – TBD |
| Test Summary Report | `manual-testing/TEST_SUMMARY_REPORT.md` |
| Automation Tests | `tests/` |

## 12. Revision History

| Version | Date | Description             | Updated By |
| ------- | ---- | ----------------------- | ---------- |
| TBD     | TBD  | Initial RTM preparation | TBD        |

---
