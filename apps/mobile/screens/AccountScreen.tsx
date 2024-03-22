import { useAuth } from "linguin-shared/util/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, Linking, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Purchases from "react-native-purchases";
import SubscribeButton from "../components/SubscribeButton";
import UserStatistics from "linguin-shared/components/user/UserStatistics";
import AuthModal from "../components/AuthModal";

export default function AccountScreen({ navigation }) {
    const auth = useAuth();
    const [customerInfo, setCustomerInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            const info = await Purchases.getCustomerInfo();
            setCustomerInfo(info);
        };
        fetchCustomerInfo();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-slate-50">
            <UserStatistics />
            <View className="px-12 space-y-2 mb-12">
                <View>
                    <Text className="font-bold text-lg">Email:</Text>
                    <Text className="font-semibold text-md">{auth?.user?.email}</Text>
                </View>
                <View>
                    <Text className="font-bold text-lg">User Since:</Text>
                    <Text className="font-semibold text-md">{new Date(auth?.user?.created_at).toLocaleDateString()}</Text>
                </View>
            </View>
            <Text className="mx-12 text-md font-bold text-center mb-4">Contact support@linguin.co for help.</Text>
            {loading
                && <ActivityIndicator />
                || <TouchableOpacity onPress={() => {
                    setLoading(true);
                    auth?.signout();
                }}
                    className="mx-12 rounded-full border bg-red-200 p-4 text-center text-lg mb-12">
                    <Text
                        className="mx-12 text-slate-800 text-2xl font-semibold tracking-tight text-center">Sign out</Text>
                </TouchableOpacity>
            }
            {customerInfo && customerInfo.managementURL
                && <TouchableOpacity onPress={() => Linking.openURL(customerInfo.managementURL)}
                    className="mx-12 rounded-full border bg-cyan-50 p-4 text-center text-lg mb-12">
                    <Text className="mx-12 text-slate-800 text-lg font-semibold tracking-tight text-center">
                        Manage subscription</Text>
                </TouchableOpacity>
                || <View className="px-12">
                    <Text className="text-center text-lg font-bold mb-4">Subscribe For Unlimited Reading</Text>
                    <SubscribeButton />
                </View>
            }
            <AuthModal visible={!auth?.user} navigation={navigation} />
        </SafeAreaView>
    );
}