import {OneSProvider} from 'lib'
import {Column, Row} from 'components'

export const Table = ({table}) => {
  const {columns, rows} = table
  
  return (
    <OneSProvider>
      <div className="tableFixHead">
        <table>
            <thead>
              <tr>
                <th></th>
                {columns && columns.length > 0 ? columns.map(column => (
                  <Column key={`col_${column.id}`} column={column} />
                )) : null}
              </tr>
            </thead>
            <tbody>
              {rows && rows.length > 0 ? rows.map(row => (
                <Row key={`row_${row.id}`} row={row} />
              )) : null}
            </tbody>
        </table>
      </div>
      <div className="rect"></div>
    </OneSProvider>
  )
}
