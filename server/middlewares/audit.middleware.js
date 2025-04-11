import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auditLogPath = path.join(__dirname, '../../logs/audit.log');

export const auditLogger = (req, res, next) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        userId: req.user?.userId || 'Unknown',
        endpoint: req.originalUrl,
        method: req.method,
        ip: req.ip
    };

    fs.appendFile(auditLogPath, JSON.stringify(logEntry) + '\n', (err) => {
        if (err) {
            console.error('Failed to write audit log:', err);
        }
    });

    next();
};