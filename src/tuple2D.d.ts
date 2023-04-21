// 例）Tuple2D<Field, 3> => [[Field,Field,Field],[Field,Field,Field],[Field,Field,Field]]
export type Tuple2D<T, S extends number, A1 extends T[] = [], A2 extends T[][] = []> = A2["length"] extends S
  ? A2
  : A1["length"] extends S
  ? Tuple2D<T, S, [], [...A2, A1]>
  : Tuple2D<T, S, [...A1, T], A2>;
