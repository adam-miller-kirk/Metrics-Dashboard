import { action, Action } from "easy-peasy";

type Field = {
  order_id: number;
  order_placed: Date | string;
  product_name: string;
  price: number;
  order_status: string;
};

export type Records = {
  records: Field[];
  setRecords: Action<Records, Records["records"]>;
};

export const records: Records = {
  records: [],
  setRecords: action((state, payload) => {
    state.records = payload;
  }),
};
