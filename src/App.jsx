import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import InputFrame from "./components/InputFrame";
import Result from "./components/Result";
import { calculateInvestment, emiCalc } from "./components/utilitiesFunc";
import Button from "./components/Button";
import { FaRupeeSign, FaPercentage, FaCalendarTimes } from "react-icons/fa";
import EmiTable from "./components/EmiTable";

const BUTTON_LABEL = ["sip", "lumpsum", "emi"];

const App = () => {
  const [investDetail, setInvestDetail] = useState({
    investType: "sip",
    principal: 2000,
    annualRate: 12.5,
    time: 5,
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
    investDetail.principal >= 1;

  const INPUT_FRAMES = useMemo(
    () => [
      {
        name: "principal",
        label:
          investDetail.investType === "sip"
            ? "Monthly Investment"
            : investDetail.investType === "emi"
              ? "Loan Amount"
              : "Total Investment",

        min: investDetail.investType === "sip" ? 100 : 10000,

        max:
          investDetail.investType === "sip"
            ? 50000
            : investDetail.investType === "emi"
              ? 5000000
              : 1000000,
        step: investDetail.investType === "emi" ? 1000 : 100,
        symbol: <FaRupeeSign />,
        value: investDetail.principal,
        onSetValue: setInvestDetail,
      },
      {
        name: "annualRate",
        label: "Expected Rate",
        min: 5,
        max: 30,
        step: 0.1,
        symbol: <FaPercentage />,
        value: investDetail.annualRate,
        onSetValue: setInvestDetail,
      },
      {
        name: "time",
        label: "Time Duration",
        min: 1,
        max: 30,
        step: 1,
        symbol: <FaCalendarTimes />,
        value: investDetail.time,
        onSetValue: setInvestDetail,
      },
    ],
    [investDetail],
  );

  return (
    <>
      <Header />
      <div className="btns mb-8 md:mt-8 flex items-center gap-4">
        {BUTTON_LABEL.map((type) => {
          return (
            <Button
              key={type}
              type={type}
              investDetail={investDetail}
              setInvestDetail={setInvestDetail}
            />
          );
        })}
      </div>
      <main className="w-full flex flex-col lg:flex-row  justify-between gap-5 md:gap-8 mt-5 ">
        <div className="w-full space-y-5">
          {INPUT_FRAMES.map((input) => {
            return (
              <InputFrame
                key={input.name}
                label={input.label}
                min={input.min}
                max={input.max}
                step={input.step}
                symbol={input.symbol}
                name={input.name}
                value={input.value}
                onSetValue={input.onSetValue}
              />
            );
          })}
        </div>
        <div className="separator"></div>
        <div className="w-full">
          {inputIsValid ? (
            investDetail.investType === "emi" ? (
              <EmiTable calculation={calculation} />
            ) : (
              <Result calculation={calculation} />
            )
          ) : (
            <p className="text-center text-red-500">Enter a valid input!</p>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
