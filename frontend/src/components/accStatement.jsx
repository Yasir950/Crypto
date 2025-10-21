import React from "react";

function AccountStatement() {
  // Example monthly data
  const monthlyStatements = [
    { date: "2025-01-31", month: "January" },
    { date: "2025-02-28", month: "February" },
    { date: "2025-03-31", month: "March" },
    { date: "2025-04-30", month: "April" },
    { date: "2025-05-31", month: "May" },
    { date: "2025-06-30", month: "June" },
  ];

  // Example download function (replace with actual API or file logic)
  const handleDownload = (month) => {
    alert(`Downloading statement for ${month}`);
    // Example: window.open(`/api/download/${month}`, "_blank");
  };

  return (
    <div className="bg-white min-h-screen px-4 sm:px-20 py-10 w-full">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center mb-10">
        Monthly Account Statement
      </h2>

      {/* Table */}
      <button className="bg-[#D9D9D9]  py-2 rounded-lg px-6  mb-4">
        Monthly Statement
      </button>
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 border-b text-gray-600 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Month</th>
              <th className="py-3 px-4 text-center">Download</th>
            </tr>
          </thead>
          <tbody>
            {monthlyStatements.map((s, i) => (
              <tr
                key={i}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">{s.date}</td>
                <td className="py-3 px-4">{s.month}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDownload(s.month)}
                    className="bg-[#D9D9D9] text-black  py-2 px-4 rounded-lg text-xs hover:bg-[#D9D9D9] transition"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountStatement;
