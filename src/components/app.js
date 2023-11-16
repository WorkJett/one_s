const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const x_range = [...(new Array(100)).keys()]
const y_range = []

for (let i = 0; i < 100; i++) {
  const first_idx = Math.floor(i / alphabet.length)
  const second_idx = i % alphabet.length
  y_range.push(`${alphabet[first_idx]}${alphabet[second_idx]}`)
}

export const App = () => {
  return (
    <>
    <div class="tableFixHead">
        <table>
            <thead>
              <tr>
                <th></th>
                {x_range.map(head_idx => (
                  <th>Column #{head_idx}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {y_range.map(row_idx => (
                <tr>
                  <th>Row {row_idx}</th>
                  {x_range.map(column_idx => (
                    <td>Data {row_idx} {column_idx}</td>
                  ))}
                </tr>
              ))}
            </tbody>
        </table>
    </div>
    <div className="rect"></div>
    </>
  )
}
