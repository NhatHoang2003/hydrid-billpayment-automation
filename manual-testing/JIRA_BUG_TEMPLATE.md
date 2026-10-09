# Bill Payment API – Jira Bug Reporting Template

**Project:** Bill Payment API Automation  
**Document:** Jira Bug Reporting Template  
**Testing Approach:** Hybrid Manual and Automation Testing  
**Defect Management Tool:** Jira  
**Manual Testing:** Postman  
**Automation Testing:** Playwright + TypeScript + Axios + Zod  
**Document Status:** Active

---

## 1. Introduction

This document defines the standard defect reporting format for
the Bill Payment API testing project.

It provides a consistent structure for reporting, investigating,
tracking, retesting, and closing defects identified during manual
and automated API testing.

Jira is the primary defect tracking system.

Test cases and manual execution results are maintained in
Google Sheets. Automated execution evidence is available
through Playwright HTML and Allure reports.

## 2. Objectives

The objectives of this template are to:

- Standardize defect reporting across API modules.
- Ensure each defect contains sufficient reproduction details.
- Maintain traceability between defects and test cases.
- Support efficient defect investigation and resolution.
- Distinguish application defects from environment failures.
- Provide evidence for failed test executions.
- Support defect retesting and regression testing.
- Maintain consistent defect severity and priority definitions.

## 3. Scope

### 3.1 In-Scope Modules

| Module          | Status      |
| --------------- | ----------- |
| Authentication  | In Progress |
| Users           | In Progress |
| Billers         | Planned     |
| Bills           | Planned     |
| Payments        | Planned     |
| Payment Methods | Planned     |

### 3.2 Defect Sources

Defects may be identified through:

- Manual API execution in Postman.
- Automated API execution in Playwright.
- Response schema validation using Zod.
- HTTP status code validation.
- API business rule validation.
- Boundary value testing.
- Negative and invalid input testing.
- Regression testing.

## 4. Jira Bug Summary Format

Use the following naming convention:

```text
[Module][Endpoint] Short description of the defect
```

Examples:

```text
[Users][GET /v1/users] Invalid page parameter returns 200 instead of 400

[Users][POST /v1/users] Invalid firstName type is accepted

[Authentication][POST /oauth/token] Invalid credentials return unexpected status
```

Bug summaries should be concise, specific, and describe
the observable problem.

Avoid generic summaries such as:

```text
API failed

System error

Test case failed
```

## 5. Jira Bug Template

Copy the following template into the Jira Bug description.

### 5.1 Bug Description Template

```text
BUG SUMMARY:
[Module][Endpoint] Short description

MODULE:
Authentication / Users / Billers / Bills / Payments / Payment Methods

ENDPOINT:
HTTP_METHOD /api/path

ENVIRONMENT:
Environment: [TBD]
Base URL: [TBD]
Testing Tool: Postman / Playwright
Execution Date: [YYYY-MM-DD]

RELATED REQUIREMENT:
Requirement ID: [REQ-XXX-XXX]

RELATED TEST CASE:
Test Case ID: [XXX-XXX]

PRECONDITIONS:
1. [Required setup]
2. [Required test data]

STEPS TO REPRODUCE:
1. [Step 1]
2. [Step 2]
3. [Step 3]

REQUEST DATA:
Method: [GET / POST / PUT / PATCH / DELETE]
URL: [API endpoint]
Headers: [Relevant non-sensitive headers]
Query Parameters: [If applicable]
Request Body: [Sanitized payload, if applicable]

EXPECTED RESULT:
[Expected behavior based on API specification]

ACTUAL RESULT:
[Actual HTTP status and response behavior]

REPRODUCIBILITY:
Always / Intermittent / Once / TBD

SEVERITY:
Critical / Major / Minor / Trivial

PRIORITY:
Highest / High / Medium / Low / Lowest

EVIDENCE:
[Postman response / Playwright report / Allure report / Logs]

RELATED AUTOMATION TEST:
[Test file path or test case tag]

NOTES:
[Additional investigation details]
```

## 6. Required Bug Information

| Field               | Description                                  |
| ------------------- | -------------------------------------------- |
| Summary             | Concise description of the defect            |
| Module              | Affected API module                          |
| Endpoint            | HTTP method and API path                     |
| Environment         | Environment where the defect occurred        |
| Preconditions       | Required setup before reproduction           |
| Steps to Reproduce  | Steps required to reproduce the defect       |
| Request Data        | Relevant API request information             |
| Expected Result     | Expected behavior based on requirements      |
| Actual Result       | Observed API behavior                        |
| Severity            | Technical or business impact                 |
| Priority            | Urgency of resolution                        |
| Evidence            | Supporting execution evidence                |
| Test Case ID        | Related test case in Google Sheets           |
| Requirement ID      | Related requirement in RTM                   |
| Automation Test     | Related automated test, where applicable     |

## 7. Severity Classification

Severity describes the impact of a defect.

| Severity | Definition                                      | Example                                      |
| -------- | ----------------------------------------------- | -------------------------------------------- |
| Critical | Core functionality unavailable or serious risk  | Authentication unavailable for valid users   |
| Major    | Important functionality behaves incorrectly     | Valid user creation consistently fails       |
| Minor    | Limited functionality or validation issue       | Incorrect pagination metadata                |
| Trivial  | Cosmetic or low-impact inconsistency            | Minor response message formatting issue      |

Severity must be determined using the actual impact
and affected functionality.

An unexpected HTTP status does not automatically
mean the defect is Critical.

## 8. Priority Classification

Priority describes how urgently a defect should be fixed.

| Priority | Definition                              |
| -------- | --------------------------------------- |
| Highest  | Immediate attention required            |
| High     | Should be resolved as soon as possible  |
| Medium   | Normal resolution priority              |
| Low      | Can be addressed in a later iteration   |
| Lowest   | Minimal urgency                         |

Severity and priority are separate attributes.

A defect may have high severity but a different
priority depending on its impact and release context.

## 9. Defect Lifecycle

The proposed defect lifecycle is:

```text
Open
  |
  v
In Progress
  |
  v
Ready for Retest
  |
  v
Retesting
  |
  +----> Reopened
  |         |
  |         v
  |     In Progress
  |
  v
Closed
```

Actual Jira workflow status names may differ.

The project should use the statuses configured
in its Jira board.

### 9.1 Open

The defect has been reported and is awaiting review
or assignment.

### 9.2 In Progress

The defect is being investigated or fixed.

### 9.3 Ready for Retest

A fix has been provided and the defect is ready
for validation.

### 9.4 Retesting

The tester executes the original failing scenario
against the updated implementation.

### 9.5 Reopened

The defect remains reproducible after a reported fix.

### 9.6 Closed

The fix has been verified and the defect is resolved
according to the agreed acceptance criteria.

## 10. Defect Reporting Procedure

1. Execute the test case.
2. Compare the actual result with the expected result.
3. Review the API specification and acceptance criteria.
4. Reproduce the unexpected behavior.
5. Check for existing Jira Bugs.
6. Create a new Jira Bug if the issue is not already tracked.
7. Attach sanitized request and response evidence.
8. Link the related Test Case ID.
9. Link the related Requirement ID when available.
10. Assign severity and priority.
11. Track the defect through its lifecycle.
12. Retest the fix when available.
13. Perform relevant regression testing.
14. Update the execution result and defect status.

## 11. Defect Evidence Guidelines

### 11.1 Postman Evidence

Manual testing evidence may include:

- Request method and endpoint.
- Query parameters.
- Sanitized request body.
- Actual HTTP status code.
- Response body.
- Execution timestamp.
- Relevant Postman screenshots.

### 11.2 Playwright Evidence

Automation evidence may include:

- Automated test name.
- Test Case ID.
- Test file path.
- Expected and actual status codes.
- Assertion failure.
- Playwright HTML report.
- Allure test result.
- CI execution reference.

### 11.3 Evidence Security

Evidence must not expose:

- Access tokens.
- Refresh tokens.
- Client secrets.
- User passwords.
- Private customer information.

Sensitive values must be removed or masked
before evidence is attached to Jira.

## 12. Example Bug Report

The following is an illustrative bug report based on
a previously observed Users API validation issue.

It is not a claim that the issue is still reproducible.

### 12.1 Example – Invalid Pagination Parameter

**Summary:**

```text
[Users][GET /v1/users] Page value 0 is accepted instead of rejected
```

**Module:** Users

**Endpoint:** `GET /v1/users`

**Related Test Case:** `TBD`

**Related Requirement:** `REQ-USER-006`

**Environment:** Practice API

**Testing Tool:** Postman / Playwright

#### Preconditions for Pagination Bug

- API endpoint is accessible.
- Required authentication is configured, if applicable.

#### Steps to Reproduce Pagination Bug

1. Send a GET request to `/v1/users`.
2. Set the query parameter `page=0`.
3. Observe the HTTP status and response body.
4. Compare the result with the expected validation behavior.

#### Request for Pagination Bug

```http
GET /v1/users?page=0
```

#### Expected Result for Pagination Bug

If the approved API validation requirement rejects
page numbers below 1, the API should return
the documented client-error response.

The exact expected HTTP status must be verified
against the approved test case.

#### Actual Result for Pagination Bug

A previous test execution observed an HTTP 200 response
for an invalid page parameter.

#### Pagination Bug Evidence

```text
Expected: 400
Actual:   200
```

#### Pagination Bug Severity and Priority

```text
Severity: TBD
Priority: TBD
```

These values must be assigned after assessing
the confirmed impact.

#### Pagination Bug Status

```text
TBD
```

The current defect status must be obtained from Jira.

## 13. Duplicate Defect Management

Before creating a Jira Bug:

1. Search existing Bugs by module and endpoint.
2. Compare the reported symptoms.
3. Compare the affected parameters.
4. Review the expected and actual behavior.
5. Check whether the same root cause is already tracked.

Multiple failing test cases may be linked to
one Jira Bug when they represent the same defect.

Separate Bugs should be created when the failures
represent different underlying problems.

## 14. Retesting and Regression

### 14.1 Retesting Procedure

When a fix is available:

1. Review the fix details.
2. Prepare the original failing test data.
3. Execute the original test scenario.
4. Verify the expected result.
5. Update the Jira Bug.
6. Record the retest outcome in Google Sheets.

### 14.2 Regression Testing Procedure

Regression testing should cover:

- The affected endpoint.
- Related input validation scenarios.
- Relevant response schema checks.
- Related API functionality.
- Automated regression tests where available.

### 14.3 Retest Outcomes

| Outcome | Description                                 |
| ------- | ------------------------------------------- |
| Passed  | The original defect is no longer observed   |
| Failed  | The defect is still reproducible            |
| Blocked | Retesting cannot proceed                    |

A failed retest should result in the defect
being reopened or moved to the appropriate
Jira workflow status.

## 15. Defect Traceability

Each confirmed defect should be traceable to:

```text
Requirement ID
      |
      v
Test Case ID
      |
      v
Test Execution
      |
      v
Jira Bug ID
      |
      v
Retest Result
```

Traceability is maintained through:

- `RTM.md`
- Google Sheets Test Cases
- Google Sheets Test Execution
- Jira Bugs
- Playwright and Allure reports

## 16. References

| Resource                 | Location                                |
| ------------------------ | --------------------------------------- |
| Master Test Plan         | `manual-testing/TEST_PLAN.md`           |
| Requirement Traceability | `manual-testing/RTM.md`                 |
| Test Data Management     | `manual-testing/TEST_DATA.md`           |
| Test Cases               | Google Sheets – TBD                     |
| Test Execution           | `manual-testing/TEST_EXECUTION.md`      |
| Defect Tracking          | `manual-testing/DEFECT_TRACKING.md`     |
| Test Summary Report      | `manual-testing/TEST_SUMMARY_REPORT.md` |
| Jira                     | Project board – TBD                     |
| Automation Tests         | `tests/`                                |

## 17. Revision History

| Version | Date       | Description                  | Updated By |
| ------- | ---------- | ---------------------------- | ---------- |
| 1.0     | 2026-10-09 | Initial Jira bug template    | TBD        |

---
