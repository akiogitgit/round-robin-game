import { useCallback, useState } from "react";
import { checkAllElementsEqual } from "./checkAllElementsEqual";

type Field = null | "○" | "✕";
export type Fields = Field[][];

export const useRoundRobinGame = (fieldSize: number) => {
  const [fields, setFields] = useState<Fields>(
    [...Array(fieldSize)].map(() => [...Array(fieldSize)].map(() => null)) as Fields
  );
  const [player, setPlayer] = useState<"○" | "✕">("✕");
  const [winner, setWinner] = useState<null | "○" | "✕">(null);
  const [currentField, setCurrentField] = useState<[number, number]>([-1, -1]);

  const fillField = useCallback(
    (x: number, y: number) => {
      const newFields: Fields = [...fields];
      newFields[x][y] = player === "○" ? "✕" : "○";

      setFields(newFields);
    },
    [fields, player]
  );

  const changePlayer = useCallback(() => {
    setPlayer((s) => (s === "○" ? "✕" : "○"));
  }, []);

  const judgeWinner = useCallback(() => {
    // 縦の判定
    for (let i = 0; i < fieldSize; i++) {
      // 対象の要素を配列で取得
      const targetFields = fields.map((v) => v.filter((_, i2) => i === i2)).flat();
      const firstTargetField = fields[0][i];

      if (firstTargetField && checkAllElementsEqual(targetFields)) {
        setWinner(firstTargetField);
      }
    }

    // 横の判定
    for (let i = 0; i < fieldSize; i++) {
      const targetFields = fields.map((v, i1) => v.filter(() => i === i1)).flat();
      const firstTargetField = fields[i][0];

      if (firstTargetField && checkAllElementsEqual(targetFields)) {
        setWinner(firstTargetField);
      }
    }

    // 斜めの判定
    // 左斜め
    const targetFields = fields.map((v, i1) => v.filter((_, i2) => i1 === i2)).flat();
    const firstTargetField = fields[0][0];

    if (firstTargetField && checkAllElementsEqual(targetFields)) {
      setWinner(firstTargetField);
    }

    // 右斜め
    const targetFields2 = fields.map((v, i1) => v.filter((_, i2) => i1 + i2 === fields.length - 1)).flat();
    const firstTargetField2 = fields[0][fields.length - 1];

    if (firstTargetField2 && checkAllElementsEqual(targetFields2)) {
      setWinner(firstTargetField2);
    }
  }, [fieldSize, fields]);

  const onClickField = useCallback(
    (x: number, y: number) => {
      // 既に埋まっているか、勝敗が決まっているなら終了
      if (fields[x][y] || winner) return;

      fillField(x, y);
      changePlayer();
      judgeWinner();

      // 押してから3秒間フォーカスのスタイルが当たるようにする
      setCurrentField([x, y]);
      setTimeout(() => setCurrentField([-1, -1]), 3000);
    },
    [changePlayer, fields, fillField, judgeWinner, winner]
  );

  const reset = useCallback(() => {
    setFields([...Array(fieldSize)].map(() => [...Array(fieldSize)].map(() => null)) as Fields);
    setPlayer("✕");
    setWinner(null);
  }, [fieldSize]);

  return { fields, onClickField, currentField, winner, reset };
};
