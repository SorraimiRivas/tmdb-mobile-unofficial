import { Slot } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { Provider } from "react-redux";

import { store } from "@/redux/store";

export default function Root() {
  setStatusBarStyle("light");

  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
