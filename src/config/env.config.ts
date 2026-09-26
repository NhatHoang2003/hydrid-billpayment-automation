import * as dotenv from 'dotenv';
import path from 'path';

// Cho phép đổi môi trường qua ENV_FILE, ví dụ: ENV_FILE=.env.staging npm run test:api
dotenv.config({ path: path.resolve(process.cwd(), process.env.ENV_FILE || '.env') });

export type AuthMethod = 'apiKeyHeader' | 'apiKeyQuery' | 'bearer' | 'basic' | 'cookie' | 'oauth2ClientCredentials' | 'oauth2Password';

export interface EnvConfig {
    baseURL: string;
    timeout: number;
    retries: number;
    defaultAuthMethod: AuthMethod;
    auth: {
        apiKey: string;
        apiKeyHeader: string;
        apiKeyQueryName: string;
        bearerToken: string;
        basicUser: string;
        basicPassword: string;
        sessionCookie: string;
        oauth: {
            tokenUrl: string;
            clientId: string;
            clientSecret: string;
            username?: string;
            password?: string;
            scopes: string[];
        };
    };
    demoData: {
        users: string[];
        billers: {
            airtelPostpaid: string;
            jioPrepaid: string;
            tataPower: string;
        };
        paymentMethods: {
            upi: string;
            card: string;
        };
    };
    rateLimit: {
        limitPerMinute: number;
    };
    reporting: {
        testrailEnabled: boolean;
        jiraEnabled: boolean;
    };
    ci: boolean;
}

function envOrDefault(name: string, fallback: string): string {
    return process.env[name] ?? fallback;
}

export const env: EnvConfig = {
    baseURL: envOrDefault(
        'API_BASE_URL',
        'https://billpay-api.gauravkhurana-practice-api.workers.dev'
    ),
    timeout: Number(process.env.API_TIMEOUT_MS ?? 30_000),
    retries: Number(process.env.API_RETRIES ?? 2),
    defaultAuthMethod: (process.env.DEFAULT_AUTH_METHOD as AuthMethod) ?? 'apiKeyHeader',

    auth: {
        apiKey: envOrDefault('API_KEY', 'demo-api-key-123'),
        apiKeyHeader: 'X-API-Key',
        apiKeyQueryName: 'api_key',
        bearerToken: envOrDefault('BEARER_TOKEN', 'demo-jwt-token-456'),
        basicUser: envOrDefault('BASIC_AUTH_USER', 'demo'),
        basicPassword: envOrDefault('BASIC_AUTH_PASSWORD', 'password123'),
        sessionCookie: envOrDefault('SESSION_COOKIE', 'demo-session-abc123'),
        oauth: {
            tokenUrl: '/oauth/token',
            clientId: envOrDefault('OAUTH_CLIENT_ID', 'demo-client'),
            clientSecret: envOrDefault('OAUTH_CLIENT_SECRET', 'demo-secret-789'),
            username: envOrDefault('OAUTH_USERNAME', 'demo'),
            password: envOrDefault('OAUTH_PASSWORD', 'password123'),
            scopes: ['read:all', 'write:all'],
        },
    },

    demoData: {
        users: ['user-demo-001', 'user-demo-002', 'user-demo-003'],
        billers: {
            airtelPostpaid: 'biller-airtel-postpaid',
            jioPrepaid: 'biller-jio-prepaid',
            tataPower: 'biller-tata-power',
        },
        paymentMethods: {
            upi: 'pm-upi-001',
            card: 'pm-card-001',
        },
    },

    rateLimit: {
        limitPerMinute: 100,
    },

    reporting: {
        testrailEnabled: process.env.TESTRAIL_ENABLE === 'true',
        jiraEnabled: process.env.JIRA_ENABLE === 'true',
    },

    ci: process.env.CI === 'true',
};

export function getAuthHeaders(method: AuthMethod = env.defaultAuthMethod): Record<string, string> {
    switch (method) {
        case 'apiKeyHeader':
            return { [env.auth.apiKeyHeader]: env.auth.apiKey };
        case 'bearer':
            return { Authorization: `Bearer ${env.auth.bearerToken}` };
        case 'basic': {
            const encoded = Buffer.from(`${env.auth.basicUser}:${env.auth.basicPassword}`).toString('base64');
            return { Authorization: `Basic ${encoded}` };
        }
        case 'cookie':
            return { Cookie: `session_id=${env.auth.sessionCookie}` };
        case 'oauth2ClientCredentials':
        case 'oauth2Password':
            return {};
        default:
            return {};
    }
}