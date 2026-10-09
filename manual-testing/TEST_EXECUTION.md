# Bill Payment API – Test Execution Management

**Project:** Bill Payment API Automation  
**Document:** Test Execution Management  
**Testing Approach:** Hybrid Manual and Automation Testing  
**Manual Testing:** Postman  
**Automation Testing:** Playwright + TypeScript + Axios + Zod  
**Test Management:** Google Sheets + Jira  
**Reporting:** Playwright HTML + Allure  
**CI/CD:** GitHub Actions  
**Document Status:** In Progress

---

## 1. Introduction

This document defines the test execution management process
for the Bill Payment API testing project.

It describes how manual and automated API tests are prepared,
executed, monitored, documented, and evaluated.

Test execution is performed through two approaches:

- Manual API testing using Postman.
- Automated API testing using Playwright and TypeScript.

Google Sheets is the primary source of truth for manual
test execution results.

Playwright HTML and Allure reports provide automated
test execution evidence.

Jira is used to track confirmed defects.

This document describes execution procedures and reporting
rules rather than duplicating every individual test result.

## 2. Objectives

The objectives of test execution management are to:

- Establish a consistent API test execution process.
- Verify actual API behavior against expected results.
- Track manual and automated test execution outcomes.
- Identify and document failed test scenarios.
- Maintain traceability between requirements and test results.
- Link confirmed defects to Jira.
- Support defect retesting and regression testing.
- Provide reliable execution metrics.
- Support CI/CD execution and reporting.
- Maintain sufficient evidence for test closure.

## 3. Test Execution Scope

### 3.1 In-Scope Modules

| Module          | Execution Scope                  | Status      |
| --------------- | -------------------------------- | ----------- |
| Authentication  | OAuth token endpoint             | In Progress |
| Users           | User management CRUD operations  | In Progress |
| Billers         | Planned API testing              | Planned     |
| Bills           | Planned API testing              | Planned     |
| Payments        | Planned API testing              | Planned     |
| Payment Methods | Planned API testing              | Planned     |

### 3.2 Authentication Endpoint

```http
POST /oauth/token
```

Authentication execution includes:

- Client credentials grant.
- Password grant.
- Refresh token grant.
- Valid and invalid credentials.
- Required-field validation.
- Unsupported grant types.
- Content-type validation.
- Response status validation.
- Response schema validation.

### 3.3 Users Endpoints

```http
GET    /v1/users
POST   /v1/users
GET    /v1/users/{id}
PUT    /v1/users/{id}
PATCH  /v1/users/{id}
DELETE /v1/users/{id}
```

Users execution includes:

- User creation.
- User retrieval.
- User updates.
- User deletion.
- Pagination.
- Filtering.
- Search.
- Request validation.
- Boundary value testing.
- Error handling.
- Response schema validation.

### 3.4 Out-of-Scope Areas

The following API areas are excluded:

- Files.
- HTTP QUERY.
- Jobs.
- Bulk Operations.
- Webhooks.
- Simulation.

The following Users sub-resource endpoints are excluded:

- `GET /v1/users/{id}/bills`
- `GET /v1/users/{id}/payment-methods`
- `GET /v1/users/{id}/transactions`
- `POST /v1/users/{id}/verify-kyc`

## 4. Test Execution Strategy

### 4.1 Hybrid Testing Approach

The project combines manual and automated API testing.

Manual testing is used to:

- Explore API behavior.
- Verify documented requirements.
- Investigate unexpected responses.
- Validate newly identified scenarios.
- Reproduce potential defects.
- Confirm defect fixes.

Automation testing is used to:

- Execute repeatable API test cases.
- Validate HTTP response status codes.
- Validate response schemas.
- Execute data-driven scenarios.
- Support regression testing.
- Generate automated execution reports.
- Execute tests through CI/CD.

### 4.2 Execution Principles

Test execution should follow these principles:

1. Execute approved test cases.
2. Use the correct test environment.
3. Prepare required test data.
4. Verify expected results before execution.
5. Record actual results accurately.
6. Preserve evidence for unexpected behavior.
7. Avoid modifying expected results to match defects.
8. Track confirmed defects in Jira.
9. Retest resolved defects.
10. Maintain traceability with the RTM.

## 5. Test Execution Entry Criteria

Test execution may begin when:

- Relevant API requirements have been reviewed.
- Test cases have been designed.
- Expected results have been defined.
- The test environment is accessible.
- Required credentials are available.
- Required test data has been prepared.
- Postman or Playwright is configured.
- Applicable dependencies are available.

If essential preconditions are missing, the affected
test cases should be marked Blocked rather than Passed.

## 6. Manual Test Execution

### 6.1 Manual Testing Tool

**Tool:** Postman

Manual execution is performed using the API endpoints
and test data defined in the project documentation.

### 6.2 Manual Execution Procedure

1. Open the Postman workspace.
2. Select the appropriate environment.
3. Verify the API base URL.
4. Configure the required authentication.
5. Select the test case from Google Sheets.
6. Review the test case preconditions.
7. Prepare the required test data.
8. Send the API request.
9. Review the HTTP status code.
10. Review the response body.
11. Compare actual and expected results.
12. Record the execution status in Google Sheets.
13. Attach evidence where necessary.
14. Create or link a Jira Bug for confirmed defects.
15. Clean up temporary test data where applicable.

### 6.3 Manual Execution Record

Each manual execution record should contain:

| Field             | Description                         |
| ----------------- | ----------------------------------- |
| Test Case ID      | Unique test case identifier         |
| Module            | Related API module                  |
| Endpoint          | API method and path                 |
| Execution Date    | Date of test execution              |
| Environment       | Environment used for testing        |
| Expected Result   | Expected API behavior               |
| Actual Result     | Observed API behavior               |
| Execution Status  | Pass, Fail, Blocked, or Not Run     |
| Executed By       | Person performing the test          |
| Defect ID         | Related Jira Bug, if applicable     |
| Evidence          | Postman response or screenshot      |
| Remarks           | Additional execution observations   |

The exact Google Sheets columns may differ.

Existing test management fields should be preserved
unless an approved change is required.

### 6.4 Manual Execution Evidence

Evidence may include:

- HTTP request method.
- Endpoint and query parameters.
- Sanitized request body.
- Expected HTTP status.
- Actual HTTP status.
- Relevant response fields.
- Error code and message.
- Postman screenshot.
- Execution date.

Sensitive authentication values must not be included.

## 7. Automation Test Execution

### 7.1 Automation Framework

The automation framework uses:

- Playwright Test.
- TypeScript.
- Axios-based API clients.
- Zod response schemas.
- Custom API fixtures.
- Data-driven test cases.
- Playwright HTML reporting.
- Allure reporting.

### 7.2 Automation Execution Levels

Automation tests may be executed at different levels:

| Execution Level | Purpose                         |
| --------------- | ------------------------------- |
| Individual Test | Debug a specific scenario       |
| Endpoint        | Validate one API endpoint       |
| Module          | Execute a related group of tests|
| Regression      | Execute repeatable test cases   |
| Full Suite      | Execute the configured test set |
| CI/CD           | Execute tests in GitHub Actions |

### 7.3 Execute the Full Test Suite

Run all tests configured in Playwright:

```bash
npx playwright test
```

Alternatively, use the configured npm script:

```bash
npm test
```

### 7.4 Execute Authentication Tests

```bash
npx playwright test tests/auth/api
```

### 7.5 Execute Users Tests

```bash
npx playwright test tests/users/api
```

### 7.6 Execute an Individual Test File

Example:

```bash
npx playwright test tests/users/api/get-users.spec.ts
```

### 7.7 Execute an Individual Test Case

Use the test title or its unique identifier.

Example:

```bash
npx playwright test -g "USER-GET-011"
```

The selected identifier must match an existing
automated test title.

### 7.8 Execute Tests by Tag

Examples:

```bash
npx playwright test --grep "@smoke"
```

```bash
npx playwright test --grep "@regression"
```

```bash
npx playwright test --grep "@validation"
```

Tags must match the actual test annotations
or test titles in the repository.

### 7.9 Automation Execution Procedure

1. Verify the current Git branch.
2. Install required dependencies.
3. Confirm environment configuration.
4. Prepare prerequisite test data.
5. Select the required test scope.
6. Execute Playwright tests.
7. Review the execution summary.
8. Investigate failed assertions.
9. Review Playwright and Allure evidence.
10. Compare actual behavior with API requirements.
11. Create or link Jira Bugs where appropriate.
12. Retest confirmed fixes.
13. Perform regression testing.
14. Record the relevant execution reference.

## 8. Test Execution Status Definitions

### 8.1 Manual Execution Status

| Status  | Definition                                       |
| ------- | ------------------------------------------------ |
| Pass    | Actual result matches the expected result        |
| Fail    | Actual result does not match the expected result |
| Blocked | Execution cannot proceed due to a dependency     |
| Not Run | Test case has not been executed                  |

### 8.2 Automation Execution Status

Playwright may report statuses such as:

- Passed.
- Failed.
- Skipped.
- Timed Out.
- Interrupted.

These framework statuses should not automatically
be treated as identical to manual execution statuses.

For example:

- A skipped test may require classification as Not Run.
- A setup failure may require investigation before
  classification as Blocked.
- A failed assertion may indicate an application defect,
  test script defect, or environment problem.

### 8.3 Failure Classification

Failed test executions should be investigated and
classified using the following categories:

| Failure Category   | Description                             |
| ------------------ | --------------------------------------- |
| Application Defect | API behavior violates a requirement     |
| Test Script Defect | Automation implementation is incorrect  |
| Test Data Issue    | Required test data is invalid or missing|
| Environment Issue  | Test environment is unavailable/unstable|
| Requirement Issue  | Expected behavior is unclear            |
| Unknown            | Root cause has not been determined      |

A failed automated test does not automatically
represent a confirmed application defect.

## 9. Test Execution Tracking

### 9.1 Primary Tracking Sources

| Execution Type | Primary Source               |
| -------------- | ---------------------------- |
| Manual         | Google Sheets                |
| Automation     | Playwright and Allure reports|
| CI/CD          | GitHub Actions               |
| Defects        | Jira                         |
| Requirements   | `RTM.md`                     |

### 9.2 Execution Record Management

Google Sheets should maintain manual test execution
results using the existing test management structure.

Automated execution results should be obtained from
the corresponding test report.

When a combined execution summary is required,
the reporting date and execution source must be stated.

### 9.3 Test Execution History

A new execution record should be maintained when:

- A test case is executed for the first time.
- A failed test case is retested.
- Regression testing is performed.
- The test environment changes.
- A new release or relevant API change is tested.

Historical execution results should not be overwritten
without preserving the information needed for traceability.

## 10. Defect Management During Execution

### 10.1 Defect Identification

A potential defect is identified when the actual API
behavior differs from the approved expected behavior.

Before reporting a defect:

1. Verify the test case expected result.
2. Review the API specification.
3. Confirm the request parameters.
4. Confirm the test data.
5. Reproduce the unexpected behavior.
6. Review existing Jira Bugs.
7. Determine whether the issue is already tracked.

### 10.2 Defect Reporting

Confirmed defects should be created in Jira using
the project defect reporting template.

Required information includes:

- Module and endpoint.
- Test Case ID.
- Requirement ID, where available.
- Steps to reproduce.
- Request parameters.
- Expected result.
- Actual result.
- Supporting evidence.
- Severity and priority.

### 10.3 Defect Consolidation

Multiple failed test cases may be associated
with one Jira Bug when they represent the same defect.

For example, several invalid pagination inputs
may expose a shared input validation problem.

The decision to consolidate defects should be
based on confirmed behavior and investigation.

### 10.4 Defect Traceability

The expected traceability chain is:

```text
Requirement
    |
    v
Test Case
    |
    v
Test Execution
    |
    v
Jira Bug
    |
    v
Retest
    |
    v
Regression
```

## 11. Defect Retesting

### 11.1 Retesting Entry Criteria

Retesting may begin when:

- A fix is available.
- The target environment is accessible.
- The original failing test case is available.
- Required test data can be prepared.
- The Jira Bug is ready for verification.

### 11.2 Retesting Procedure

1. Review the original Jira Bug.
2. Review the expected behavior.
3. Prepare the original test data.
4. Execute the failing scenario again.
5. Compare the new result with the expected result.
6. Record the retest outcome.
7. Update the Jira Bug status.
8. Perform related regression testing.

### 11.3 Retesting Outcomes

| Outcome | Meaning                                 |
| ------- | --------------------------------------- |
| Passed  | The reported defect is no longer present|
| Failed  | The defect remains reproducible         |
| Blocked | Retesting cannot be completed           |

## 12. Regression Testing

### 12.1 Regression Testing Objectives

Regression testing verifies that changes
have not introduced unexpected behavior
in previously tested functionality.

### 12.2 Regression Testing Scope

Regression execution may include:

- Previously passed API scenarios.
- Previously failed scenarios after fixes.
- Related input validation scenarios.
- Authentication flows.
- Users CRUD operations.
- Response schema validation.
- Relevant boundary conditions.

### 12.3 Regression Execution Triggers

Regression testing may be performed after:

- Backend defect fixes.
- API implementation changes.
- Response schema changes.
- Authentication changes.
- Test data or environment changes.
- Automation framework changes affecting execution.

### 12.4 Regression Evidence

Regression evidence should include:

- Execution date.
- Tested module or endpoint.
- Test scope.
- Execution source.
- Passed and failed test counts.
- Relevant report link.
- Related Jira Bugs.

## 13. CI/CD Test Execution

### 13.1 CI/CD Platform

**Platform:** GitHub Actions

The CI/CD workflow supports automated
test execution and reporting.

### 13.2 CI Execution Workflow

The intended workflow is:

```text
Code Push / Pull Request / Manual Trigger
                 |
                 v
          GitHub Actions
                 |
                 v
         Install Dependencies
                 |
                 v
        TypeScript Validation
                 |
                 v
         Execute Playwright
                 |
                 v
        Generate Test Reports
                 |
                 v
        Publish / Store Reports
```

Actual workflow behavior must be verified against
`.github/workflows/playwright.yml`.

### 13.3 CI Execution Evidence

CI execution evidence may include:

- GitHub Actions run ID.
- Git commit SHA.
- Branch name.
- Execution timestamp.
- Test result summary.
- Workflow status.
- Playwright report artifact.
- Allure report link.

### 13.4 CI Failure Investigation

When a CI execution fails:

1. Open the failed GitHub Actions run.
2. Identify the failed workflow step.
3. Review the relevant execution logs.
4. Determine whether the failure is related to
   setup, type checking, testing, or reporting.
5. Review the test report if available.
6. Reproduce the issue locally when appropriate.
7. Create or update a Jira Bug only when an
   application defect is confirmed.

A CI workflow failure is not necessarily
an API application defect.

## 14. Test Reporting

### 14.1 Playwright HTML Report

The Playwright HTML report provides
test execution information, including:

- Test names.
- Execution outcomes.
- Error messages.
- Assertion failures.
- Execution duration.
- Available attachments.

Example command:

```bash
npx playwright show-report
```

### 14.2 Allure Report

Allure provides additional execution reporting
and test result visualization.

The project may use the configured npm scripts
to generate or open Allure reports.

Example:

```bash
npm run report:allure:build
```

The command must match the current
`package.json` configuration.

### 14.3 Report Reference

The project report location is:

[Allure Report](https://nhathoang2003.github.io/hydrid-billpayment-automation/)

The availability and freshness of published
results should be checked before referencing
them in a final execution summary.

## 15. Test Execution Metrics

### 15.1 Required Metrics

The following metrics should be collected:

- Total test cases.
- Executed test cases.
- Passed test cases.
- Failed test cases.
- Blocked test cases.
- Not-run test cases.
- Execution completion percentage.
- Pass percentage.
- Fail percentage.
- Confirmed defects.
- Retest outcomes.

### 15.2 Execution Completion Rate

```text
Execution Completion (%) =
(Executed Test Cases / Total Test Cases) × 100
```

Executed Test Cases includes Pass and Fail
results and excludes Blocked and Not Run.

### 15.3 Pass Rate

```text
Pass Rate (%) =
(Passed Test Cases / Executed Test Cases) × 100
```

### 15.4 Fail Rate

```text
Fail Rate (%) =
(Failed Test Cases / Executed Test Cases) × 100
```

### 15.5 Metric Calculation Rules

- Use the same execution scope for numerator
  and denominator.
- State the execution date and environment.
- Distinguish manual and automation results.
- Avoid combining duplicate executions as
  separate unique test cases.
- Do not report percentages when the
  denominator is zero.
- Use actual execution evidence.
- Do not invent execution results.

## 16. Test Execution Summary Template

The following template may be used for a
specific test execution cycle.

### 16.1 Execution Information

| Field            | Value |
| ---------------- | ----- |
| Execution ID     | TBD   |
| Execution Date   | TBD   |
| Environment      | TBD   |
| Tested Module    | TBD   |
| Test Type        | TBD   |
| Execution Source | TBD   |
| Executed By      | TBD   |
| Report Link      | TBD   |

### 16.2 Execution Results

| Metric             | Value |
| ------------------ | ----- |
| Total Test Cases   | TBD   |
| Passed             | TBD   |
| Failed             | TBD   |
| Blocked            | TBD   |
| Not Run            | TBD   |
| Execution Rate     | TBD   |
| Pass Rate          | TBD   |
| Fail Rate          | TBD   |
| Confirmed Defects  | TBD   |

### 16.3 Execution Observations

```text
Execution Summary:
[TBD]

Failed Scenarios:
[TBD]

Blocked Scenarios:
[TBD]

Environment Issues:
[TBD]

Related Jira Bugs:
[TBD]

Next Actions:
[TBD]
```

## 17. Test Execution Exit Criteria

A test execution cycle may be considered
complete when:

- The planned execution scope has been reviewed.
- Required test cases have been executed or
  have documented reasons for non-execution.
- Execution results have been recorded.
- Failed scenarios have been investigated.
- Confirmed defects have been linked to Jira.
- Available fixes have been retested.
- Required regression testing has been performed.
- Test execution evidence is available.
- Remaining risks and limitations are documented.

Completion of an execution cycle does not
necessarily mean all test cases have passed.

Final test closure is governed by the
Master Test Plan exit criteria.

## 18. Roles and Responsibilities

| Role              | Responsibility                       |
| ----------------- | ------------------------------------ |
| Tester            | Execute manual tests and log results |
| Automation Tester | Maintain and execute automated tests |
| Developer         | Investigate and resolve defects      |
| Project Owner     | Review execution progress and risks  |

In this portfolio project, multiple responsibilities
may be performed by the same contributor.

Role assignments should not imply the existence
of an unverified project team.

## 19. References

| Resource                 | Location                                |
| ------------------------ | --------------------------------------- |
| Master Test Plan         | `manual-testing/TEST_PLAN.md`           |
| Requirement Traceability | `manual-testing/RTM.md`                 |
| Test Data Management     | `manual-testing/TEST_DATA.md`           |
| Jira Bug Template        | `manual-testing/JIRA_BUG_TEMPLATE.md`   |
| Test Cases               | Google Sheets – TBD                     |
| Test Execution Records   | Google Sheets – TBD                     |
| Defect Tracking          | `manual-testing/DEFECT_TRACKING.md`     |
| Test Summary Report      | `manual-testing/TEST_SUMMARY_REPORT.md` |
| Automation Tests         | `tests/`                                |
| GitHub Actions           | `.github/workflows/playwright.yml`      |

## 20. Revision History

| Version | Date       | Description                          | Updated By |
| ------- | ---------- | ------------------------------------ | ---------- |
| 1.0     | 2026-10-09 | Initial test execution documentation | TBD        |

---
