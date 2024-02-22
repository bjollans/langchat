import { Div, P } from "linguin-shared/components/RnTwComponents";
import WordPlayerButton from "linguin-shared/components/audio/WordPlayerButton";
import { TermTranslation } from "linguin-shared/model/translations";
import { Platform } from "react-native";

export interface TranslatedTermProps {
    termTranslation: TermTranslation;
}

export default function TranslatedWordHoverBox(props: TranslatedTermProps): JSX.Element {
    return (<Div>
        <Div className="flex flex-row space-x-1 bg-black absolute bottom-0 left-0 rounded-lg p-3 mb-6 mx-auto -space-y-2 items-center">
            {Platform.OS == "web" && <WordPlayerButton word={props.termTranslation.text} />}
            <Div className="flex flex-col items-start">
                <P className="text-white align-start text-lg ">{props.termTranslation.translation}</P>
                {props.termTranslation.transliteration &&
                    <P className="align-start text-white text-sm italic">
                        {props.termTranslation.transliteration}
                    </P>
                }
            </Div>
        </Div>
    </Div>
    );
}