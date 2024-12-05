import { useUserProfileContext } from 'linguin-shared/context/userProfileContext';
import React, { useMemo } from 'react';


export default function LanguageChooseModal({ visible, close }) {
    const { availableLanguagesMap, updateUserProfile } = useUserProfileContext();

    return (
        <ul>
            {Object.entries(availableLanguagesMap).map(([key, value]) => (
                <li key={key}>
                    <a href={`/story/${key}`}>
                        {value}
                    </a>
                </li>
            ))}
        </ul >
    );
}