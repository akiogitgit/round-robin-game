import { Board } from "./Board";
import { useRoundRobinGame } from "./useRoundRobinGame";

export default function App() {
  const { fields, onClickField, currentField, winner, reset } = useRoundRobinGame();

  return (
    <div className="flex flex-col bg-stone-800 flex-1 min-h-100vh text-stone-300 w-100vw justify-center items-center">
      <h1 className="text-2xl">○✕ゲーム</h1>

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
