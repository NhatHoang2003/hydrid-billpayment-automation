import { randomUUID } from "crypto";

export function generateUniqueEmail(prefix = 'test-user'): string {
    return `${prefix}.${Math.random()
        .toString(36)
        .substring(2, 8)}@example.com`
}

export function generateEmailWithLength(length: number): string {
    const domain = '@example.com';
    const localPartLength = length - domain.length;

    if (localPartLength <= 0) {
        throw new Error(`Invalid email length: ${length}`);
    }

    const unique = randomUUID().replace(/-/g, '');

    const localPart = unique
        .padEnd(localPartLength, 'a')
        .slice(0, localPartLength);

    return `${localPart}${domain}`;
}