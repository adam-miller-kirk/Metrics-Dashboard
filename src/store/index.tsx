import { createStore, createTypedHooks } from "easy-peasy";
import { records } from "./departments/records";

export type Store = {
  records: typeof records;
};

export const store = createStore<Store>({
  records,
});

// Setup typed hooks
const typeHooks = createTypedHooks<Store>();
export const { useStoreActions, useStoreDispatch, useStoreState } = typeHooks;
