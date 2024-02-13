import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { LanguageIcon, PlayIcon } from '@heroicons/react/24/solid';

export function PlayButton(onClick): JSX.Element {
    if (Platform.OS === 'web') {
        return <PlayIcon className="text-slate-100 w-6 h-6" onClick={onClick} />;
    }
    return (
        <Icon.Button
            name="play_arrow"
            backgroundColor="#ffffff"
            className="text-slate-100 w-6 h-6"
            onPress={onClick}
        />
    );
}

export function TranslateButton(onClick): JSX.Element {
    if (Platform.OS === 'web') {
        return (<button className="hover:bg-slate-200 text-black font-bold py-2 px-2 mx-4 rounded" onClick={onClick}>
            <LanguageIcon className="h-5 w-5" aria-hidden="true" />
        </button>);
    }
    return (
        <Icon.Button
            name="translate"
            backgroundColor="#ffffff"
            className="text-slate-100 w-6 h-6"
            onPress={onClick}
        />
    );
}