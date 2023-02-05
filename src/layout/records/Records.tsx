import React, { useEffect, useState } from "react";
import { api } from ".@/api/api";
import { useStoreActions } from ".@/store";
import Title from ".@/components/title";
import Table from ".@/components/table";
import Loading from ".@/components/loading";

const Records = () => {
  const [getRecordsLoading, setGetRecordsLoading] = useState(false);
  const { setRecords } = useStoreActions((store) => store.records);
  const headers = { Authorization: `Bearer ${process.env.BEARER_TOKEN}` };

  const getBaseAndTableIds = async () => {
    let projectIds = { baseId: "", tableId: "" };

    try {
      // get the base id from the meta/bases API
      let getBaseResponse = await api.get("meta/bases", { headers });
      const baseId = getBaseResponse.data.bases[0].id;

      // get the table id from the meta/bases/baseId/tables
      let getTableResponse = await api.get(`meta/bases/${baseId}/tables`, {
        headers,
      });
      const tableId = getTableResponse.data.tables[0].id;

      // add ids to the projectIds object
      projectIds = { baseId, tableId };
    } catch (error) {
      // TODO insert error array or toast message
      console.error(error);
    }

    // return the project ids
    return projectIds;
  };

  const getTableRecords = async ({ baseId, tableId }) => {
    const url = `${baseId}/${tableId}`;
    let offset = null; // no initial offset
    let records = []; // empty list to start with

    // set params for sorting and filtering (offset for more pages)
    let params = {
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
      for (let i = 0; i < 9; i++) {
        params = { ...params, offset }; // update params with the new offset value
        let response = await api.get(url, { params, headers }); // await the res for this additional list call
        records.push(...extractedFields); // extend records with the extracted fields from this res
        offset = response.data?.offset; // set the offset with new returned offset
      }
    } catch (error) {
      // TODO insert error array or toast message
      console.error(error);
    }
    return records;
  };

  // no dependency has been set so will only call once on entry
  useEffect(() => {
    setGetRecordsLoading(true);
    getBaseAndTableIds()
      .then((res) => {
        // after the get base and table ids pass the response into getTableRecords
        getTableRecords(res)
          .then((records) => {
            setGetRecordsLoading(false);
            setRecords(records);
          })
          .catch((err) => {
            setGetRecordsLoading(false);
            // TODO insert debug system
          });
      })
      .catch((err) => {
        setGetRecordsLoading(false);
        // TODO insert debug system
      });
  }, []);

  return (
    <div className="PageDetail">
      {getRecordsLoading ? <Loading /> : <Table />}
    </div>
  );
};

export default Records;
