export const checkAllElementsEqual = (array: readonly any[]) => {
  // 配列の重複を無くす
  const target = [...array].filter((v, i) => i === array.findLastIndex((v2) => v2 === v));

  return target.length === 1; // 全て同じ要素なら長さは1になる
};
