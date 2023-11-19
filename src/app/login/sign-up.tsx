import { SafeAreaView } from "react-native";
import WebView from "react-native-webview";

const SignUp = () => {
  return (
    <SafeAreaView>
      <WebView source={{ uri: "https://www.themoviedb.org/signup" }} />;
    </SafeAreaView>
  );
};

export default SignUp;
