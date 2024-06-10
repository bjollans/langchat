import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { CheckBox as CheckBoxRn } from 'react-native-elements';


interface DefaultProps {
    children?: React.ReactNode;
    className?: string;
    onMouseLeave?: () => void;
    onClick?: (e: any) => void;
    onLayout?: (e: any) => void;
    innerRef?: any;
    style?: any;
    innerKey?: string;
}

export function Div(props: DefaultProps): JSX.Element {
    if (Platform.OS === 'web') {
        return (
            <div className={props.className}
                key={props.innerKey}
                onMouseLeave={props.onMouseLeave}
                onClick={props.onClick}
                ref={props.innerRef}
                style={props.style}>
                {props.children}
            </div>
        );
    }
    return (
        <View key={props.innerKey} style={props.style} ref={props.innerRef}>
            {props.children}
        </View>
    );
}

export interface AudioProps {
    onEnded: () => void;
    audioRef: React.RefObject<HTMLAudioElement>;
    onTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement>) => void;
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLAudioElement>) => void;
    src: string;
    alt?: string;
}

export function Audio(props: AudioProps): JSX.Element {
    if (Platform.OS === 'web') {
        return (
            <audio
                onEnded={props.onEnded}
                ref={props.audioRef}
                onTimeUpdate={props.onTimeUpdate}
                onLoadedMetadata={props.onLoadedMetadata}
            >
                <source src={props.src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        );
    }
    return (<Text>TODO</Text>);
}

export function Btn(props: DefaultProps): JSX.Element {
    if (Platform.OS === 'web') {
        return (
            <button className={props.className}
                onMouseLeave={props.onMouseLeave}
                onClick={props.onClick}
                style={props.style}>
                {props.children}
            </button>
        );
    }
    return (
        <TouchableOpacity onPress={props.onClick} onLayout={props.onLayout}>
            <Span
                className={props.className}
                onMouseLeave={props.onMouseLeave}
                onClick={props.onClick}
                onLayout={props.onLayout}
                style={[props.style, { pointerEvents: "none" }]}
            >
                {props.children}
            </Span>
        </TouchableOpacity>
    );
}

export function SingleLayerBtn(props: DefaultProps): JSX.Element {
    if (Platform.OS === 'web') {
        return (
            <button className={props.className}
                onMouseLeave={props.onMouseLeave}
                onClick={props.onClick}
                style={props.style}>
                {props.children}
            </button>
        );
    }
    return (
        <TouchableOpacity onPress={props.onClick} onLayout={props.onLayout} style={props.style}>
            {props.children}
        </TouchableOpacity>
    );
}

export function P(props: DefaultProps): JSX.Element {
    const webElement = <p className={props.className} style={props.style}>{props.children}</p>;
    return _multiplatformTextElement(webElement, props);
}

interface ImgProps {
    className?: string;
    src?: string;
    alt?: string;
    style?: any;
}

export function Img(props: ImgProps): JSX.Element {
    if (Platform.OS === 'web') {
        return (
            <img className={props.className} src={props.src} alt={props.alt} />
        );
    }

    return (
        <Image source={{ uri: props.src }} alt={props.alt} style={props.style} />
    );
}

export function Br(): JSX.Element {
    return Platform.OS === 'web' ? <br /> : <Text>{"\n"}</Text>;
}

export function H1(props: DefaultProps): JSX.Element {
    const webElement = <h1 className={props.className}>{props.children}</h1>;
    return _multiplatformTextElement(webElement, props);
}

export function H2(props: DefaultProps): JSX.Element {
    const webElement = <h2 className={props.className}>{props.children}</h2>;
    return _multiplatformTextElement(webElement, props);
}

export function H3(props: DefaultProps): JSX.Element {
    const webElement = <h3 className={props.className}>{props.children}</h3>;
    return _multiplatformTextElement(webElement, props);
}

export function Span(props: DefaultProps): JSX.Element {
    const webElement = <span
        className={props.className}
        onMouseLeave={props.onMouseLeave}
        onClick={props.onClick}>
        {props.children}
    </span>;
    return _multiplatformTextElement(webElement, props);
}

function _multiplatformTextElement(webElement: JSX.Element, props: DefaultProps): JSX.Element {
    if (Platform.OS === 'web') {
        return webElement;
    }
    return (
        <Text style={props.style}>
            {props.children}
        </Text>
    );
}