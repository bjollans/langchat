import { useAuth } from "linguin-shared/util/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, Linking, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Purchases from "react-native-purchases";
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
            <UserStatistics />
            <View style={{ paddingHorizontal: 48, marginBottom: 48, spaceBetween: 8 }}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Email:</Text>
                    <Text style={{ fontWeight: '600', fontSize: 16 }}>{auth?.user?.email}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>User Since:</Text>
                    <Text style={{ fontWeight: '600', fontSize: 16 }}>{new Date(auth?.user?.created_at).toLocaleDateString()}</Text>
                </View>
            </View>
            <Text style={{ marginHorizontal: 48, fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>Contact support@linguin.co for help.</Text>
            {loading
                ? <ActivityIndicator />
                : <>
                    <TouchableOpacity onPress={() => {
                        setLoading(true);
                        auth?.signout();
                    }} style={{ marginHorizontal: 48, borderRadius: 9999, borderWidth: 1, backgroundColor: '#FCA5A5', padding: 16, alignItems: 'center', marginBottom: 48 }}>
                        <Text style={{ color: '#1E293B', fontSize: 24, fontWeight: '600', textAlign: 'center' }}>Sign out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://www.linguin.co/auth/delete-my-account");
                        return false;
                    }} style={{ marginHorizontal: 48, borderRadius: 9999, borderWidth: 1, backgroundColor: '#DC2626', padding: 16, alignItems: 'center', marginBottom: 48 }}>
                        <Text style={{ color: '#F1F5F9', fontSize: 14, fontWeight: 'bold', textAlign: 'center', letterSpacing: -0.5 }}>!! DELETE ACCOUNT !!</Text>
                    </TouchableOpacity>
                </> 
            }
            {/* customerInfo && customerInfo.managementURL
                ? <TouchableOpacity onPress={() => Linking.openURL(customerInfo.managementURL)} style={{ marginHorizontal: 48, borderRadius: 9999, borderWidth: 1, backgroundColor: '#E0F2FE', padding: 16, alignItems: 'center', marginBottom: 48 }}>
                    <Text style={{ color: '#1E293B', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>Manage subscription</Text>
                </TouchableOpacity> 
                : <View style={{ paddingHorizontal: 48 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Subscribe For Unlimited Reading</Text>
                    <SubscribeButton />
                </View> 
            */}
            <AuthModal visible={!auth?.user} navigation={navigation} />
        </SafeAreaView>
    );
}