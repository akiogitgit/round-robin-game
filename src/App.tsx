import { useCallback, useState } from 'react'

type Field = null | '○' | '✕'
type Fields = [
  [Field, Field, Field],
  [Field, Field, Field],
  [Field, Field, Field],
]

function App() {
  const [fields, setFields] = useState<Fields>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  const [player, setPlayer] = useState<'○' | '✕'>('✕')
  const [winner, setWinner] = useState<null | '○' | '✕'>(null)

  // カスタムフックにする
  const fillField = useCallback(
    (x: number, y: number) => {
      const newFields: Fields = [...fields]
      newFields[x][y] = player === '○' ? '✕' : '○'

      setFields(newFields)
    },
    [fields, player],
  )

  const changePlayer = useCallback(() => {
    setPlayer(s => (s === '○' ? '✕' : '○'))
  }, [])

  const judgeWinner = useCallback(() => {
    // 横の判定
    for (let i = 0; i < 3; i++) {
      if (
        fields[0][i] &&
        fields[0][i] === fields[1][i] &&
        fields[0][i] === fields[2][i]
      ) {
        setWinner(fields[0][i])
      }
    }

    // 縦の判定
    for (let i = 0; i < 3; i++) {
      if (
        fields[i][0] &&
        fields[i][0] === fields[i][1] &&
        fields[i][0] === fields[i][2]
      ) {
        setWinner(fields[i][0])
      }
    }

    // 斜めの判定
    if (
      fields[0][0] &&
      fields[0][0] === fields[1][1] &&
      fields[0][0] === fields[2][2]
    ) {
      console.log('勝った！')
      setWinner(fields[0][0])
    }

    if (
      fields[0][2] &&
      fields[0][2] === fields[1][1] &&
      fields[0][2] === fields[2][0]
    ) {
      console.log('勝った！')
      setWinner(fields[0][2])
    }
  }, [fields])

  const onClickField = useCallback(
    (x: number, y: number) => {
      // 既に埋まっているか、勝敗が決まっているなら終了
      if (fields[x][y] || winner) return

      fillField(x, y)
      changePlayer()
      judgeWinner()
    },
    [changePlayer, fields, fillField, judgeWinner, winner],
  )

  return (
    <div className='flex flex-col flex-1 w-100vw justify-center items-center'>
      <h1 className='text-2xl'>○✕ゲーム</h1>

      <div className='mt-4'>
        {fields.map((_, i1) => (
          <div className='flex' key={i1}>
            {_.map((v, i2) => (
              <button
                className='border border-gray-400 h-20 text-30px w-20'
                onClick={() => onClickField(i1, i2)}
                key={i2}
              >
                {v}
              </button>
            ))}
          </div>
        ))}
      </div>

      {winner && (
        <p className='mt-4 text-2xl'>
          {winner === '○' ? '○の勝ち' : '✕の勝ち'}
        </p>
      )}
    </div>
  )
}

export default App
