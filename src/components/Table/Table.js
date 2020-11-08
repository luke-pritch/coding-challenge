import { useTable } from "react-table";
import { people } from "../../fakePeopleAPI";

const data = React.useMemo(
  () => [
    {
      col1: "Hello",
      col2: "World",
    },
    {
      col1: "Stuff",
      col2: "Rocks",
    },
    {
      col1: "Whatever",
      col2: "I want!",
    },
  ],
  []
);

const Table = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",
        acessor: "col1",
      },
      {
        Header: "Column 2",
        acessor: "col2",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows

          headerGroups.map((headerGroup) => (
            // Apply the header row props

            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row

                headerGroup.headers.map((column) => (
                  // Apply the header cell props

                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header

                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>

      {/* Apply the table body props */}

      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows

          rows.map((row) => {
            // Prepare the row for display

            prepareRow(row);

            return (
              // Apply the row props

              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells

                  row.cells.map((cell) => {
                    // Apply the cell props

                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents

                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default Table;
