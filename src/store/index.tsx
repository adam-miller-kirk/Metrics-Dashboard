import { createStore, createTypedHooks } from "easy-peasy";
import { baseStore } from "./models/base";

export type Store = {
  baseStore: typeof baseStore;
};

export const store = createStore<Store>({
  baseStore,
});

// Setup typed hooks
const typeHooks = createTypedHooks<Store>();
export const { useStoreActions, useStoreDispatch, useStoreState } = typeHooks;
