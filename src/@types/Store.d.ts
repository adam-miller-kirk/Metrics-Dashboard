import { Action } from "easy-peasy";

type BaseStore = {
  title: string;
  setTitle: Action<BaseStore, BaseStore["title"]>;
};

type Store = {
  baseStore: BaseStore;
};
