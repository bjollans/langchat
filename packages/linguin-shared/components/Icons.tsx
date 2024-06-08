import {
    PauseCircleIcon as HeroPauseCircleIcon,
    PlayCircleIcon as HeroPlayCircleIcon,
    PlayIcon as HeroPlayIcon,
    LanguageIcon
} from "@heroicons/react/24/solid";
import { Platform } from 'react-native';
import Svg, { Path } from "react-native-svg";

import { CheckIcon as HeroCheckIcon } from "@heroicons/react/24/solid";

export function PlayCircleIcon(): JSX.Element {
    return Platform.OS === 'web' ?
        <HeroPlayCircleIcon style={{ color: 'rgb(125, 211, 252)', width: '1.5rem', height: '1.5rem' }} /> :
        <Svg height="48" viewBox="0 -960 960 960" width="48"><Path fill="#475569" d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></Svg>;
}

export function PauseCircleIcon(): JSX.Element {
    return Platform.OS === 'web' ?
        <HeroPauseCircleIcon style={{ color: 'rgb(125, 211, 252)', width: '1.5rem', height: '1.5rem' }} /> :
        <Svg height="48" viewBox="0 -960 960 960" width="48"><Path fill="#475569" d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></Svg>;
}

export function PlayIcon(): JSX.Element {
    return Platform.OS === 'web' ?
        <HeroPlayIcon style={{ color: 'rgb(165, 243, 252)', width: '1.5rem', height: '1.5rem' }} /> :
        <Svg height="32" viewBox="0 -960 960 960" width="32"><Path fill="#a5f3fc" d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" /></Svg>
}

export function TranslateIcon(): JSX.Element {
    return Platform.OS === 'web' ?
        <LanguageIcon style={{ height: '1.25rem', width: '1.25rem' }} aria-hidden="true" /> :
        <Svg height="16" viewBox="0 -960 960 960" width="16"><Path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z" /></Svg>
}

export function CheckIcon(): JSX.Element {
    return Platform.OS === 'web' ? <HeroCheckIcon style={{ height: '1rem', width: '1rem', color: 'rgb(34, 197, 94)', marginRight: '0.25rem' }} /> : <Svg height="20" viewBox="0 -960 960 960" width="16"><Path fill="#22c55e" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></Svg>
}