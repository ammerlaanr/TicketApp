import { useState, type JSX } from 'react';
import axios from 'axios';

type TransactionLog = {
  timestamp?: string;
  userId?: string;
  eventId?: string;
  tickets?: string[];
  aantaltickets?: number;
  address?: string;
  [key: string]: any;
};

type RegistrationLog = {
  timeStamp?: string;
  voornaam?: string;
  achternaam?: string;
  email?: string;
  wachtwoord?: string;
  postcode?: string;
  huisnummer?: string;
  straatnaam?: string;
  woonplaats?: string;
  [key: string]: any;
};

type Log = TransactionLog | RegistrationLog;

export default function LoggingTables(): JSX.Element {
  const [transactions, setTransactions] = useState<TransactionLog[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationLog[]>([]);
  
  axios.get('http://localhost:4000/logs')
  .then((response) => {
    setTransactions(response.data.transactions);
    setRegistrations(response.data.registrations);
  })
  .catch((err) => console.log('Problemen bij ophalen van logging: ', err ));

  const getColumns = (logList: Log[]): string[] =>
    Array.from(new Set(logList.flatMap(log => Object.keys(log))));

  const renderTable = (title: string, data: Log[]): JSX.Element => {
    const columns = getColumns(data);

    return (
      <div className="mb-5">
        <h5 className="mb-3">{title}</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-sm table-hover">
            <thead className="table-light">
              <tr>
                {columns.map(col => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((log, index) => (
                <tr key={index}>
                  {columns.map(col => (
                    <td key={col}>
                      {Array.isArray(log[col])
                        ? log[col].join(', ')
                        : log[col] ?? '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">📋 Logging overzicht</h4>
      {transactions.length > 0 && renderTable("🧾 Transactie Logs", transactions)}
      {registrations.length > 0 && renderTable("👤 Registratie Logs", registrations)}
    </div>
  );
}