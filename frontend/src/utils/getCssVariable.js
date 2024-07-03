// src/utils/getCssVariable.js
const getCssVariable = (variable, fallback) => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
  return value || fallback;
};

export default getCssVariable;
