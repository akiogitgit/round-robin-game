import { FC } from "react";
import { Fields } from "./useRoundRobinGame";

type Props = {
  fields: Fields;
  onClickField: (a: number, b: number) => void;
  currentField: [number, number];
  winner: string | null;
};

export const Board: FC<Props> = ({ fields, onClickField, currentField, winner }) => {
  return (
    <>
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
    </>
  );
};
