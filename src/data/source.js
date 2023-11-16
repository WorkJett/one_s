const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const x_range = [...(new Array(100)).keys()]
const y_range = []

for (let i = 0; i < 100; i++) {
  const first_idx = Math.floor(i / alphabet.length)
  const second_idx = i % alphabet.length
  y_range.push(`${alphabet[first_idx]}${alphabet[second_idx]}`)
}

export const table = {
  columns: x_range.map(col_idx => ({
    id: col_idx,
    title: `Column #${col_idx}`
  })),
  rows: y_range.map(row_idx => ({
    id: row_idx,
    title: `Row ${row_idx}`,
    data: x_range.map(col_idx => ({
      id: `datum_${row_idx}_${col_idx}`,
      col_idx,
      row_idx,
      content: `Data ${row_idx} ${col_idx}`
    }))
  }))
}
