export function objectToArray(obj) {
  if (typeof obj !== "object" || obj === null) {
    return [];
  }

  return Object.entries(obj).map(([key, value]) => {
    return { value: key, label: value };
  });
}
export function addDaysToDate(originalDate, daysToAdd) {
  const newDate = new Date(originalDate);
  newDate.setDate(newDate.getDate() +daysToAdd);
  return newDate;
}