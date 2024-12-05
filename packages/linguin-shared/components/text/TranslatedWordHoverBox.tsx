import { Div, P } from "linguin-shared/components/RnTwComponents";
import WordPlayerButton from "linguin-shared/components/audio/WordPlayerButton";
import { TermTranslation } from "linguin-shared/model/translations";
import { Platform } from "react-native";
import { createStyleSheet, useStyles } from 'react-native-unistyles'

export interface TranslatedTermProps {
    termTranslation: TermTranslation;
}

export default function TranslatedWordHoverBox(props: TranslatedTermProps): JSX.Element {
    const { styles } = useStyles(stylesheet)
    return (
        <Div style={styles.container}>
            {Platform.OS == "web" && <WordPlayerButton word={props.termTranslation.text} />}
            <Div style={styles.translationContainer}>
                <P style={styles.translationText}>
                    {props.termTranslation.translation}
                </P>
                {props.termTranslation.transliteration &&
                    <P style={styles.transliterationText}>
                        {props.termTranslation.transliteration}
                    </P>
                }
            </Div>
        </Div>
    );
}

const stylesheet = createStyleSheet((theme: any) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "black",
        position: "absolute",
        bottom: 0,
        left: 0,
        borderRadius: 12,
        padding: 12,
        marginBottom: 24,
        marginHorizontal: "auto",
        alignItems: "center"
    },
    translationContainer: { flexDirection: "column", alignItems: "flex-start", marginLeft: 4, marginRight:4 },
    translationText: { color: "white", textAlign: "left", fontSize: 18 },
    transliterationText: { textAlign: "left", color: "white", fontSize: 14, fontStyle: "italic" },
}));