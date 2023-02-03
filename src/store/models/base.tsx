import { action, Action } from "easy-peasy";

export type BaseStore = {
  title: string;
  setTitle: Action<BaseStore, BaseStore["title"]>;
};

export const baseStore: BaseStore = {
  title: "",
  setTitle: action((state, payload) => {
    state.title = payload;
  }),
};
