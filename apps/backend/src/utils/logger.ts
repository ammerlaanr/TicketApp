import fs from 'fs';
import path from 'path';

const LOG_PATH = path.resolve('./logs/transactions.log');

export function logTransaction({ userId, eventId, tickets, address }: {userId: string, eventId: string, tickets: any, address: string}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    userId,
    eventId,
    tickets,
    address,
  };

  fs.appendFileSync(LOG_PATH, JSON.stringify(logEntry) + '\n', 'utf8');
}