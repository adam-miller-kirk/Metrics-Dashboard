import React, { useEffect, useState } from "react";

import Title from ".@/components/title/Title";
import Table from ".@/components/table/Table";
import { api } from ".@/api/api";

const Dashboard = () => {
  const [getRecordsLoading, setGetRecordsLoading] = useState(false);

  const processTableData = async () => {
    // setGetOrdersLoading(true);
    let offset = null; // no initial offset
    let records = [];
    const url = `${process.env.BASE_ID}/${process.env.TABLE_ID}`;
    const headers = { Authorization: `Bearer ${process.env.BEARER_TOKEN}` };

    let params = {
      pageSize: 100,
      maxRecords: 1000,
      fields: ["order_id", "order_placed", "price"],
      sort: [{ field: "order_placed", direction: "desc" }],
      offset,
    };

    try {
      // await for the first responce to get the list
      let response = await api.get(url, { params, headers });

      // extract just field data from res
      const extractedFields = response.data.records.map(
        (record) => record.fields
      );
      records.push(...extractedFields); // extend records with the extracted fields
      offset = response.data.offset; // check if we have an offset in the res

      // TODO
      /*
        Need a check in place to ensure that we do not keep looping through the data,
        somthing that checks to see if the first item id is already in our records. If
        so break from the loop instead of repeating the data indefinitly
      */
      for (let i = 0; i < 9; i++) {
        params = { ...params, offset }; // update params with the new offset value
        let response = await api.get(url, { params, headers }); // await the res for this additional list call
        records.push(...extractedFields); // extend records with the extracted fields from the res
        offset = response.data.offset; // set the offset with new returned offset
      }
    } catch (error) {
      console.error(error);
    }
    return records;
  };

  // no dependency has been set so will only call once on entry
  useEffect(() => {
    setGetRecordsLoading(true);
    processTableData()
      .then((records) => {
        setGetRecordsLoading(false);
      })
      .catch((err) => {
        setGetRecordsLoading(false);
        // TODO insert debug system
      });
  }, []);

  return (
    <div className="App">
      <Title name="Metrics Dashboard" />
      <div className="PageIntro">
        <h3>About</h3>
        <p>Welcome to this Metrics Dashboard.</p>
      </div>
      <div className="PageDetail">
        {getRecordsLoading ? <p>Loading</p> : <Table />}
      </div>
    </div>
  );
};

export default Dashboard;
