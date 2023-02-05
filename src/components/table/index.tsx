import React from "react";
import { useStoreState } from ".@/store";

import "./Table.pcss";

const Table = () => {
  const { records } = useStoreState((store) => store.records);

  const formatRecords = () => {
    // set base values
    let revenue = 0;
    let inProgress = 0;
    let inProgressThisMonth = 0;

    // get current year and month and convert into strings
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Date().getMonth().toString();

    // loop through all records
    records.every((record) => {
      // add record price to the revenue
      revenue = revenue + record.price;

      // if record status is in_progress increament inProgress
      if (record.order_status === "in_progress") inProgress++;

      // seperate record date by - to compare the this year and month
      const splitDate = record.order_placed.toString().split("-");
      if (currentYear === splitDate[0] && currentMonth === splitDate[1])
        inProgressThisMonth++; // if this month increament inProgressThisMonth
    });

    // format return object
    const formattedData = {
      revenue: parseFloat(revenue.toString()).toFixed(2),
      inProgress,
      inProgressThisMonth,
      totalOrders: records.length,
      recentRecords: records.slice(0, 5),
    };

    return formattedData;
  };

  // extra values from the return of the formatRecords
  const {
    revenue,
    inProgress,
    inProgressThisMonth,
    totalOrders,
    recentRecords,
  } = formatRecords();

  // TODO currently using a string for the currency type, should come from the api instead

  return (
    <div className="Table">
      <div className="TableItem">
        <strong>
          <p>Total Orders</p>
          <p>{totalOrders}</p>
        </strong>
      </div>
      <div className="TableItem">
        <strong>
          <p>Total Orders this month</p>
          <p>{inProgressThisMonth}</p>
        </strong>
      </div>
      <div className="TableItem">
        <strong>
          <p>Number of orders in progress</p>
          <p>{inProgress}</p>
        </strong>
      </div>
      <div className="TableItem">
        <strong>
          <p>Revenue</p>
          <p>{`£${revenue}`}</p>
        </strong>
      </div>
      <div className="TableItem">
        <strong>
          <p>A list of the most recent few orders</p>
        </strong>
        {recentRecords.map((recentRecord) => (
          <div
            key={`${recentRecord.order_id}_recent`}
            className="TableItemRecords"
          >
            <p>{recentRecord.order_placed.toString()}</p>
            <p>{`£${recentRecord.price}`}</p>
            <p>{recentRecord.order_status}</p>
            <p>{recentRecord.product_name}</p>
          </div>
        ))}
      </div>
      <div className="TableItem">
        <strong>
          <p>Anything else I think is useful</p>
          <p>Most baught item</p>
        </strong>
      </div>
    </div>
  );
};

export default Table;