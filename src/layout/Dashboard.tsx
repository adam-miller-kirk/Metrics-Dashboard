import React, { useEffect, useState } from "react";
import { api } from ".@/api/api";
import { useStoreActions } from ".@/store";
import Title from ".@/components/title";
import Table from ".@/components/table";
import Loading from ".@/components/loading";

const Dashboard = () => {
  const [getRecordsLoading, setGetRecordsLoading] = useState(false);
  const { setRecords } = useStoreActions((store) => store.records);

  // TODO
  /*
    Setup intro section that protects against no envirments set. Show a message
    requesting the BEARER_TOKEN needs to be set with read permissions before
    the application can start showing records. Additional protection / error
    handling to show if the BEARER_TOKEN is valid.

    Following from this the user likly won't have access or knowledge of postman 
    so I need initals calls that return the ids of baseId and tableId instead of
    asking the clint to set them.
  */

  const getTableRecords = async () => {
    const url = `${process.env.BASE_ID}/${process.env.TABLE_ID}`;
    const headers = { Authorization: `Bearer ${process.env.BEARER_TOKEN}` };
    let offset = null; // no initial offset
    let records = []; // empty list to start with

    // set params for sorting and filtering (offset for more pages)
    let params = {
      pageSize: 5,
      fields: [
        "order_id",
        "order_placed",
        "product_name",
        "price",
        "order_status",
      ],
      sort: [{ field: "order_placed", direction: "desc" }],
      offset,
    };

    try {
      // await for the first responce to get the list
      let response = await api.get(url, { params, headers });

      const extractedFields = response.data.records.map(
        (record) => record.fields
      );
      records.push(...extractedFields); // extend records with the extracted fields
      offset = response.data?.offset; // set offset from res if there is one

      // TODO
      /*
        Need a check in place to ensure that we do not keep looping through the data,
        somthing that checks to see if the first item id is already in our records. If
        so break from the loop instead of repeating the data indefinitly
      */
      //   for (let i = 0; i < 9; i++) {
      //     params = { ...params, offset }; // update params with the new offset value
      //     let response = await api.get(url, { params, headers }); // await the res for this additional list call
      //     records.push(...extractedFields); // extend records with the extracted fields from this res
      //     offset = response.data?.offset; // set the offset with new returned offset
      //   }
    } catch (error) {
      // TODO insert error array or toast message
      console.error(error);
    }
    return records;
  };

  // no dependency has been set so will only call once on entry
  useEffect(() => {
    setGetRecordsLoading(true);
    getTableRecords()
      .then((records) => {
        setGetRecordsLoading(false);
        setRecords(records);
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
        {getRecordsLoading ? <Loading /> : <Table />}
      </div>
    </div>
  );
};

export default Dashboard;
