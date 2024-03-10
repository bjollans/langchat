import { useAuth } from "linguin-shared/util/auth";
import { useEffect, useState } from "react";
import { Linking, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Purchases from "react-native-purchases";
import SubscribeButton from "../components/SubscribeButton";
import UserStatistics from "linguin-shared/components/user/UserStatistics";

export default function AccountScreen() {
    const auth = useAuth();
    const [customerInfo, setCustomerInfo] = useState(null);

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            const info = await Purchases.getCustomerInfo();
            setCustomerInfo(info);
        };
        fetchCustomerInfo();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }} className="px-12 bg-slate-50">
            <UserStatistics />
            <View className="space-y-2 mb-12">
                <View>
                    <Text className="font-bold text-lg">Email:</Text>
                    <Text className="font-semibold text-md">{auth?.user?.email}</Text>
                </View>
                <View>
                    <Text className="font-bold text-lg">User Since:</Text>
                    <Text className="font-semibold text-md">{new Date(auth?.user?.created_at).toLocaleDateString()}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => auth?.signout()}
                className="rounded-full border bg-red-200 p-4 text-center text-lg mb-12">
                <Text
                    className="text-slate-800 text-2xl font-semibold tracking-tight text-center">Sign out</Text>
            </TouchableOpacity>
            {customerInfo && customerInfo.managementURL
                && <TouchableOpacity onPress={() => Linking.openURL(customerInfo.managementURL)}
                    className="rounded-full border bg-cyan-50 p-4 text-center text-lg mb-12">
                    <Text className="text-slate-800 text-lg font-semibold tracking-tight text-center">
                        Manage subscription</Text>
                </TouchableOpacity>
                || <View>
                    <Text className="text-center text-lg font-bold mb-4">Subscribe For Unlimited Reading</Text>
                    <SubscribeButton />
                </View>
            }
        </SafeAreaView>
    );
}