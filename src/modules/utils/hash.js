import crypto from 'crypto';

export function stringToHash(string) {
    return crypto.createHash('sha256').update(JSON.stringify(string)).digest('hex')
}
