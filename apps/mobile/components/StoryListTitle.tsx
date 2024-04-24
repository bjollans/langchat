import { useTargetLanguageContext } from "linguin-shared/context/targetLanguageContext";
import { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function StoryListTitle() {
    const { targetLanguage, languageToLanguageString } = useTargetLanguageContext();
    const [languageModalVisible, setLanguageModalVisible] = useState(targetLanguage === "");

    return (<>
        <TouchableOpacity className='flex flex-row items-center' onPress={() => setLanguageModalVisible(true)}>
            <_ExpandIcon />
            <Text className='text-lg font-bold'>{languageToLanguageString[targetLanguage]} Stories</Text>
        </TouchableOpacity>
    </>);
}




function _ExpandIcon() {
    return (
        <Svg height="24" viewBox="0 -960 960 960" width="24"><Path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" /></Svg>
    );
}