import { createContext } from 'react';
import { Language } from 'types/language';

export const TargetLanguageContext = createContext<Language>(undefined);