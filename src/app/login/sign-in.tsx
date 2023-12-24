import Constants from "expo-constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

setStatusBarStyle("dark");

export default function Auth() {
  const [url, setUrl] = useState<string>();
  const { token } = useLocalSearchParams();
  const router = useRouter();

  const handleReturnNavigation = (res: string) => {
    if (res === "allow") {
      setTimeout(() => {
        router.replace({
          pathname: "/login/",
          params: { permission: "allow", validatedToken: token },
        });
      }, 1000);
    } else {
      setTimeout(() => {
        router.replace({ pathname: "/login/", params: { permission: "deny" } });
      }, 1000);
    }
  };

  const onNavigationChange = (navState: any) => {
    const { url } = navState;
    setUrl(url);
  };

  useEffect(() => {
    const navigateBack = () => {
      if (url?.includes("allow")) {
        handleReturnNavigation("allow");
      } else if (url?.includes("deny")) {
        handleReturnNavigation("deny");
      }
    };
    navigateBack();
  }, [url]);

  return (
    <View className="flex-1" style={{ paddingTop: Constants.statusBarHeight }}>
      <WebView
        source={{ uri: `https://www.themoviedb.org/authenticate/${token}` }}
        onNavigationStateChange={onNavigationChange}
        javaScriptEnabled
      />
    </View>
  );
}
