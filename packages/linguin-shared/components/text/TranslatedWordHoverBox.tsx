import { Div, P } from "linguin-shared/components/RnTwComponents";
import WordPlayerButton from "linguin-shared/components/audio/WordPlayerButton";
import { TermTranslation } from "linguin-shared/model/translations";
import { Platform } from "react-native";

export interface TranslatedTermProps {
    termTranslation: TermTranslation;
}

export default function TranslatedWordHoverBox(props: TranslatedTermProps): JSX.Element {
    return (
        <Div>
            <Div style={{ flexDirection: "row", backgroundColor: "black", position: "absolute", bottom: 0, left: 0, borderRadius: 12, padding: 12, marginBottom: 24, marginHorizontal: "auto", alignItems: "center" }}>
                {Platform.OS == "web" && <WordPlayerButton word={props.termTranslation.text} />}

                <Div style={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <P style={{ color: "white", textAlign: "left", fontSize: 18 }}>
                        {props.termTranslation.translation}
                    </P>
                    {props.termTranslation.transliteration &&
                        <P style={{ textAlign: "left", color: "white", fontSize: 14, fontStyle: "italic" }}>
                            {props.termTranslation.transliteration}
                        </P>
                    }
                </Div>
            </Div>
        </Div>
    );
}