import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import InputFrame from "./components/InputFrame";
import Result from "./components/Result";
import { calculateInvestment, emiCalc } from "./components/utilitiesFunc";

import {
  Invest,
  Lumpsum,
  Calendar,
  Rupee,
  Percentage,
  Calculator,
} from "./assets/svgs/svgs";

const BUTTONS = [
  { label: "sip", Icon: Invest },
  { label: "lumpsum", Icon: Lumpsum },
  { label: "emi", Icon: Calendar },
];

const App = () => {
  const [investDetail, setInvestDetail] = useState({
    investType: "sip",
    amount: 2000,
    annualRate: 11.5,
    time: 10,
  });
  const calculation = useMemo(
    () =>
      investDetail.investType !== "emi"
        ? calculateInvestment(investDetail)
        : emiCalc(investDetail),
    [investDetail],
  );

  // Validation for negative value
  const inputIsValid =
    investDetail.time >= 1 &&
    investDetail.annualRate >= 1 &&
    investDetail.amount >= 1;

  const INPUT_FRAMES = useMemo(
    () => [
      {
        name: "amount",
        Icon: Rupee,
        label:
          investDetail.investType === "sip"
            ? "Monthly Investment"
            : investDetail.investType === "emi"
              ? "Loan Amount"
              : "Total Investment",
        desc:
          investDetail.investType === "emi"
            ? "Enter the total loan amount"
            : "How much do you want invest?",
        bgColor: "bg-ui-rupee-bg",
        textColor: "var(--color-ui-rupee-icon)",

        min: investDetail.investType === "sip" ? 100 : 10000,
        max:
          investDetail.investType === "sip"
            ? 50000
            : investDetail.investType === "emi"
              ? 10000000
              : 1000000,
        step: investDetail.investType === "emi" ? 1000 : 100,
        value: investDetail.amount,
        onSetValue: setInvestDetail,
      },
      {
        name: "annualRate",
        Icon: Percentage,
        label:
          investDetail.investType === "emi"
            ? "Interest Rate (p.a.)"
            : "Expected Rate of Return (p.a.)",
        desc:
          investDetail.investType === "emi"
            ? "Enter the annual interest rate"
            : "What return are you expecting?",
        bgColor: "bg-ui-percent-bg",
        textColor: "var(--color-ui-percent-icon)",
        min: 5,
        max: 30,
        step: 0.1,
        value: investDetail.annualRate,
        onSetValue: setInvestDetail,
      },
      {
        name: "time",
        Icon: Calendar,
        label:
          investDetail.investType === "emi"
            ? "Loan Tenure (yr)"
            : "Time Duration (yr)",
        desc:
          investDetail.investType === "emi"
            ? "Select the loan duration"
            : "How long do you want to invested?",
        bgColor: "bg-ui-cal-bg",
        textColor: "var(--color-ui-cal-icon)",
        min: 1,
        max: 30,
        step: 1,
        value: investDetail.time,
        onSetValue: setInvestDetail,
      },
    ],
    [investDetail],
  );

  return (
    <>
      <Header />
      <main className="sm:p-5 mt-3 sm:border border-border rounded-2xl">
        <div className="btns flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
          {BUTTONS.map((btn) => {
            return (
              <Button
                key={btn.label}
                {...btn}
                active={investDetail.investType}
                onSetInvestType={setInvestDetail}
              />
            );
          })}
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-4 mt-6">
          <div className="left w-full h-fit p-5 border border-main-border rounded-2xl">
            {INPUT_FRAMES.map((inputData, index) => (
              <React.Fragment key={inputData.name}>
                <InputFrame {...inputData} />

                {index !== INPUT_FRAMES.length - 1 && (
                  <div className="separate" />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="right w-full border border-main-border rounded-2xl">
            {inputIsValid ? (
              <Result
                ResultType={investDetail.investType}
                calculatedData={calculation}
              />
            ) : (
              <p className="text-center text-red-500">Enter a valid input!</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
