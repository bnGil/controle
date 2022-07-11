export const pascalCaseStr = (str) => {
  return str
    .replace(/\w+/g, function (w) {
      return w[0].toUpperCase() + w.slice(1).toLowerCase();
    })
    .trim();
};
