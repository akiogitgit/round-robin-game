# ○✕ゲーム

- 動作プラットフォーム: Windows
- 開発プラットフォーム: Windows
- 開発言語: HTML/CSS, TypeScript
- 利用ライブラリ: React, Windi CSS

## ⚠下で使うx,yについて
fields[x][y]のように使い、fields[1][0]だと、下の位置になる。
画面で見ると、縦軸がx, 横軸がyで初期値が左上なので注意
- [0,0] [0,1] [0,2]
- [1,0] [1,1] [1,2]
- [2,0] [2,1] [2,2]


## 状態の説明
状態は画面上で変化する定数
- player
  - 次に押すのが〇か✕かを保持する
  - 初期値: "〇"
- fields
  - 二次元配列の押すマスに入っているものを格納。各マスには null | "○" | "✕"のいずれかのみ許可する
  - 初期値: [[null, null, null], [null, null, null], [null, null, null]]
- winner
  - 勝敗が決まった場合 "○" | "✕" が入る。決まってない場合nullが入る。引き分けの場合は "引き分け" が入る
  - 初期値: null
- currentField
  - 新しく押されたマスの座標([x,y])を保持する。ロジックではなく、マスを押したときのアニメーションに使う。
  - 初期値: [-1, -1]

## ロジックの説明
- onCLickField
  - フィールドをクリックした時に実行する関数。
  - 第一引数: x座標、第二引数: y座標
  - 処理の説明
    - 押されたフィールドが埋まっている、または勝敗が付いている場合は早期returnする
    - fillField 関数にx,yを渡して実行する
    - changePlayer 関数を実行する
    - judgeWiner 関数を実行する
    - （アニメーションのための処理）
      - setCurrentField セット関数に[x,y]を渡して実行する(currentFieldを[x,y]を代入する)
      - 3秒後に、setCurrentField セット関数に[-1,-1]を渡して実行する
- fillField
  - 引数: x: number,y:number
  - fields[x][y]を player で埋める
- changePlayer
  - playerを〇✕交互に変える
- judgeWinner
  - 今のfieldsで勝敗が付くかを判定する
    - 以下の判定を行う
      - 縦
        - fieldSizeの数、縦の要素を配列で取得する。
          - fieldSize = 3 の時の例 (0,0)は、その座標に入っている要素（"〇" | "✕" | null）
            - ループ1 [(0,0), (1,0), (2,0)] => ["〇", "✕", null]
            - ループ2 [(0,1), (1,1), (2,1)] => ["〇", "〇", null]
            - ループ3 [(0,2), (1,2), (2,2)] => ["〇", "〇", "〇"] 勝敗が付く！
      - 横
        - fieldSizeの数、横の要素を配列で取得する。
          - fieldSize = 3 の時の例 
            - ループ1 [(0,0), (0,1), (0,2)] => ["〇", "✕", null]
            - ループ2 [(1,0), (1,1), (1,2)] => ["〇", "〇", null]
            - ループ3 [(2,0), (2,1), (2,2)] => ["〇", "〇", "〇"] 勝敗が付く！
      - ななめ
        - fieldSizeの数、横の要素を配列で取得する。
          - fieldSize = 3 の時の例 
            - 左斜め [(0,0), (1,1), (2,2)] => ["〇", "✕", null]
            - 右斜め [(2,0), (1,1), (0,2)] => ["〇", "〇", "〇"] 勝敗が付く！
      - 引き分け
        - checkAllElementsFill 関数に、fieldSize, fieldsを渡して true ならwinnerを 引き分けにする
    - 勝敗が付く条件(引き分け以外)
      - この取得した要素の最初の値がnullではなく、全ての要素が同じ値
      - この時、winnerを最初の値に入っているplayerにする

## 流れ

### fieldsを表示する流れ
- AppコンポーネントでfieldSizeの状態を持ち、セレクトボックスで変更する。
- fieldSize を useRoundRobinGame の引数に渡すことでfieldSize * fieldSize の二次元配列（fields）が生成される。他にも〇✕ゲームで必要な状態と関数を返す。
  - 返される変数・関数
    - fields
    - onClickField
    - currentField
    - winner
    - reset
- 生成されたfieldsとその他のPropsをBoardコンポーネントに渡す
  - 渡す変数・関数
    - fields
    - onClickField
    - currentField
    - winner
- Boardコンポーネントは受け取ったfieldsを元に、フィールドを生成する（fieldsは二次元配列なので二重ループでマスを表示している）

### fieldsをクリックした時の流れ
- Boardコンポーネントで表示しているfieldをクリックする。
- クリックすると、onClickField 関数の引数にx軸とy軸の座標を渡す
  - 3 * 3 の時
  - ここで、[2,1]のマスを押すと、onClickFiled(2,1) を実行する
    - [0,0] [0,1] [0,2]
    - [1,0] [1,1] [1,2]
    - [2,0] [2,1] [2,2]


## src下のファイルの説明
- Board.tsx
  - フィールド（押すマス）を配置する
    - fieldsが二次元配列なので、fieldsを二重ループして正方形のフィールドを表示する
- App.tsx
  - Board.tsxを表示する
  - resetボタン
  - 〇✕ゲームのフィールドの大きさを選択できる セレクトボックス
- utils.ts
  - useRoundRobinGameで使う関数を定義
  - checkAllElemntEqual
    - 引数の配列内の要素が全て同じかをBooleanで返す関数
  - checkAllElementsFill
    - 引数の配列の要素が、引数のsize*sizeかをBooleanで返す関数
- main.tsx
  - Reactのルートを作成し、Appコンポーネントをレンダリングする
- types.ts
  - 型 Tuple2D をexportしている
- useRoundRobinGame.ts
  - ○✕ゲームのロジック

## 動作

勝敗が付く

![CPT2305121713-327x420](https://github.com/akiogitgit/round-robin-game/assets/88410576/8f5d821e-7e4a-4742-a83b-a0e9d50c794f)

引き分け

![CPT2305121714-332x428](https://github.com/akiogitgit/round-robin-game/assets/88410576/f739a2b2-7d6c-46a1-89d6-2a8d646ecf84)

サイズ変更

![CPT2304272215-1220x1049](https://github.com/akiogitgit/round-robin-game/assets/88410576/7ef8184a-4e3a-4885-8a19-c6f74660ac25)



