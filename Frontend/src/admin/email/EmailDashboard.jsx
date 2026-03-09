import { useEffect, useState } from "react";
import { getEmailLogs, resendEmail } from "../../api/emailApi";
import EmailRow from "./EmailRow";
import EmailFilters from "./EmailFilters";

export default function EmailDashboard() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const data = await getEmailLogs();
    setLogs(data);
  };

  const handleResend = async (email) => {
    await resendEmail(email);
    fetchLogs();
  };

  const filteredLogs = filter
    ? logs.filter((l) => l.subject.toLowerCase().includes(filter.toLowerCase()))
    : logs;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Email Logs</h1>
      <EmailFilters filter={filter} setFilter={setFilter} />
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">To</th>
            <th className="p-2">Subject</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log) => (
            <EmailRow key={log.id} log={log} onResend={handleResend} />
          ))}
        </tbody>
      </table>
    </div>
  );
}