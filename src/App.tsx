import { useState } from "react";
import { Board } from "./Board";
import { useRoundRobinGame } from "./useRoundRobinGame";

export default function App() {
  const [fieldSize, setFieldSize] = useState(3);

  return (
    <div className="flex flex-col bg-stone-800 flex-1 min-h-100vh text-stone-300 w-100vw justify-center items-center">
      <h1 className="text-2xl">○✕ゲーム</h1>

      <div className="flex mt-4 gap-3 items-center justify-center">
        <label>
          サイズ：
          <input
            type="number"
            value={fieldSize}
            onChange={(e) => setFieldSize(Number(e.target.value))}
            min={0}
            className="border bg-stone-800 border-stone-300 w-10"
          />
        </label>
        <button onClick={() => setFieldSize((s) => s - 1)}>▽</button>
        <button onClick={() => setFieldSize((s) => s + 1)}>△</button>
      </div>

      {fieldSize > 0 && <GameBoard fieldSize={fieldSize} key={fieldSize} />}
    </div>
  );
}

function GameBoard({ fieldSize }: { fieldSize: number }) {
  const { fields, onClickField, currentField, winner, reset } = useRoundRobinGame(fieldSize);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4">
        <Board fields={fields} onClickField={onClickField} currentField={currentField} winner={winner} />
      </div>

      {winner && <p className="mt-4 text-2xl">{winner}の勝ち</p>}
      <button className="mt-4" onClick={reset}>
        リセット
      </button>
    </div>
  );
}
