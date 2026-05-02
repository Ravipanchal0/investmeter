import { formatMoney } from "./utilitiesFunc";

import Loan from "/loan.png";
import Money from "/money.png";

import {
  Rupee,
  Total,
  Calendar,
  LoanAmount,
  Percentage,
  Wallet,
  Grow,
} from "../assets/svgs/svgs";

const ResultHeader = ({ emi, years, rate }) => {
  return (
    <div
      className={`flex justify-between px-6 pt-4 rounded-t-lg ${
        !emi ? "border-ui-green-border" : "border-ui-purple-border"
      } border border-b-0 ${!emi ? "green-grad" : "purple-grad"}`}
    >
      <div className="self-center">
        {!emi ? (
          <div className="invest-header">
            <p className="text-slate-800">Your Invest Growth</p>
            <p className="font-semibold text-ui-text-bold">at a Glance.</p>
          </div>
        ) : (
          <div className="text-xs text-slate-600">
            <p>Your Monthly EMI</p>
            <p className="py-1 flex items-center text-ui-cal-icon">
              <Rupee className="size-6" strokeWidth={3} />
              <span className="text-3xl font-semibold tracking-wide">
                {emi}
              </span>
            </p>
            <p>
              For {years} Years at {rate}% p.a.
            </p>
          </div>
        )}
      </div>
      <div className={`${!emi ? "w-38" : "w-30"}`}>
        <img src={!emi ? Money : Loan} alt="Invest meter" className="w-full" />
      </div>
    </div>
  );
};

const Card = ({ Icon, title, amount, bgColor, textColor }) => {
  return (
    <div className="flex-between p-4 rounded-xl shadow">
      <div className="flex items-center gap-4">
        <div
          className={`icon size-14 p-4 flex-center rounded-full ${bgColor} ${textColor}`}
        >
          <Icon className="size-6" />
        </div>
        <p className="text-slate-800 text-sm tracking-wide">{title}</p>
      </div>
      <div
        className={`text-lg font-roboto font-semibold tracking-wide ${textColor}`}
      >
        {amount}
      </div>
    </div>
  );
};

const LoanCard = ({ Icon, bgColor, textColor, title, amount }) => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-xl shadow gap-y-1 text-center">
      <div
        className={`icon size-14 p-4 flex-center rounded-full ${bgColor} ${textColor}`}
      >
        <Icon className="size-6" />
      </div>
      <p className="text-slate-600 text-xs tracking-wide">{title}</p>

      <div
        className={`right pt-1 text-2xl font-roboto font-semibold tracking-wide ${textColor}`}
      >
        {amount}
      </div>
    </div>
  );
};

const Result = ({ ResultType, calculatedData }) => {
  const CARD_DETAILS = [
    {
      Icon: Total,
      title: "Maturity Amount",
      amount: formatMoney(calculatedData?.maturityAmount),
      bgColor: "bg-ui-total-bg",
      textColor: "text-ui-total-icon",
    },
    {
      Icon: Wallet,
      title: "Invested Amount",
      amount: formatMoney(calculatedData?.totalInvested),
      bgColor: "bg-ui-wallet-bg",
      textColor: "text-ui-wallet-icon",
    },
    {
      Icon: Grow,
      title: "Estimated Interest",
      amount: formatMoney(calculatedData?.totalInterest),
      bgColor: "bg-ui-grow-bg",
      textColor: "text-ui-grow-icon",
    },
  ];

  const LOAN_CARD_DETAILS = [
    {
      amount: formatMoney(calculatedData?.totalPayment),
      title: "Total Amount Payable",
      Icon: Total,
      bgColor: "bg-ui-grow-bg",
      textColor: "text-ui-grow-icon",
    },
    {
      amount: formatMoney(calculatedData?.totalInterest),
      title: "Total Interest Payable",
      Icon: Percentage,
      bgColor: "bg-ui-interest-bg",
      textColor: "text-ui-interest-icon",
    },
    {
      amount: formatMoney(calculatedData?.amount),
      title: "Loan Amount",
      Icon: LoanAmount,
      bgColor: "bg-ui-rupee-bg",
      textColor: "text-ui-rupee-icon",
    },
    {
      amount: calculatedData?.noOfEmi,
      title: "Number of EMIs",
      Icon: Calendar,
      bgColor: "bg-ui-cal-bg",
      textColor: "text-ui-cal-icon",
    },
  ];

  return ResultType !== "emi" ? (
    <>
      <ResultHeader />
      <div className="space-y-4 p-5">
        {CARD_DETAILS.map((cardData) => (
          <Card key={cardData.amount} {...cardData} />
        ))}
      </div>
    </>
  ) : (
    <>
      <ResultHeader
        emi={calculatedData?.monthlyEmi}
        rate={calculatedData?.annualRate}
        years={calculatedData?.time}
      />
      <div className="grid grid-cols-2 gap-5 p-5">
        {LOAN_CARD_DETAILS.map((loanCard) => (
          <LoanCard key={loanCard.amount} {...loanCard} />
        ))}
      </div>
    </>
  );
};

export default Result;
