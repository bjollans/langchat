import DailyReadStatContextProvider from "linguin-shared/context/dailyReadStatContext";
import { Div } from "linguin-shared/components/RnTwComponents";
import { StoryTranslation } from "linguin-shared/model/translations";
import TranslationRenderer from "linguin-shared/util/translationRendering";
import { useMemo } from "react";

export interface StoryTextRenderProps {
    storyTranslation: StoryTranslation;
}

export default function StoryTextRender(props: StoryTextRenderProps): JSX.Element {

    const renderedLines = useMemo(() => {
        const renderer = new TranslationRenderer(props.storyTranslation);
        return renderer.renderLines();
    }, [props.storyTranslation?.content]);

    return (
        <DailyReadStatContextProvider>
            <Div className="max-w-4xl mx-auto">{renderedLines}</Div>
        </DailyReadStatContextProvider>
    );
}