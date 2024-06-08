import { useUserProfileContext } from "linguin-shared/context/userProfileContext";
import { Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function StoryListTitle() {
    const { userProfile, availableLanguagesMap, setLanguageChooseModalVisible } = useUserProfileContext();

    return (<>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setLanguageChooseModalVisible(true)}>
            <_ExpandIcon />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{availableLanguagesMap[userProfile.targetLanguage]} Stories</Text>
        </TouchableOpacity>
    </>);
}

function _ExpandIcon() {
    return (
        <Svg height="24" viewBox="0 -960 960 960" width="24"><Path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" /></Svg>
    );
}