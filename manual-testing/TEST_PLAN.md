# Bill Payment API – Test Plan

**Project:** Bill Payment API Automation  
**Document:** Master Test Plan  
**Testing Type:** API Testing  
**Test Management:** Jira + Google Sheets  
**Manual Testing:** Postman  
**Automation:** Playwright + TypeScript + Axios + Zod  
**Reporting:** Allure / Playwright HTML  
**CI/CD:** GitHub Actions

---

## 1. Introduction

This Test Plan defines the testing approach, scope, strategy, environment, test data, entry and exit criteria, defect management process, risks, and deliverables for the Bill Payment API project.

The project focuses on validating the core API functionality of the Bill Payment system through manual and automated API testing.

Testing activities are managed through Jira and Google Sheets. Manual API testing is performed using Postman, while automated regression testing is implemented using Playwright with TypeScript, Axios, and Zod.

The project covers the following API modules:

- Authentication
- Users
- Billers
- Bills
- Payments
- Payment Methods

## 2. Objectives

The objectives of testing are to:

- Verify that API endpoints behave according to the defined requirements.
- Validate successful and unsuccessful API requests.
- Verify authentication and authorization-related behavior.
- Validate request parameters, request bodies, headers, and content types.
- Validate HTTP status codes and API responses.
- Validate response structures and required fields.
- Verify boundary and invalid input handling where applicable.
- Verify CRUD operations for supported resources.
- Identify and document backend defects.
- Build automated regression coverage for stable API functionality.
- Execute automated tests through CI/CD.
- Generate test execution and automation reports.

## 3. Scope

### 3.1 In Scope

Testing covers the following six modules:

- Authentication
- Users
- Billers
- Bills
- Payments
- Payment Methods

Testing may include, where supported by the corresponding endpoint:

- Functional testing
- Positive testing
- Negative testing
- Input validation
- Boundary testing
- Authentication testing
- HTTP status validation
- Response body validation
- Response schema validation
- Error handling
- CRUD operations
- Pagination
- Search and filtering
- Regression testing

### 3.2 Out of Scope

The following API areas are excluded from this project:

- Files
- HTTP QUERY
- Jobs
- Bulk Operations
- Webhooks
- Simulation

For the Users module, the following sub-resource APIs are also excluded:

- `GET /v1/users/{id}/bills`
- `GET /v1/users/{id}/payment-methods`
- `GET /v1/users/{id}/transactions`
- `POST /v1/users/{id}/verify-kyc`

These endpoints exist in the supplied API documentation but are intentionally excluded from the current project scope.

## 4. Test Strategy

Testing will follow a combination of manual and automated API testing.

### 4.1 Requirement Analysis

API documentation and requirements will be reviewed before test case design.

The analysis will identify:

- Endpoint
- HTTP method
- Authentication
- Parameters
- Request body
- Required and optional fields
- Validation rules
- Expected responses
- HTTP status codes
- Error scenarios

### 4.2 Test Case Design

Test cases will be designed and maintained in Google Sheets.

Test scenarios will include applicable:

- Positive
- Negative
- Validation
- Boundary
- Authentication
- Schema
- Error handling

Each test case will include information such as Test Case ID, module, endpoint, scenario, preconditions, test steps, test data, expected result, priority, execution status, and automation status.

### 4.3 Manual API Testing

Postman will be used to execute API tests manually before or alongside automation.

Postman testing will validate:

- Request configuration
- Request data
- Headers
- Authentication
- Status codes
- Response body
- Error responses
- API behavior

Data-driven testing may be used for endpoints containing multiple similar test scenarios.

### 4.4 Automation Testing

Stable and repeatable API test scenarios will be automated using:

- Playwright
- TypeScript
- Axios
- Zod

Automation will focus primarily on regression coverage and repeatable API validation.

Zod schemas will be used to validate applicable response structures.

### 4.5 Regression Testing

Regression testing will be performed after changes or when a module reaches an appropriate testing stage.

Automated regression tests will also be executed through GitHub Actions.

## 5. Test Environment

**API Environment:** Bill Payment Practice API

**Base URL:**

<https://billpay-api.gauravkhurana-practice-api.workers.dev>

**Supported API content types include:**

- `application/json`
- `application/x-www-form-urlencoded`

The API documentation specifies these content types for the relevant API operations.

**Tools:**

| Purpose | Tool |
| --- | --- |
| Project / Defect Management | Jira |
| Test Case Management | Google Sheets |
| Manual API Testing | Postman |
| Automation | Playwright + TypeScript |
| HTTP Client | Axios |
| Schema Validation | Zod |
| Reporting | Allure / Playwright HTML |
| Version Control | Git + GitHub |
| CI/CD | GitHub Actions |

## 6. Test Data

Test data will be prepared based on individual API scenarios.

It may include:

- Valid data
- Invalid data
- Missing fields
- Empty values
- Boundary values
- Invalid data types
- Existing resource IDs
- Non-existing resource IDs
- Authentication credentials/tokens
- Dynamically generated data where required

Unique or dynamic data should be used when necessary to prevent conflicts between test executions.

Sensitive credentials and secrets must not be committed directly to the repository.

The supplied API documentation notes that demo data may reset periodically. Therefore, tests should avoid unnecessary dependence on fixed resource counts or long-lived test records.

## 7. Entry Criteria

Testing can begin when:

- API requirements/documentation are available.
- Endpoint scope has been identified.
- Test environment is accessible.
- Required authentication information is available.
- Test scenarios/test cases for the targeted functionality are prepared.
- Required test data is available or can be created.
- Blocking environment issues have been resolved.

## 8. Exit Criteria

Testing for a module or Sprint can be considered complete when:

- Planned test cases have been executed.
- Critical functionality has been validated.
- Test results have been recorded.
- Identified defects have been documented in Jira where applicable.
- Critical blocking defects have been resolved or formally acknowledged.
- Planned automation coverage has been implemented where applicable.
- Regression testing has been completed.
- Test reports/results are available.

## 9. Defect Management

Defects identified during testing will be tracked using Jira.

**General defect workflow:**

```text
Test Execution
      ↓
Expected ≠ Actual
      ↓
Reproduce / Verify
      ↓
Confirm Backend Defect
      ↓
Create Jira Bug
      ↓
Developer Fix
      ↓
Retest
      ↓
Regression Test
      ↓
Close
```

A defect should contain sufficient evidence, including:

- Summary
- Environment
- Endpoint
- HTTP method
- Preconditions
- Steps to reproduce
- Request data
- Expected result
- Actual result
- Response/status code
- Evidence where appropriate
- Severity/Priority

## 10. Risks

Potential testing risks include:

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Test data resets | Existing IDs/data may disappear | Generate or prepare test data dynamically |
| Shared API data changes | Pagination/count assertions may become unstable | Avoid unnecessary assertions against dynamic totals |
| Backend instability | Tests may return inconsistent results | Reproduce manually and document evidence |
| API behavior differs from documentation | Expected results may fail | Confirm requirement and raise defect if appropriate |
| Dependent API operations fail | CRUD flow may be blocked | Isolate tests where possible and use controlled setup |
| Authentication/token expiration | Requests may fail unexpectedly | Generate or refresh authentication data as required |

The periodic reset behavior is specifically documented by the supplied API documentation.

## 11. Deliverables

The following deliverables will be prepared and maintained throughout the Bill Payment API testing lifecycle to support test planning, requirement traceability, manual test execution, automation testing, defect management, and test reporting.

### 11.1 Test Planning and Design Deliverables

#### 1. Test Plan (`TEST_PLAN.md`)

Defines the overall testing objectives, scope, strategy, test environment, entry and exit criteria, risks, defect management process, and testing deliverables.

#### 2. Test Cases (Google Sheets)

Contains the designed API test cases covering positive,
negative, boundary, validation, authentication,
error handling, and other applicable testing scenarios.

Test cases will be designed, maintained, and updated
in Google Sheets.

Google Sheets will serve as the primary source of truth
for test case management.

#### 3. Requirement Traceability Matrix (`RTM.md`)

Maps API requirements and Jira Stories to their corresponding test cases to support requirement traceability and test coverage tracking.

#### 4. Test Data (`TEST_DATA.md`)

Documents the test data strategy and representative data required for manual and automated API testing.

Test data may include valid inputs, invalid inputs, boundary values, missing fields, existing and non-existing resource IDs, and dynamically generated values.

Sensitive credentials, access tokens, and secrets must not be exposed in the repository.

### 11.2 Manual Test Execution Deliverables

#### 5. Postman Collection

Contains organized API requests for manual testing of the supported Bill Payment API modules.

#### 6. Postman Test Data

Contains the datasets, variables, and request payloads used during manual API test execution.

#### 7. Test Execution Results (`TEST_EXECUTION.md`)

Records the results of manual test execution, including:

- Test Case ID
- Module / Endpoint
- Execution Date
- Expected Result
- Actual Result
- Execution Status (Pass, Fail, Blocked, Not Run)
- Defect Reference
- Evidence / Notes

Detailed execution records may be maintained in Google Sheets, with a summary and reference link provided in this document.

### 11.3 Defect Management Deliverables

#### 8. Jira Defect Reports

Contain confirmed defects identified during testing, including reproduction steps, request and response evidence, expected and actual results, severity, priority, and defect status.

#### 9. Defect Tracking (`DEFECT_TRACKING.md`)

Provides a consolidated overview of defects identified during test execution.

The document may include:

- Defect ID / Jira Bug ID
- Related Test Case ID
- Module / Endpoint
- Defect Summary
- Severity / Priority
- Defect Status
- Reported Date
- Retest Result
- Jira Reference

Detailed defect records will be managed through Jira and/or Google Sheets.

### 11.4 Automation Testing Deliverables

#### 10. Automation Test Scripts

Contain automated API test cases implemented using Playwright, TypeScript, and Axios.

Reusable API clients, fixtures, test data utilities, and Zod response schemas support maintainability and response validation.

#### 11. Allure Reports

Provide automated test execution results, test statuses, failure details, and available execution evidence.

#### 12. Playwright HTML Reports

Provide an additional view of automated test execution results and failure information.

#### 13. CI/CD Test Results

Contain the results of automated test execution performed through GitHub Actions, including workflow status and generated test reports.

### 11.5 Test Closure and Documentation Deliverables

#### 14. Test Summary Report (`TEST_SUMMARY_REPORT.md`)

Summarizes testing activities and results for a completed testing cycle, module, or Sprint.

The report may include:

- Testing Scope
- Total Planned Test Cases
- Total Executed Test Cases
- Passed / Failed / Blocked / Not Run
- Test Execution Pass Rate
- Defect Summary
- Outstanding Defects
- Automation Coverage
- Testing Risks and Limitations
- Exit Criteria Evaluation
- Overall Testing Conclusion

Results must be based on actual test execution records.

#### 15. Change Log (`CHANGE_LOG.md`)

Maintains a history of significant changes to testing documentation, including:

- Document Version
- Change Date
- Updated Document
- Description of Changes
- Updated By

The Change Log supports documentation traceability throughout the project lifecycle.

### 11.6 Deliverable Storage and Management

Testing deliverables will be organized and maintained using the following tools:

| Test Cases | Google Sheets |
| --- | --- |
| Test Plan | GitHub – `manual-testing/TEST_PLAN.md` |
| Test Cases | Google Sheets / GitHub CSV |
| Requirement Traceability Matrix | GitHub – `manual-testing/RTM.md` |
| Test Data | GitHub – `manual-testing/TEST_DATA.md` |
| Postman Collection | GitHub – `postman/` |
| Postman Test Data | Postman / Project Test Data |
| Test Execution Results | Google Sheets / GitHub – `manual-testing/TEST_EXECUTION.md` |
| Jira Defect Reports | Jira |
| Defect Tracking | Jira / Google Sheets / GitHub – `manual-testing/DEFECT_TRACKING.md` |
| Automation Test Scripts | GitHub – `tests/` and `src/` |
| Allure Reports | Allure / GitHub Pages |
| Playwright HTML Reports | Playwright |
| CI/CD Test Results | GitHub Actions |
| Test Summary Report | GitHub – `manual-testing/TEST_SUMMARY_REPORT.md` |
| Change Log | GitHub – `manual-testing/CHANGE_LOG.md` |

All deliverables should be updated when relevant testing activities are completed or when significant changes occur.

Where detailed records are maintained in Jira or Google Sheets, GitHub documentation may provide summaries and reference links to avoid unnecessary duplication.

## 12. Module Coverage

### 12.1 Authentication

**Endpoint:**

`POST /oauth/token`

Authentication testing currently covers OAuth token flows including:

- Client Credentials
- Password Grant
- Refresh Token
- Request Validation

**Current designed coverage:**

- 23 Test Cases

Testing includes valid credentials, invalid credentials, missing fields, empty values, invalid data types, grant validation, supported/unsupported content types, JSON requests, form-urlencoded requests, and refresh-token behavior.

### 12.2 Users

Users testing is limited to the six core CRUD operations:

- `GET /v1/users`
- `POST /v1/users`
- `GET /v1/users/{id}`
- `PUT /v1/users/{id}`
- `PATCH /v1/users/{id}`
- `DELETE /v1/users/{id}`

These six operations are defined in the supplied Users API documentation.

**Testing focus:**

- CRUD functionality
- Request validation
- Response validation
- Authentication
- Error handling
- Schema validation
- Pagination
- Filtering
- Search
- Boundary validation

The detailed test cases for each Users endpoint will be maintained in the project's test case management sheet.

### 12.3 Billers

**Status:** Planned

Detailed endpoint coverage and testing focus will be added after Billers requirement analysis is completed.

### 12.4 Bills

**Status:** Planned

Detailed endpoint coverage and testing focus will be added after Bills requirement analysis is completed.

### 12.5 Payments

**Status:** Planned

Detailed endpoint coverage and testing focus will be added after Payments requirement analysis is completed.

### 12.6 Payment Methods

**Status:** Planned

Detailed endpoint coverage and testing focus will be added after Payment Methods requirement analysis is completed.

---

## 13. Test Schedule and Milestones

### 13.1 Purpose

The test schedule defines the planned sequence of testing activities, major milestones, and expected deliverables throughout the project.

Testing activities may be organized by API module, Jira Story, or Sprint.

### 13.2 Testing Phases

| Phase | Activity | Expected Deliverable | Status |
| --- | --- | --- | --- |
| 1 | Requirement Analysis | API requirement analysis and scope identification | TBD |
| 2 | Test Planning | Master Test Plan | TBD |
| 3 | Test Case Design | Test Cases and RTM | TBD |
| 4 | Test Data Preparation | Test Data and Postman requests | TBD |
| 5 | Manual Test Execution | Test Execution Results | TBD |
| 6 | Defect Management | Jira Bug Reports and Defect Tracking | TBD |
| 7 | Automation Implementation | Playwright API Test Scripts | TBD |
| 8 | Regression Testing | Regression Test Results | TBD |
| 9 | CI/CD Execution | GitHub Actions Results and Allure Reports | TBD |
| 10 | Test Closure | Test Summary Report | TBD |

### 13.3 Milestone Tracking

| Milestone | Module / Scope | Planned Date | Actual Date | Status |
| --- | --- | --- | --- | --- |
| M01 | Authentication Testing | TBD | TBD | TBD |
| M02 | Users Testing | TBD | TBD | TBD |
| M03 | Billers Testing | TBD | TBD | Planned |
| M04 | Bills Testing | TBD | TBD | Planned |
| M05 | Payments Testing | TBD | TBD | Planned |
| M06 | Payment Methods Testing | TBD | TBD | Planned |
| M07 | Regression Testing | TBD | TBD | TBD |
| M08 | Test Closure | TBD | TBD | TBD |

Actual dates and milestone statuses will be updated based on the corresponding testing activities.

## 14. Roles and Responsibilities

### 14.1 Purpose

This section defines the responsibilities associated with test planning, test design, manual execution, automation, defect management, and reporting.

For an individual portfolio project, multiple responsibilities may be performed by the same person.

### 14.2 Responsibility Matrix

| Role | Responsibility | Assigned To |
| --- | --- | --- |
| Test Planner | Define scope, strategy, risks, entry and exit criteria | TBD |
| Test Analyst | Review API documentation and identify test scenarios | TBD |
| Manual API Tester | Design and execute manual API test cases using Postman | TBD |
| Automation Tester | Implement and maintain Playwright API tests | TBD |
| Defect Reporter | Reproduce issues and document defects in Jira | TBD |
| Test Data Owner | Prepare and maintain test data | TBD |
| CI/CD Maintainer | Maintain GitHub Actions workflows and reporting integration | TBD |
| Test Reporter | Prepare execution summaries and test closure reports | TBD |

### 14.3 Responsibility Guidelines

- Test planning responsibilities include maintaining the Master Test Plan.
- Test design responsibilities include preparing test cases and requirement traceability.
- Manual testing responsibilities include executing requests and recording actual results.
- Automation responsibilities include implementing reusable tests and maintaining schema validation.
- Defect management responsibilities include verifying unexpected behavior, creating Jira issues, and tracking retest results.
- Reporting responsibilities include preparing test execution summaries and evaluating exit criteria.

## 15. Requirement Traceability Management

### 15.1 Purpose

Requirement Traceability ensures that applicable API requirements are linked to corresponding test cases and execution results.

The Requirement Traceability Matrix will be maintained in:

`manual-testing/RTM.md`

### 15.2 Traceability Structure

The RTM may include the following fields:

| Field | Description |
| --- | --- |
| Requirement ID | Unique identifier of the requirement |
| Jira Story ID | Related Jira Story |
| Module | API module |
| Endpoint | API endpoint |
| Requirement Description | Expected API behavior |
| Test Case ID | Related test case |
| Test Type | Functional, Validation, Boundary, etc. |
| Execution Status | Pass, Fail, Blocked, Not Run |
| Defect ID | Related Jira Bug, if applicable |
| Coverage Status | Covered, Partially Covered, Not Covered |

### 15.3 Traceability Process

1. Identify requirements from the API documentation.
2. Assign or reference requirement identifiers.
3. Map requirements to the corresponding Jira Stories where applicable.
4. Link each requirement to one or more test cases.
5. Update execution status after manual testing.
6. Link confirmed defects to affected test cases.
7. Review uncovered requirements before test closure.

### 15.4 Coverage Guidelines

- Each applicable requirement should have at least one corresponding test case.
- Multiple test cases may cover the same requirement.
- A single test case may validate multiple related requirements when appropriate.
- Requirements without test coverage should be identified and documented.
- Excluded requirements should be marked as Out of Scope rather than treated as missing coverage.

Detailed requirement mappings will be maintained in the RTM document.

## 16. Test Execution Management

### 16.1 Purpose

Test Execution Management defines how manual API testing results are recorded, reviewed, and maintained.

Detailed execution records may be maintained in Google Sheets.

A consolidated summary will be maintained in:

`manual-testing/TEST_EXECUTION.md`

### 16.2 Execution Workflow

```text
Select Test Case
      ↓
Verify Preconditions
      ↓
Prepare Test Data
      ↓
Execute API Request in Postman
      ↓
Capture Actual Response
      ↓
Compare Expected and Actual Results
      ↓
Assign Execution Status
      ↓
Record Evidence
      ↓
Create / Link Defect if Applicable
      ↓
Retest When Required
      ↓
Update Execution Results
```

### 16.3 Test Execution Status

| Status | Definition |
| --- | --- |
| Pass | Actual result matches the expected result |
| Fail | Actual result does not match the expected result |
| Blocked | Execution cannot proceed because of a dependency or blocking issue |
| Not Run | Test case has not been executed |

### 16.4 Execution Record Fields

Each execution record should include:

- Test Case ID
- Jira Story ID, where applicable
- Module
- Endpoint
- Test Scenario
- Execution Date
- Tester
- Expected Result
- Actual Result
- Execution Status
- Defect Reference
- Evidence
- Notes

### 16.5 Failure Handling

When a test case fails:

1. Review the request configuration and test data.
2. Verify the expected result against the documented requirement.
3. Reproduce the unexpected behavior.
4. Determine whether the failure is caused by test data, environment instability, an incorrect expectation, or a potential backend defect.
5. Create or link a Jira Bug when a defect is confirmed.
6. Update the execution record with evidence and the defect reference.

### 16.6 Retesting

Retesting will be performed when a reported defect has been addressed or when the affected functionality becomes available for verification.

The retest record should include:

- Related Test Case ID
- Related Defect ID
- Retest Date
- Actual Result
- Retest Status
- Evidence / Notes

Regression testing may be performed after successful retesting to verify related functionality.

## 17. Test Metrics and Reporting

### 17.1 Purpose

Test metrics will be used to monitor execution progress, summarize testing outcomes, and support test closure decisions.

Metrics must be calculated from actual test execution and defect records.

### 17.2 Test Execution Metrics

The following metrics may be tracked:

| Metric | Description |
| --- | --- |
| Total Planned Test Cases | Total test cases planned for the reporting scope |
| Total Executed Test Cases | Total test cases with Pass or Fail status |
| Passed Test Cases | Number of test cases with Pass status |
| Failed Test Cases | Number of test cases with Fail status |
| Blocked Test Cases | Number of test cases with Blocked status |
| Not Run Test Cases | Number of test cases not yet executed |
| Execution Progress | Percentage of planned test cases executed |
| Pass Rate | Percentage of executed test cases that passed |

**Execution Progress:**

`Execution Progress (%) = (Executed Test Cases / Planned Test Cases) × 100`

**Pass Rate:**

`Pass Rate (%) = (Passed Test Cases / Executed Test Cases) × 100`

For these formulas, Executed Test Cases includes Pass and Fail results. Blocked and Not Run cases are tracked separately.

Metrics should be marked N/A when the denominator is zero.

### 17.3 Defect Metrics

The following defect metrics may be tracked:

- Total Reported Defects
- Open Defects
- In Progress Defects
- Resolved Defects
- Closed Defects
- Reopened Defects
- Defects by Severity
- Defects by Priority
- Defects by API Module

Defect statuses should follow the configured Jira workflow.

### 17.4 Automation Metrics

Automation reporting may include:

- Total Automated Test Cases
- Automated Test Cases by Module
- Automated Test Execution Results
- Passed / Failed / Skipped Tests
- Automation Execution Duration
- CI/CD Workflow Status
- Regression Test Results

Automation coverage should be measured against a clearly defined set of eligible or planned test cases.

### 17.5 Reporting Sources

| Report | Primary Source |
| --- | --- |
| Manual Test Execution | Google Sheets / TEST_EXECUTION.md |
| Defect Status | Jira / DEFECT_TRACKING.md |
| Requirement Coverage | RTM.md |
| Automation Execution | Allure / Playwright HTML |
| CI/CD Execution | GitHub Actions |
| Test Closure | TEST_SUMMARY_REPORT.md |

### 17.6 Reporting Guidelines

- Manual and automated execution results should be identified separately.
- Test case counts should be based on the selected reporting scope.
- Repeated executions should not automatically be counted as unique test cases.
- Failed test cases and unique Jira defects should be reported separately.
- Unresolved defects should be included in the test closure summary.
- Results should not be presented as completed when execution evidence is unavailable.

## 18. Test Documentation and References

### 18.1 Purpose

This section identifies the primary documentation and test management resources used throughout the project.

The GitHub repository will serve as the central reference for project documentation and automation code.

### 18.2 Documentation Structure

```text
manual-testing/
├── TEST_PLAN.md
├── RTM.md
├── JIRA_BUG_TEMPLATE.md
├── TEST_DATA.md
├── TEST_EXECUTION.md
├── DEFECT_TRACKING.md
├── TEST_SUMMARY_REPORT.md
└── CHANGE_LOG.md
```

This structure represents the planned documentation organization. Documents that have not yet been created should be tracked as planned deliverables.

### 18.3 Reference Documents

| Test Cases | Detailed API test scenarios | Google Sheets – TBD |
| --- | --- | --- |
| Master Test Plan | Testing approach and scope | `manual-testing/TEST_PLAN.md` |
| Test Cases | Detailed API test scenarios | `manual-testing/TEST_CASES_TESTRAIL.csv` |
| Requirement Traceability Matrix | Requirement-to-test mapping | `manual-testing/RTM.md` |
| Jira Bug Template | Standardized defect reporting | `manual-testing/JIRA_BUG_TEMPLATE.md` |
| Test Data | Test data documentation | `manual-testing/TEST_DATA.md` |
| Test Execution | Manual execution results | `manual-testing/TEST_EXECUTION.md` |
| Defect Tracking | Consolidated defect overview | `manual-testing/DEFECT_TRACKING.md` |
| Test Summary Report | Testing outcome and closure | `manual-testing/TEST_SUMMARY_REPORT.md` |
| Change Log | Documentation revision history | `manual-testing/CHANGE_LOG.md` |
| Google Sheets | Detailed test management | TBD |
| Jira | Stories, tasks, and defects | TBD |
| Postman Collection | Manual API requests | `postman/` |
| Automation Tests | Automated API test scripts | `tests/` |
| Reusable Test Components | API clients, fixtures, schemas, utilities | `src/` |
| GitHub Actions | CI/CD workflows | `.github/workflows/` |

### 18.4 Documentation Maintenance

- Test Plan updates should reflect approved or confirmed changes to scope and strategy.
- Test Cases should be updated when requirements or expected behavior change.
- RTM mappings should remain consistent with the test case inventory.
- Test Execution should reflect actual manual execution results.
- Defect Tracking should remain consistent with Jira.
- Test Summary Reports should reflect the selected testing period or module.
- Significant documentation changes should be recorded in the Change Log.

## 19. CI/CD Execution and Notifications

### 19.1 Purpose

CI/CD supports automated regression execution and centralized reporting for the Bill Payment API project.

GitHub Actions will be used to execute automated tests and generate the corresponding results.

### 19.2 CI/CD Tools

| Component | Tool |
| --- | --- |
| Version Control | Git / GitHub |
| CI/CD Platform | GitHub Actions |
| Automation Framework | Playwright + TypeScript |
| HTTP Client | Axios |
| Schema Validation | Zod |
| Test Reporting | Allure / Playwright HTML |
| Report Hosting | GitHub Pages, where configured |
| Notifications | Slack, where configured |

### 19.3 CI/CD Execution Workflow

```text
Code Change / Workflow Trigger
            ↓
GitHub Actions
            ↓
Checkout Repository
            ↓
Install Dependencies
            ↓
Validate / Prepare Test Environment
            ↓
Execute Playwright API Tests
            ↓
Collect Test Results
            ↓
Generate / Publish Reports
            ↓
Record Workflow Status
            ↓
Send Notifications (If Configured)
```

### 19.4 Workflow Triggers

Automated tests may be executed through the following workflow triggers:

- Push to the configured branch
- Pull request to the configured branch
- Manual workflow dispatch

The actual workflow triggers and branch conditions will follow the configuration defined in:

`.github/workflows/playwright.yml`

### 19.5 Automated Test Execution

The CI/CD workflow should:

1. Check out the project repository.
2. Configure the required Node.js environment.
3. Install project dependencies.
4. Prepare the Playwright test environment.
5. Execute the configured API test suite.
6. Collect test execution results.
7. Generate or preserve test reports.
8. Publish available execution artifacts.
9. Report the workflow outcome.

### 19.6 Reporting

Allure Reports may be published through GitHub Pages when the corresponding deployment workflow is configured.

Playwright HTML Reports may be retained as workflow artifacts.

Report availability depends on the actual workflow configuration and execution results.

### 19.7 Notifications

Slack notifications may be used to communicate:

- Workflow execution status
- Test execution outcome
- Report availability
- CI/CD failures requiring investigation

Notification content and delivery conditions will follow the configured workflow.

### 19.8 CI/CD Failure Handling

When automated execution fails:

1. Review the GitHub Actions workflow logs.
2. Identify the failing test cases or workflow steps.
3. Review Allure or Playwright HTML results where available.
4. Verify whether the failure is caused by an API defect, environment instability, test data, or automation implementation.
5. Reproduce suspected backend defects when necessary.
6. Record confirmed defects in Jira.
7. Rerun the affected tests after corrective action.

## 20. Test Plan Approval and Revision History

### 20.1 Document Information

| Field | Value |
| --- | --- |
| Document Title | Bill Payment API – Test Plan |
| Document Type | Master Test Plan |
| Project | Bill Payment API Automation |
| Document Version | TBD |
| Prepared By | TBD |
| Created Date | TBD |
| Last Updated | TBD |
| Review Status | TBD |
| Approved By | TBD |
| Approval Date | TBD |

### 20.2 Review and Approval

The Test Plan should be reviewed when significant changes occur in:

- Testing scope
- API requirements
- Test strategy
- Test environment
- Entry and exit criteria
- Project milestones
- Test deliverables

For an individual portfolio project, formal external approval may not be applicable. In that case, the document review status may be recorded as Self-Reviewed.

Approval should not be marked as completed unless the relevant review or approval has actually occurred.

### 20.3 Revision History

| Version | Date | Section | Description of Changes | Updated By |
| --- | --- | --- | --- | --- |
| TBD | TBD | Initial Test Plan | Initial document preparation | TBD |
| TBD | TBD | TBD | TBD | TBD |

Detailed changes across project testing documents may also be recorded in:

`manual-testing/CHANGE_LOG.md`

### 20.4 Document Maintenance

- The Master Test Plan should remain consistent with the current testing scope.
- Changes to API coverage should be reflected in the Module Coverage section.
- Testing milestones should be updated when actual dates become available.
- Test deliverables should be updated as documents and reports are completed.
- Revision History should record significant changes to this Test Plan.
- Historical execution results should remain traceable to the relevant testing period or version.

---
