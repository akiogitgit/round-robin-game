// 配列の要素が全て同じ
export const checkAllElementsEqual = (array: readonly any[]) => {
  // 配列の重複を無くす
  const target = [...array].filter((v, i) => i === array.findLastIndex((v2) => v2 === v));

  return target.length === 1;
};

// utilsにする

// 引数の配列でnullでない要素数が、マス数と同じ
export const checkAllElementsFill = (size: number, array: readonly any[]) => {
  // 配列を1次元配列にして、nullの要素を弾く
  const fillElements = array.flat().filter(Boolean);
  return fillElements.length === size * size;
};
