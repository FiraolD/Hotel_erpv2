export default function EmailRow({ log, onResend }) {
  return (
    <tr className="border-t">
      <td className="p-2">{log.to}</td>
      <td className="p-2">{log.subject}</td>
      <td className={`p-2 font-bold ${log.status === "sent" ? "text-green-600" : "text-red-600"}`}>
        {log.status}
      </td>
      <td className="p-2">{new Date(log.createdAt).toLocaleString()}</td>
      <td className="p-2">
        <button
          onClick={() => onResend(log)}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Resend
        </button>
      </td>
    </tr>
  );
}