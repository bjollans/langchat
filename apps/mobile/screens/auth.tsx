import { SafeAreaView } from "react-native";
import AuthForm from "../components/AuthForm";

export default function Auth() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AuthForm />
        </SafeAreaView>
    );
}
