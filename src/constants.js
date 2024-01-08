export const baseAPIURL = "https://cerulean-marlin-wig.cyclic.app/";

export const groupCallsByDate = (calls, getTotal = false) => {
  let total = 0;
  const sortedCalls = calls.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const groupedCalls = {};
  sortedCalls.forEach((call) => {
    if (call.from && call.to) {
      const options = { month: "long", day: "numeric", year: "numeric" };
      const callDate = new Date(call.created_at).toLocaleString(
        "en-US",
        options
      );
      if (!groupedCalls[callDate]) {
        groupedCalls[callDate] = [];
      }
      groupedCalls[callDate].push(call);
      total++;
    }
  });
  if (getTotal) return total;
  return groupedCalls;
};
