import React from "react";
import { useStoreState } from ".@/store";
import { compareValues } from ".@/utilities/compare.js";

import "./Table.pcss";

const Table = () => {
  const { records } = useStoreState((store) => store.records);

  const formatRecords = ({ records }) => {
    // set base values
    let revenue = 0;
    let inProgress = 0;
    let inProgressThisMonth = 0;
    let productList = [];

    // get current year and month and convert into strings
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = new Date().getMonth().toString();

    // loop through all records
    for (let index = 0; index < records.length; index++) {
      // add up all record prices that have not been cancelled
      // if (records[index].order_status !== "cancelled") {
      revenue = revenue + records[index].price;
      // }

      // if record status is in_progress increament inProgress
      if (records[index].order_status === "in_progress") {
        inProgress++;
      }

      // seperate record date by - to compare the this year and month
      const splitDate = records[index].order_placed.toString().split("-");
      if (currentYear === splitDate[0] && currentMonth === splitDate[1]) {
        inProgressThisMonth++; // if this month increament inProgressThisMonth
      }

      // look for product_name inside the product list and return index, -1 if not found
      const productListIndex = productList.findIndex(
        (product) => product.name === records[index].product_name
      );

      // if productListIndex is found increase count else create new entry
      if (productListIndex !== -1) {
        productList[productListIndex].count++;
      } else {
        productList = [
          ...productList,
          { name: records[index].product_name, count: 1 },
        ];
      }
    }

    // sort product list by the count and flip for highest value first
    productList.sort((a, b) => compareValues(a.count, b.count)).reverse();

    // TODO insert a controller that allows the user to pick how many recent items they want

    // format return object
    const formattedData = {
      totalOrders: records.length,
      inProgress,
      inProgressThisMonth,
      revenue: parseFloat(revenue.toString()).toFixed(2),
      recentRecords: records.slice(0, 9),
      topThreeProducts: productList.slice(0, 3),
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
    topThreeProducts,
  } = formatRecords({ records });

  // TODO currently using a string for the currency type, should come from the api instead

  return (
    <div className="Table">
      <div className="TableItem">
        <p>Order Details</p>
        <div className="TableItemRow">
          <p>Total Orders</p>
          <p>{totalOrders}</p>
        </div>
        <div className="TableItemRow">
          <p>Total Orders this month</p>
          <p>{inProgressThisMonth}</p>
        </div>
        <div className="TableItemRow">
          <p>Number of orders in progress</p>
          <p>{inProgress}</p>
        </div>
        <div className="TableItemRow">
          <p>Revenue</p>
          <p>{`£${revenue}`}</p>
        </div>
      </div>
      <div className="TableItem">
        <p>Top Three Placed Items</p>
        {topThreeProducts.length > 0 &&
          topThreeProducts.map((product) => (
            <div key={`${product.name}_highest`} className="TableItemRow">
              <p>{product.name}</p>
              <p>{product.count}</p>
            </div>
          ))}
      </div>
      <div className="TableRecordCase">
        <p>A list of the most recent few orders</p>
        <div className="TableRecords">
          {recentRecords.map((recentRecord) => (
            <div
              key={`${recentRecord.order_id}_recent`}
              className="TableRecordItem"
            >
              <p>{recentRecord.product_name}</p>
              <div className="TableRecordItemDetails">
                <p>{recentRecord.order_placed.toString()}</p>
                <p>{`£${recentRecord.price}`}</p>
                <p>{recentRecord.order_status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
