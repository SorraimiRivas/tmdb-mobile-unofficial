import { View, Text, Pressable, Alert } from "react-native";
import { Image } from "expo-image";

import Popover from "react-native-popover-view/dist/Popover";
import { MaterialIcons } from "@expo/vector-icons";

import { useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/redux/sessionSlice";
import { blurhash } from "@/lib/constants";
import { profileNav } from "@/lib/data";
import { TGravatar } from "@/lib/types";
import { Link, useRouter } from "expo-router";

type Props = {
  image: string;
  avatar: TGravatar;
  username: string;
  userEmail: string;
  isAuth: boolean;
};

const HeaderProfileButton = ({
  image,
  username,
  userEmail,
  isAuth,
  avatar,
}: Props) => {
  const router = useRouter();
  const avatarURL = `https://gravatar.com/avatar/${avatar}.jpg`;
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    router.push("/login/");
  };

  const handleSignUp = () => {
    router.push("/login/sign-up");
  };

  const handleLogout = () => {
    Alert.alert(
      "Warning!",
      "Are you sure you want to logout? If you log out you wont have access to interactive features.",
      [
        { text: "Cancel", style: "destructive" },
        {
          text: "Logout",
          onPress: () => dispatch(logout()),
          style: "default",
        },
      ],
    );
  };

  return (
    <Popover
      from={
        isAuth ? (
          <Pressable className="mx-4 h-8 w-8">
            <Image
              source={{ uri: image || avatarURL }}
              placeholder={blurhash}
              contentFit="cover"
              className="h-10 w-10 rounded-full bg-white"
            />
          </Pressable>
        ) : (
          <Pressable className="top-1 mx-4">
            <MaterialIcons name="person" size={35} color="white" />
          </Pressable>
        )
      }
      popoverStyle={{
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
        width: (!isAuth && 150) || null,
      }}
    >
      {!isAuth ? (
        <View className="relative -left-2 mr-2 gap-2 px-2">
          <Pressable className="pt-1" onPress={handleLogin}>
            <Text>Login</Text>
          </Pressable>
          <View className="absolute -left-[200] top-1/2 w-[99999] border border-gray-200" />
          <Pressable className="pt-2" onPress={handleSignUp}>
            <Text className="font-medium text-gray-600">Sign up</Text>
          </Pressable>
        </View>
      ) : (
        <View className="">
          <View className="relative">
            <Text className="text-sm font-semibold">
              {username || userEmail}
            </Text>
            <Link href="/(drawer)/profile" asChild>
              <Pressable>
                <Text className="mb-2 pb-1 text-xs text-gray-600">
                  View profile
                </Text>
              </Pressable>
            </Link>
            <View className="absolute -left-[200] bottom-0 w-[99999] border border-gray-200" />
          </View>
          <View className="relative flex gap-4 py-2">
            {profileNav.map((item) => (
              <Pressable key={item.title}>
                <Text className="font-medium capitalize text-gray-600">
                  {item.title}
                </Text>
              </Pressable>
            ))}
            <View className="absolute -left-[200] bottom-0 w-[99999] border border-gray-200" />
          </View>
          <View className="relative gap-2 pb-2 pt-2">
            <Text className="font-medium text-gray-600">Edit profile</Text>
            <Pressable>
              <Text className="font-medium text-gray-600">Settings</Text>
            </Pressable>
            <View className="absolute -left-[200] bottom-0 w-[99999] border border-gray-200" />
          </View>
          <Pressable className="py-2" onPress={handleLogout}>
            <Text className="font-medium text-gray-600">Logout</Text>
          </Pressable>
        </View>
      )}
    </Popover>
  );
};

export default HeaderProfileButton;
