import "react-native-gesture-handler";
import { Slot } from "expo-router";
import { Provider } from "react-redux";

import { store } from "@/redux/store";

export default function Root() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
