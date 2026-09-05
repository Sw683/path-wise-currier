export interface InflationProjection {
  targetYear: number;
  yearsFromNow: number;
  estimatedFutureCost: number;
  suggestedMonthlySIP: number;
  governmentCollegeEstimatedCost: number;
  privateCollegeEstimatedCost: number;
}

export function calculateEducationCost(
  currentClass: number,
  currentDegreeCostINR: number = 600000,
  expectedInflationRate: number = 0.09,
  investmentReturnRate: number = 0.12
): InflationProjection {
  const collegeStartClass = 13; // Class 12 completion
  const yearsFromNow = Math.max(1, collegeStartClass - currentClass);
  const targetYear = new Date().getFullYear() + yearsFromNow;

  // Future Value = PV * (1 + r)^n
  const estimatedFutureCost = Math.round(
    currentDegreeCostINR * Math.pow(1 + expectedInflationRate, yearsFromNow)
  );

  const govRatio = 0.25;
  const privateRatio = 2.2;
  const governmentCollegeEstimatedCost = Math.round(estimatedFutureCost * govRatio);
  const privateCollegeEstimatedCost = Math.round(estimatedFutureCost * privateRatio);

  // Monthly SIP Calculation
  // FV = P * [((1 + i)^n - 1) / i] * (1 + i)
  const monthlyRate = investmentReturnRate / 12;
  const totalMonths = yearsFromNow * 12;
  const sipFactor = ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  const suggestedMonthlySIP = Math.round(estimatedFutureCost / sipFactor);

  return {
    targetYear,
    yearsFromNow,
    estimatedFutureCost,
    suggestedMonthlySIP,
    governmentCollegeEstimatedCost,
    privateCollegeEstimatedCost
  };
}
