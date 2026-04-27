export function calculateInvestment({
  investType,
  principal,
  annualRate,
  time,
}) {
  const totalMonths = time * 12;
  const monthlyRate = annualRate / 100 / 12;
  const annualRateDecimal = annualRate / 100;

  let maturityAmount, totalInvested, totalInterest, absoluteReturn;

  if (investType === "lumpsum") {
    // Compound Interest: P × (1 + r)^t
    maturityAmount = principal * Math.pow(1 + annualRateDecimal, time);
    totalInvested = principal;
  } else if (investType === "sip") {
    // SIP Formula: P × ((1 + r)^n - 1) / r × (1 + r)
    maturityAmount =
      principal *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate);
    totalInvested = principal * totalMonths;
  } else {
    throw new Error("Invalid type. Use 'lumpsum' or 'sip'.");
  }

  totalInterest = maturityAmount - totalInvested;
  absoluteReturn = (totalInterest / totalInvested) * 100;

  return {
    totalInvested: parseFloat(totalInvested),
    maturityAmount: parseFloat(maturityAmount),
    totalInterest: parseFloat(totalInterest),
    // absoluteReturn: parseFloat(absoluteReturn.toFixed(2)),
  };
}

export function formatMoney(amount, currency = "INR", locale = "en-IN") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function emiCalc({ principal, annualRate, time }) {
  const totalMonths = time * 12;
  const monthlyRate = annualRate / 100 / 12;

  // EMI Formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
  const emi =
    monthlyRate === 0
      ? principal / totalMonths // Edge case: 0% interest
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;
  const interestRate = (totalInterest / principal) * 100;

  // Amortization schedule — breakdown of each month
  const schedule = [];
  let balance = principal;

  for (let month = 1; month <= totalMonths; month++) {
    const interestPaid = balance * monthlyRate;
    const principalPaid = emi - interestPaid;
    balance = balance - principalPaid;

    schedule.push({
      Month: month,
      EMI: parseFloat(emi.toFixed(2)),
      Interest: parseFloat(interestPaid.toFixed(2)),
      Principal: parseFloat(principalPaid.toFixed(2)),
      "Remaining Amount": parseFloat(Math.max(balance, 0).toFixed(2)),
    });
  }

  return {
    principal,
    monthlyEmi: parseFloat(emi.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    interestRate: parseFloat(interestRate.toFixed(2)),
    schedule,
  };
}
