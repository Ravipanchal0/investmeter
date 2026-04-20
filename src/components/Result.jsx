import React from "react";
import { formatMoney } from "./utilitiesFunc";

const Result = ({ investedAmount, estimatedInterest, maturityAmount }) => {
  const AMOUNT_DETAILS = [
    { label: "Invested Amount", value: formatMoney(investedAmount) },
    {
      label: "Estimated Interest",
      value: formatMoney(estimatedInterest),
    },
    { label: "Total Amount", value: formatMoney(maturityAmount) },
  ];
  return (
    <>
      <div className="w-full space-y-3">
        {AMOUNT_DETAILS.map((amount) => {
          return (
            <div
              key={amount.label}
              className="w-full flex items-center justify-between gap-5"
            >
              <p className="text-sm text-gray-700">{amount.label}</p>
              <p className="text-slate-900">{amount.value}</p>
            </div>
          );
        })}
      </div>
      {/* Graphical representation */}
      {/* <div className="chart w-full h-full mt-4 bg-red-200"></div> */}
    </>
  );
};

export default Result;
