const webhookUrl = process.env.SLACK_WEBHOOK_URL;

if (!webhookUrl) {
    console.error('Missing SLACK_WEBHOOK_URL');
    process.exit(1);
}

const {
    CI_STATUS = 'unknown',
    DEPLOY_STATUS = 'unknown',
    REPORT_URL = '',
    GITHUB_REPOSITORY = '',
    GITHUB_RUN_ID = '',
    GITHUB_SERVER_URL = 'https://github.com',
    GITHUB_REF_NAME = '',
} = process.env;

const workflowUrl =
    `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;

const lines = [
    '*Bill Payment API — Playwright CI/CD*',
    `*CI Status:* ${CI_STATUS.toUpperCase()}`,
    `*Deploy Status:* ${DEPLOY_STATUS.toUpperCase()}`,
    `*Branch:* ${GITHUB_REF_NAME}`,
    `*Workflow:* ${workflowUrl}`,
];

if (DEPLOY_STATUS === 'success' && REPORT_URL) {
    lines.push(`*HTML Report:* ${REPORT_URL}`);
} else {
    lines.push('*HTML Report:* Check workflow artifacts');
}

const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        text: lines.join('\n'),
    }),
});

if (!response.ok) {
    throw new Error(
        `Slack notification failed: HTTP ${response.status}`
    );
}

console.log('Slack notification sent successfully');
