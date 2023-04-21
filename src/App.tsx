import { useCallback, useState } from "react";

type Field = null | "○" | "✕";
type Fields = [[Field, Field, Field], [Field, Field, Field], [Field, Field, Field]];

function App() {
  const [fields, setFields] = useState<Fields>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [player, setPlayer] = useState<"○" | "✕">("✕");
  const [winner, setWinner] = useState<null | "○" | "✕">(null);

  const checkAllElementsEqual = (array: readonly any[]) => {
    // 配列の重複を無くす
    const target = [...array].filter((v, i) => i === array.findLastIndex((v2) => v2 === v));

    // 全て同じなら長さは1
    return target.length === 1;
  };

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
    for (let i = 0; i < 3; i++) {
      // 対象の要素を配列で取得
      const targetFields = fields.map((v) => v.filter((_, i2) => i === i2)).flat();
      const firstTargetField = fields[0][i];

      if (firstTargetField && checkAllElementsEqual(targetFields)) {
        setWinner(firstTargetField);
      }
    }

    // 横の判定
    for (let i = 0; i < 3; i++) {
      const targetFields = fields.map((v, i1) => v.filter((_) => i === i1)).flat();
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
  }, [fields]);

  const onClickField = useCallback(
    (x: number, y: number) => {
      // 既に埋まっているか、勝敗が決まっているなら終了
      if (fields[x][y] || winner) return;

      fillField(x, y);
      changePlayer();
      judgeWinner();
    },
    [changePlayer, fields, fillField, judgeWinner, winner]
  );

  return (
    <div className="flex flex-col flex-1 w-100vw justify-center items-center">
      <h1 className="text-2xl">○✕ゲーム</h1>

      <div className="mt-4">
        {fields.map((_, i1) => (
          <div className="flex" key={i1}>
            {_.map((v, i2) => (
              <button
                className="border border-gray-400 h-20 text-30px w-20"
                onClick={() => onClickField(i1, i2)}
                key={i2}
              >
                {v}
              </button>
            ))}
          </div>
        ))}
      </div>

      {winner && <p className="mt-4 text-2xl">{winner}の勝ち</p>}
    </div>
  );
}

export default App;
