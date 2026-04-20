import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import InputFrame from "./components/InputFrame";
import Result from "./components/Result";
import { calculateInvestment } from "./components/utilitiesFunc";
import Button from "./components/Button";
import { FaRupeeSign, FaPercentage, FaCalendarTimes } from "react-icons/fa";

const App = () => {
  const [investDetail, setInvestDetail] = useState({
    investType: "sip",
    principal: 2000,
    annualRate: 12.5,
    time: 5,
  });
  const { maturityAmount, totalInvested, totalInterest } = useMemo(
    () => calculateInvestment(investDetail),
    [investDetail],
  );
  const INPUT_FRAMES = useMemo(
    () => [
      {
        name: "principal",
        label:
          investDetail.investType === "sip"
            ? "Monthly Investment"
            : "Total Investment",
        min: 100,
        max: investDetail.investType === "sip" ? 50000 : 100000,
        step: 100,
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
      <div className="btns mb-3 md:mt-8 flex items-center gap-4">
        {["sip", "lumpsum"].map((type) => {
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
        <div className="w-3/4 lg:w-0.5 h-0.5 lg:h-40 rounded-full bg-slate-100 self-center"></div>
        <div className="w-full">
          <Result
            investedAmount={totalInvested}
            estimatedInterest={totalInterest}
            maturityAmount={maturityAmount}
          />
        </div>
      </main>
    </>
  );
};

export default App;
