const HEADER_ROW = [
  "Monthly EMI",
  "Total Payment",
  "Total Interest",
  "Principal",
];

const TABLE_HEADER_ROW = [
  "Month",
  "EMI",
  "Interest",
  "Principal",
  "Remaining Amount",
];

const EmiTable = ({ calculation }) => {
  const {
    principal,
    monthlyEmi,
    totalPayment,
    totalInterest,
    interestRate,
    schedule,
  } = calculation;

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
            <td className="text-base px-6 py-2 font-semibold text-blue-600">
              {monthlyEmi}
            </td>
            <td className="text-base px-6 py-2 font-semibold text-gray-600">
              {totalPayment}
            </td>
            <td className="text-base px-6 py-2 font-semibold text-red-400">
              {totalInterest}
            </td>
            <td className="text-base px-6 py-2 font-semibold text-green-400">
              {principal}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="max-h-96 mt-1 overflow-x-auto overflow-y-auto sm:overflow-x-hidden border border-gray-200 custom-scroll">
        <table className="min-w-full">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="">
              {TABLE_HEADER_ROW.map((heading) => {
                return (
                  <th
                    key={heading}
                    className="px-4 md:px-6 py-2 md:py-3 text-left text-sm font-semibold text-gray-600"
                  >
                    {heading}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="min-w-full">
            {schedule.map((row) => {
              return (
                <tr key={row.Month} className="border-t border-gray-200">
                  {TABLE_HEADER_ROW.map((data) => {
                    return (
                      <td
                        key={data}
                        className="px-4 md:px-6 py-2 text-gray-700"
                      >
                        {row[data]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmiTable;
