// 配列の要素が全て同じ
export const checkAllElementsEqual = (array: readonly any[]) => {
  // 配列の重複を無くす
  const target = [...array].filter((v, i) => i === array.findLastIndex((v2) => v2 === v));

  return target.length === 1;
};
