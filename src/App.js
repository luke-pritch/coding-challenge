import React, { memo, useEffect, useState } from "react";
import Table from "./components/Table/Table";
import { getPeople } from "./fakePeopleAPI";
import Button from "react-bootstrap/Button";

// hook for getting data
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

  const memoizedData = React.useMemo(() => data);

  return (
    <div>
      <Button variant="primary" className="mb-2 float-right">
        Add Person
      </Button>
      {!loading ? <Table columns={columns} data={memoizedData} /> : null}
    </div>
  );
}

export default App;
