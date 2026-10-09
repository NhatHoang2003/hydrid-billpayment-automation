# Bill Payment API – Defect Tracking and Management

**Project:** Bill Payment API Automation  
**Document:** Defect Tracking and Management  
**Testing Approach:** Hybrid Manual and Automation Testing  
**Defect Management:** Jira  
**Test Management:** Google Sheets  
**Manual Testing:** Postman  
**Automation Testing:** Playwright + TypeScript + Axios + Zod  
**Document Status:** In Progress

---

## 1. Introduction

This document defines the defect tracking and management process
for the Bill Payment API testing project.

It describes how defects are identified, classified, reported,
tracked, investigated, retested, and closed.

The project uses Jira as the primary defect management system.

Google Sheets maintains manual test execution results, while
Playwright and Allure provide automated execution evidence.

This document also defines the structure for consolidating
defect information into test progress and summary reports.

## 2. Objectives

The objectives of defect tracking are to:

- Maintain visibility of identified API defects.
- Track defects throughout their lifecycle.
- Establish consistent severity and priority classifications.
- Link defects to affected requirements and test cases.
- Prevent duplicate defect reporting.
- Support defect investigation and resolution.
- Track defect retesting and regression results.
- Identify unresolved risks.
- Provide accurate defect metrics.
- Support final test reporting and closure.

## 3. Defect Tracking Scope

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

Potential defects may be identified through:

- Manual testing using Postman.
- Automated testing using Playwright.
- HTTP status code assertions.
- Zod response schema validation.
- Functional testing.
- Negative testing.
- Boundary value testing.
- Request validation testing.
- Regression testing.
- Defect retesting.

### 3.3 Defect Tracking Boundaries

A failed test execution does not automatically represent
a confirmed application defect.

Failures may originate from:

- Application defects.
- Incorrect test expectations.
- Automation script defects.
- Test data issues.
- Environment instability.
- Missing prerequisites.
- Unclear requirements.

The cause must be investigated before a Jira Bug
is created or linked.

## 4. Defect Management Tools

| Tool          | Responsibility                         |
| ------------- | -------------------------------------- |
| Jira          | Defect lifecycle and issue tracking    |
| Google Sheets | Manual test execution and references   |
| Postman       | Manual reproduction and evidence       |
| Playwright    | Automated execution and assertions     |
| Allure        | Automated execution reporting          |
| GitHub Actions| CI execution evidence                  |
| GitHub        | Test code and documentation            |

### 4.1 Source of Truth

Jira is the source of truth for:

- Bug identifiers.
- Bug summaries.
- Defect status.
- Severity and priority, where configured.
- Assignees.
- Resolution information.
- Defect discussions and history.

Google Sheets is the source of truth for manual
test execution results.

Automated execution results are obtained from the
relevant Playwright or Allure report.

The defect summary in this document must not
override current Jira records.

## 5. Defect Identification

### 5.1 Identification Criteria

A potential defect is identified when the observed
API behavior differs from an approved requirement
or expected result.

Examples include:

- Incorrect HTTP status code.
- Invalid request data being accepted.
- Valid request data being rejected.
- Incorrect response structure.
- Missing required response fields.
- Incorrect pagination metadata.
- Unexpected filtering or search behavior.
- Incorrect user creation or update behavior.
- Unexpected authentication behavior.

### 5.2 Initial Investigation

Before confirming a defect:

1. Review the related test case.
2. Verify the expected result.
3. Review the API specification.
4. Confirm the request method and endpoint.
5. Verify request headers and parameters.
6. Verify test data and prerequisites.
7. Reproduce the unexpected behavior.
8. Check whether the environment is stable.
9. Search Jira for existing related Bugs.
10. Determine whether a new Bug is required.

### 5.3 Backend Instability

The practice API environment may produce
inconsistent responses during different executions.

For example, an endpoint may return:

- An unexpected success response.
- A server error.
- Different pagination metadata.
- An empty response during one execution
  and populated data during another.

Such observations should be recorded with their
execution timestamps and relevant evidence.

A temporary server error should not automatically
be classified as an application defect without
appropriate investigation.

## 6. Defect Classification

### 6.1 Severity Levels

Severity represents the impact of a defect.

| Severity | Description                                  |
| -------- | -------------------------------------------- |
| Critical | Core functionality unavailable or major risk |
| Major    | Important functionality behaves incorrectly  |
| Minor    | Limited functionality or validation issue    |
| Trivial  | Low-impact inconsistency                     |

### 6.2 Priority Levels

Priority represents the urgency of resolution.

| Priority | Description                           |
| -------- | ------------------------------------- |
| Highest  | Immediate attention required          |
| High     | High resolution urgency               |
| Medium   | Normal resolution priority            |
| Low      | Can be addressed later                |
| Lowest   | Minimal urgency                       |

### 6.3 Severity and Priority Rules

Severity and priority must be evaluated separately.

The classification should consider:

- Affected functionality.
- Business or technical impact.
- Frequency of occurrence.
- Number of affected test scenarios.
- Availability of a workaround.
- Impact on subsequent testing.
- Release or project priorities.

An unexpected HTTP response must not automatically
be assigned Critical severity.

## 7. Defect Lifecycle

### 7.1 Proposed Workflow

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

This is a proposed workflow.

Actual status names must follow the configured
Jira project workflow.

### 7.2 Defect Status Definitions

| Status           | Description                         |
| ---------------- | ----------------------------------- |
| Open             | Defect has been reported            |
| In Progress      | Defect is being investigated/fixed  |
| Ready for Retest | A fix is available for verification |
| Retesting        | Tester is verifying the fix         |
| Reopened         | Defect remains after the fix        |
| Closed           | Defect has been verified and closed |

Additional Jira statuses may be used where applicable.

## 8. Defect Reporting Procedure

### 8.1 Create a Defect

1. Confirm the unexpected API behavior.
2. Review existing Jira Bugs.
3. Identify the affected module and endpoint.
4. Record the related Test Case ID.
5. Record the related Requirement ID, if available.
6. Prepare reproduction steps.
7. Capture expected and actual results.
8. Collect sanitized execution evidence.
9. Assign severity and priority.
10. Create the Jira Bug.
11. Link the Bug to the relevant execution record.
12. Update the RTM where applicable.

### 8.2 Required Defect Fields

| Field              | Description                         |
| ------------------ | ----------------------------------- |
| Jira Bug ID        | Unique Jira issue identifier        |
| Summary            | Description of the observed problem |
| Module             | Affected API module                 |
| Endpoint           | HTTP method and API path            |
| Test Case ID       | Related test case                   |
| Requirement ID     | Related requirement                 |
| Expected Result    | Expected API behavior               |
| Actual Result      | Observed API behavior               |
| Severity           | Defect impact                       |
| Priority           | Resolution urgency                  |
| Status             | Current Jira workflow status        |
| Environment        | Environment where issue occurred    |
| Evidence           | Supporting execution evidence       |
| Reported Date      | Date the defect was created         |
| Retest Result      | Result of defect verification       |

The exact fields available in Jira may vary.

### 8.3 Bug Report Template

Use the standardized template defined in:

`manual-testing/JIRA_BUG_TEMPLATE.md`

## 9. Defect Traceability

### 9.1 Traceability Model

```text
API Requirement
       |
       v
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
Defect Retest
       |
       v
Regression Testing
```

### 9.2 Traceability Rules

Each confirmed defect should reference:

- The affected API module.
- The affected endpoint.
- At least one relevant test case.
- The applicable requirement, where identified.
- The execution evidence.
- The Jira Bug ID.
- The retest result, when available.

A single defect may affect multiple test cases.

Multiple test cases may therefore reference
the same Jira Bug.

### 9.3 Requirement Traceability

Requirement-to-defect relationships are maintained
through the RTM.

Reference:

`manual-testing/RTM.md`

## 10. Defect Consolidation

### 10.1 Purpose

Defect consolidation prevents multiple Jira Bugs
from being created for the same underlying problem.

For example, several invalid pagination parameters
may expose a common input validation issue.

### 10.2 Consolidation Criteria

Test failures may be consolidated when they share:

- The same affected endpoint or component.
- The same observable defect behavior.
- The same underlying validation problem.
- A confirmed common root cause, where known.

### 10.3 Consolidation Procedure

1. Identify related failed test cases.
2. Compare expected and actual results.
3. Compare request parameters.
4. Review existing Jira Bugs.
5. Determine whether failures represent one defect.
6. Link related test cases to the appropriate Bug.
7. Document the relationship in the defect record.

Do not consolidate unrelated failures solely
because they affect the same API endpoint.

## 11. Defect Tracking Register

### 11.1 Register Purpose

The defect tracking register provides a
high-level view of confirmed Jira Bugs.

The detailed defect records remain in Jira.

### 11.2 Defect Register Template

| Jira Bug ID | Module | Endpoint | Severity | Priority | Status | Retest |
| ----------- | ------ | -------- | -------- | -------- | ------ | ------ |
| TBD         | TBD    | TBD      | TBD      | TBD      | TBD    | TBD    |

This table is a template.

Replace the placeholder row with actual Jira
records when they have been verified.

### 11.3 Defect-to-Test Case Mapping

| Jira Bug ID | Test Case ID | Requirement ID | Execution Status |
| ----------- | ------------ | -------------- | ---------------- |
| TBD         | TBD          | TBD            | TBD              |

One Jira Bug may be associated with multiple
Test Case IDs.

### 11.4 Register Update Rules

The register should be reviewed when:

- A new Jira Bug is created.
- An existing Bug changes status.
- Severity or priority changes.
- A fix becomes available.
- Retesting is completed.
- A defect is reopened.
- A defect is closed.

The Jira record remains authoritative.

## 12. Defect Retesting

### 12.1 Retesting Entry Criteria

Retesting may begin when:

- A fix has been reported.
- The relevant environment is accessible.
- The original test case is available.
- Required test data can be prepared.
- The defect is ready for verification.

### 12.2 Retesting Procedure

1. Open the Jira Bug.
2. Review the original defect description.
3. Review the expected result.
4. Prepare the original test data.
5. Execute the affected test case.
6. Compare actual and expected results.
7. Record the retest outcome.
8. Update the Jira Bug.
9. Perform related regression testing.

### 12.3 Retest Result Definitions

| Result  | Description                             |
| ------- | --------------------------------------- |
| Passed  | The reported issue is no longer present |
| Failed  | The issue remains reproducible          |
| Blocked | Retesting cannot be completed           |
| Not Run | Retesting has not been performed        |

### 12.4 Failed Retesting

If the defect remains reproducible:

- Preserve the new execution evidence.
- Update the Jira Bug.
- Reopen the defect or use the appropriate
  configured Jira status.
- Record the failed retest.
- Wait for another fix before repeating retesting.

## 13. Regression Testing

### 13.1 Regression Scope

Regression testing should include:

- The original failing test case.
- Related validation scenarios.
- Relevant positive scenarios.
- Related API operations.
- Response schema validation.
- Relevant authentication scenarios.

### 13.2 Regression Procedure

1. Identify the affected functionality.
2. Select related regression test cases.
3. Execute the regression tests.
4. Review unexpected results.
5. Investigate any new failures.
6. Record regression outcomes.
7. Link new confirmed defects to Jira.

### 13.3 Regression Evidence

Regression evidence may include:

- Execution date.
- Tested module.
- Test Case IDs.
- Execution environment.
- Playwright report reference.
- Allure report reference.
- Related Jira Bugs.

## 14. Defect Metrics

### 14.1 Core Defect Metrics

The following metrics may be reported:

- Total confirmed defects.
- Open defects.
- In-progress defects.
- Closed defects.
- Reopened defects.
- Defects by severity.
- Defects by priority.
- Defects by module.
- Retested defects.
- Passed retests.
- Failed retests.
- Blocked retests.

### 14.2 Defect Status Distribution

```text
Defect Status Distribution (%) =
(Defects in a Specific Status / Total Confirmed Defects) × 100
```

### 14.3 Defect Closure Rate

```text
Defect Closure Rate (%) =
(Closed Defects / Total Confirmed Defects) × 100
```

### 14.4 Defect Reopen Rate

```text
Defect Reopen Rate (%) =
(Reopened Defects / Defects Retested) × 100
```

The reopen rate definition must remain consistent
across reporting periods.

### 14.5 Metric Calculation Rules

- Use confirmed Jira Bugs only.
- State the reporting date.
- Avoid counting the same Jira Bug multiple times.
- Do not treat every failed test case as a unique defect.
- Exclude unconfirmed issues from confirmed defect totals.
- Report N/A when a denominator is zero.
- Use Jira records to determine current defect statuses.

## 15. Defect Summary Template

### 15.1 Reporting Information

| Field            | Value |
| ---------------- | ----- |
| Reporting Date   | TBD   |
| Reporting Period | TBD   |
| Environment      | TBD   |
| Tested Modules   | TBD   |
| Jira Project     | TBD   |
| Prepared By      | TBD   |

### 15.2 Defect Summary

| Metric             | Value |
| ------------------ | ----- |
| Total Defects      | TBD   |
| Open               | TBD   |
| In Progress        | TBD   |
| Ready for Retest   | TBD   |
| Reopened           | TBD   |
| Closed             | TBD   |
| Critical           | TBD   |
| Major              | TBD   |
| Minor              | TBD   |
| Trivial            | TBD   |

### 15.3 Defect Observations

```text
Major Defect Trends:
[TBD]

Affected API Modules:
[TBD]

Recurring Issues:
[TBD]

Environment-Related Problems:
[TBD]

Outstanding Defects:
[TBD]

Retesting Progress:
[TBD]

Recommended Actions:
[TBD]
```

## 16. Defect Evidence Management

### 16.1 Manual Testing Evidence

Manual evidence may include:

- Postman request information.
- Query parameters.
- Sanitized request body.
- HTTP response status.
- Relevant response fields.
- Error code and message.
- Postman screenshots.

### 16.2 Automation Testing Evidence

Automation evidence may include:

- Playwright test title.
- Test Case ID.
- Test file path.
- Assertion error.
- Expected and actual values.
- Playwright HTML report.
- Allure report.
- GitHub Actions execution reference.

### 16.3 Evidence Security

Defect evidence must not expose:

- Client secrets.
- User passwords.
- Access tokens.
- Refresh tokens.
- Sensitive customer information.

Sensitive values must be masked before
sharing or attaching evidence.

## 17. Risks and Limitations

| Risk                        | Impact                              | Mitigation                         |
| --------------------------- | ----------------------------------- | ---------------------------------- |
| Backend instability         | Inconsistent reproduction           | Capture evidence and retest        |
| Shared test data            | Unexpected changes between runs     | Use controlled test records        |
| Duplicate Jira Bugs         | Inaccurate defect totals            | Search existing issues first       |
| Unclear API requirements    | Incorrect defect classification     | Review specifications              |
| Missing execution evidence  | Difficult defect investigation      | Preserve relevant test results     |
| Unavailable fix             | Retesting delayed                   | Track pending defects              |
| Expired credentials         | Authentication failures             | Refresh test credentials safely    |
| Unavailable test environment| Testing and retesting blocked       | Record environment limitations     |

## 18. Defect Management Responsibilities

| Role              | Responsibility                              |
| ----------------- | ------------------------------------------- |
| Tester            | Identify, report, and retest defects        |
| Automation Tester | Investigate automation failures             |
| Developer         | Investigate and resolve application defects |
| Project Owner     | Review defect progress and risks            |

In this portfolio project, multiple responsibilities
may be performed by the same contributor.

These role definitions do not imply the existence
of an unverified project team.

## 19. Defect Closure Criteria

A defect may be closed when:

- The reported issue has been addressed.
- The original failing scenario has been retested.
- The actual result matches the expected result.
- Relevant regression tests have been performed.
- Retest evidence has been recorded.
- The Jira Bug has been updated.
- No unresolved issue prevents closure.

If the defect remains reproducible, it should
not be closed as successfully verified.

Alternative resolutions, such as duplicate or
won't fix, must follow the configured Jira process.

## 20. References

| Resource                 | Location                                |
| ------------------------ | --------------------------------------- |
| Master Test Plan         | `manual-testing/TEST_PLAN.md`           |
| Requirement Traceability | `manual-testing/RTM.md`                 |
| Test Data Management     | `manual-testing/TEST_DATA.md`           |
| Jira Bug Template        | `manual-testing/JIRA_BUG_TEMPLATE.md`   |
| Test Execution           | `manual-testing/TEST_EXECUTION.md`      |
| Test Cases               | Google Sheets – TBD                     |
| Manual Execution Results | Google Sheets – TBD                     |
| Test Summary Report      | `manual-testing/TEST_SUMMARY_REPORT.md` |
| Automation Tests         | `tests/`                                |
| CI/CD Workflow           | `.github/workflows/playwright.yml`      |

## 21. Revision History

| Version | Date       | Description                           | Updated By |
| ------- | ---------- | ------------------------------------- | ---------- |
| 1.0     | 2026-10-09 | Initial defect tracking documentation | TBD        |

---
