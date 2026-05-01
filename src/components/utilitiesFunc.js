export function formatMoney(amount, locale = "en-IN") {
  return new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMonth(month, totalMonths) {
  const digits = String(totalMonths).length; // 60 → 2, 360 → 3
  return String(month).padStart(digits, "0");
}

export function calculateInvestment({ investType, amount, annualRate, time }) {
  const totalMonths = time * 12;
  const monthlyRate = annualRate / 100 / 12;
  const annualRateDecimal = annualRate / 100;

  let maturityAmount, totalInvested, totalInterest, absoluteReturn;

  if (investType === "lumpsum") {
    // Compound Interest: P × (1 + r)^t
    maturityAmount = amount * Math.pow(1 + annualRateDecimal, time);
    totalInvested = amount;
  } else if (investType === "sip") {
    // SIP Formula: P × ((1 + r)^n - 1) / r × (1 + r)
    maturityAmount =
      amount *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate);
    totalInvested = amount * totalMonths;
  } else {
    throw new Error("Invalid type. Use 'lumpsum' or 'sip'.");
  }

  totalInterest = maturityAmount - totalInvested;
  absoluteReturn = (totalInterest / totalInvested) * 100;

  return {
    totalInvested: Math.ceil(totalInvested),
    maturityAmount: Math.ceil(maturityAmount),
    totalInterest: Math.ceil(totalInterest),
    // absoluteReturn: parseFloat(absoluteReturn.toFixed(2)),
  };
}

export function emiCalc({ amount, annualRate, time }) {
  const totalMonths = time * 12;
  const monthlyRate = annualRate / 100 / 12;

  // EMI Formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
  const emi =
    monthlyRate === 0
      ? amount / totalMonths // Edge case: 0% interest
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - amount;
  const interestRate = (totalInterest / amount) * 100;

  // Amortization schedule — breakdown of each month
  const schedule = [];
  let balance = amount;

  for (let month = 1; month <= totalMonths; month++) {
    const interestPaid = balance * monthlyRate;
    const amountPaid = emi - interestPaid;
    balance = balance - amountPaid;

    schedule.push({
      month,
      emi: Math.floor(emi),
      interestPaid: Math.floor(interestPaid),
      amountPaid: Math.floor(amountPaid),
      balance: Math.floor(Math.max(balance, 0)),
    });
  }

  return {
    amount,
    annualRate,
    time,
    noOfEmi: totalMonths,
    monthlyEmi: Math.floor(emi),
    totalPayment: Math.floor(totalPayment),
    totalInterest: Math.floor(totalInterest),
    interestRate: Math.floor(interestRate),
    // schedule,
  };
}
