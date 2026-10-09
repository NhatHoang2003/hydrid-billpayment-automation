# Bill Payment API – Change Log

**Project:** Bill Payment API Hybrid Manual & Automation Testing  
**Document Status:** Active  
**Last Updated:** 2026-10-09

---

## 1. Purpose

This document tracks significant changes to the project's testing framework, test cases, CI/CD configuration, and QA documentation.

Git commit history is the source of truth for exact implementation dates and code changes.

## 2. Project Change History

| Area | Changes | Status |
| --- | --- | --- |
| Framework | Set up Playwright, TypeScript, Axios, API clients, and fixtures | Implemented |
| Authentication | Designed 23 test cases covering OAuth grant types and validation | Designed |
| Users | Designed 52 test cases covering CRUD, pagination, filtering, and validation | Designed |
| Schema Validation | Added Zod schemas and validation helpers | Implemented |
| Test Data | Added dynamic data generation and cleanup handling | Implemented |
| Defect Management | Tracked API validation issues and backend inconsistencies through Jira | In Progress |
| CI/CD | Configured GitHub Actions for automated testing and reporting | Implemented |
| Reporting | Integrated Playwright HTML and Allure reports | Implemented |
| Manual Testing | Organized test cases and execution records using Google Sheets | In Progress |
| Documentation | Prepared test planning, traceability, execution, and defect management documents | Prepared |

## 3. Documentation Change History

| Document | Description |
| --- | --- |
| `TEST_PLAN.md` | Defined testing scope, strategy, schedule, and exit criteria |
| `RTM.md` | Defined requirement-to-test traceability |
| `TEST_DATA.md` | Documented test data preparation and management |
| `JIRA_BUG_TEMPLATE.md` | Standardized Jira Bug reporting |
| `TEST_EXECUTION.md` | Defined manual and automated test execution procedures |
| `DEFECT_TRACKING.md` | Defined defect tracking, retesting, and reporting |
| `TEST_SUMMARY_REPORT.md` | Prepared the test summary and closure assessment |
| `CHANGE_LOG.md` | Recorded significant project and documentation changes |

## 4. Known Issues and Pending Work

- Verify current test execution results against Google Sheets and Allure.
- Reconcile Jira Bugs and their current statuses.
- Complete missing requirement and test case mappings.
- Verify backend issues that produced inconsistent API responses.
- Continue testing the remaining planned API modules.
- Finalize the Test Summary Report using verified results.

## 5. Change Management Rules

- Record significant changes to test scope, framework, or documentation.
- Use Git history to verify implementation dates.
- Keep test execution results in Google Sheets and automated reports.
- Keep defect statuses and resolution details in Jira.
- Update affected documentation when requirements or test behavior change.

## 6. References

- [GitHub Repository](https://github.com/NhatHoang2003/hydrid-billpayment-automation)
- [Allure Report](https://nhathoang2003.github.io/hydrid-billpayment-automation/)
- `manual-testing/TEST_PLAN.md`
- `manual-testing/RTM.md`
- `manual-testing/TEST_SUMMARY_REPORT.md`

---
