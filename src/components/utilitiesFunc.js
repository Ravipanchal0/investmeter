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
