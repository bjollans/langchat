import { createContext } from 'react';

// The context here is to track if a user has read a story

export const minReadUsageEvents = 5;

export const OnReadUsageEvent = createContext<() => void>(() => void 0);