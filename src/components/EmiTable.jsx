import { formatMoney, formatMonth } from "./utilitiesFunc";

const HEADER_ROW = [
  "Monthly EMI",
  "Total Payment",
  "Total Interest",
  "Principal",
];

const TABLE_COLUMNS = [
  { key: "month", label: "Month" },
  { key: "emi", label: "EMI" },
  { key: "interestPaid", label: "Interest" },
  { key: "principalPaid", label: "Principal" },
  { key: "balance", label: "Remaining Amount" },
];

const EmiTable = ({ calculation }) => {
  const { principal, monthlyEmi, totalPayment, totalInterest, schedule } =
    calculation;

  // Header for heading table
  const HeaderRow = ({ children }) => (
    <th className="uppercase text-xs px-3 md:px-6 py-2 text-left font-semibold text-gray-500">
      {children}
    </th>
  );

  // Heading for main(EMI) table
  const TableHeader = ({ children }) => (
    <th className="px-4 md:px-6 py-2 md:py-3 text-left text-sm font-semibold text-gray-600">
      {children}
    </th>
  );

  return (
    <div className="w-full">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {HEADER_ROW.map((heading) => (
              <HeaderRow key={heading}>{heading}</HeaderRow>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-base px-8 py-2 font-semibold text-blue-600">
              {formatMoney(monthlyEmi)}
            </td>
            <td className="text-base px-8 py-2 font-semibold text-gray-600">
              {formatMoney(totalPayment)}
            </td>
            <td className="text-base px-8 py-2 font-semibold text-red-400">
              {formatMoney(totalInterest)}
            </td>
            <td className="text-base px-8 py-2 font-semibold text-green-400">
              {formatMoney(principal)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="max-h-96 mt-1 overflow-x-auto overflow-y-auto sm:overflow-x-hidden border border-gray-200 custom-scroll">
        <table className="min-w-full">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {TABLE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-4 md:px-6 py-2 md:py-3 text-left text-sm font-semibold text-gray-600"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.month} className="border-t border-gray-200">
                {TABLE_COLUMNS.map((col) => (
                  <td key={col.key} className="px-4 md:px-7 py-2 text-gray-700">
                    {col.key === "month"
                      ? formatMonth(row[col.key], schedule.length)
                      : formatMoney(row[col.key])}
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

export default EmiTable;
