export const calculateOverfitMetrics = (history) => {
  const practiced = history.filter(q => !q.isUnseen);
  const unseen = history.filter(q => q.isUnseen);

  const getAcc = (arr) => arr.length ? (arr.filter(q => q.correct).length / arr.length) * 100 : 0;

  const accPracticed = getAcc(practiced);
  const accUnseen = getAcc(unseen);
  const gap = Math.max(0, accPracticed - accUnseen);

  let status = "Robust Learner";
  let color = "#10b981"; // Green

  if (gap > 30) {
    status = "High Overfit";
    color = "#ef4444"; // Red
  } else if (gap > 15) {
    status = "Moderate Overfit";
    color = "#f59e0b"; // Amber
  }

  return { accPracticed, accUnseen, gap, status, color };
};