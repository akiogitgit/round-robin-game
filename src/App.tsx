import { useCallback, useState } from "react";

const FIELD_SIZE = 3;

type Tuple2D<T, S extends number, A1 extends T[] = [], A2 extends T[][] = []> = A2["length"] extends S
  ? A2
  : A1["length"] extends S
  ? Tuple2D<T, S, [], [...A2, A1]>
  : Tuple2D<T, S, [...A1, T], A2>;

type Field = null | "○" | "✕";
type Fields = Tuple2D<Field, typeof FIELD_SIZE>;

export default function App() {
  const [fields, setFields] = useState<Fields>(
    [...Array(FIELD_SIZE)].map((_) => [...Array(FIELD_SIZE)].map((_) => null)) as Fields
  );
  const [player, setPlayer] = useState<"○" | "✕">("✕");
  const [winner, setWinner] = useState<null | "○" | "✕">(null);
  const [currentField, setCurrentField] = useState<[number, number]>([-1, -1]);

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

      setCurrentField([x, y]);
      setTimeout((_) => setCurrentField([-1, -1]), 3000);
    },
    [changePlayer, fields, fillField, judgeWinner, winner]
  );

  return (
    <div className="flex flex-col bg-stone-800 flex-1 min-h-100vh text-stone-300 w-100vw justify-center items-center">
      <h1 className="text-2xl">○✕ゲーム</h1>

      <div className="mt-4">
        {fields.map((_, index1) => (
          <div className="flex" key={index1}>
            {_.map((value, index2) => (
              <button
                // 押されているものはホバー、フォーカスのスタイルが当たらない
                // ただし押してから3秒間はフォーカスのスタイルが当たる
                className={`border rounded-lg border-stone-300 h-20 text-30px w-20 duration-200 ${
                  !value && !winner && "hover:(border-stone-100 bg-stone-700)"
                } ${
                  !winner &&
                  (currentField.join(" ") === `${index1} ${index2}` || !value) &&
                  "focus:(ring-3 ring-stone-100)"
                }`}
                tabIndex={value || winner ? -1 : 1}
                onClick={() => onClickField(index1, index2)}
                key={index2}
              >
                {value}
              </button>
            ))}
          </div>
        ))}
      </div>

      {winner && <p className="mt-4 text-2xl">{winner}の勝ち</p>}

      <button
        className="mt-4"
        onClick={() => {
          setFields([...Array(FIELD_SIZE)].map((_) => [...Array(FIELD_SIZE)].map((_) => null)) as Fields);
          setPlayer("✕");
          setWinner(null);
        }}
      >
        リセット
      </button>
    </div>
  );
}
