import { Vocab } from "model/vocab";

const _leitnerBoxToTimeIntervalMs = [
    60_000, // 1 minute
    120_000, // 2 minutes
    1440 * 60_000, // 1 day
    3 * 1440 * 60_000, // 3 days
    7 * 1440 * 60_000, // 7 days
    14 * 1440 * 60_000, // 14 days
    30 * 1440 * 60_000, // 30 days
    60 * 1440 * 60_000, // 60 days
    120 * 1440 * 60_000, // 120 days
    365 * 1440 * 60_000, // 365 days
]

const _dueThresholdMs = 12 * 60 * 60_000; // 12 hours

export function nextReview(vocab: Vocab): Date {
    return new Date(new Date(vocab.lastPracticed!).getTime() + _leitnerBoxToTimeIntervalMs[vocab.currentLeitnerBoxNumber!]);
}

export function timeUntilNextReview(vocab: Vocab): number {
    return Date.now() - nextReview(vocab).getTime();
}

function _shouldReview(vocab: Vocab) {
    return Math.abs(Date.now() - nextReview(vocab).getTime()) < _dueThresholdMs;
}

export function orderAndFilterVocabList(vocabList: Array<Vocab>) {
    const filteredVocabList = vocabList.filter(_shouldReview);
    filteredVocabList.sort((a, b) => nextReview(a).getTime() - nextReview(b).getTime());
    return filteredVocabList;
}

export function getCardsLeftToday(vocabList: Array<Vocab>) {
    var cardsLeft = 0;
    vocabList.forEach(vocab => cardsLeft += vocab.currentLeitnerBoxNumber! === 0 ? 2 : 1);
    return cardsLeft;
}