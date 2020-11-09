import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTable } from "react-table";

import makeData from "./makeData";
import { getPeople } from "./fakePeopleAPI";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await getPeople();
    setData(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return [data, loading];
}

function App() {
  const [data, loading] = useFetch();
  const columns = React.useMemo(
    () => [
      {
        Header: "People",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Favourite Colour",
            accessor: "favourite_color",
          },
          {
            Header: "Favourite Food",
            accessor: "favourite_food",
          },
          {
            Header: "Friends",
            accessor: "friends",
          },
        ],
      },
    ],
    []
  );

  // const data = React.useMemo(() => makeData(20), []);

  const newData = React.useMemo(() => data);
  console.log(newData);

  return (
    <Styles>
      <Table columns={columns} data={newData} />
    </Styles>
  );
}

export default App;
