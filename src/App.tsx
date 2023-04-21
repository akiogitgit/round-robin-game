import { Board } from "./Board";
import { useRoundRobinGame } from "./useRoundRobinGame";

export default function App() {
  const { fields, onClickField, currentField, winner, reset } = useRoundRobinGame();

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
