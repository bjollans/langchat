import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import LetterAudioElement from "components/articles/LetterAudioElement";
import LetterTable, { LetterExplanation } from "components/articles/LetterTable";

export default function HowToReadHindi() {

    const matras1: LetterExplanation[] = [{ sign: "का", sound: "kaa", soundInEnglish: { start: "c", sound: "a", end: "r" } },
    { sign: "कि", sound: "ki", soundInEnglish: { start: "k", sound: "i", end: "d" } },
    { sign: "की", sound: "kii", soundInEnglish: { start: "k", sound: "ey", end: "" } },
    { sign: "कु", sound: "ku", soundInEnglish: { start: "c", sound: "ou", end: "ld" } },
    { sign: "कू", sound: "kuu", soundInEnglish: { start: "c", sound: "oo", end: "l" } },
    { sign: "के", sound: "ke", soundInEnglish: { start: "bask", sound: "e", end: "t" } },
    { sign: "कै", sound: "kai", soundInEnglish: { start: "c", sound: "a", end: "re" } },
    { sign: "को", sound: "ko", note: "There is no good English equivalent. It is similar to the \"o\" in \"note\"" },
    { sign: "कौ", sound: "kau", soundInEnglish: { start: "c", sound: "ou", end: "gh" } },
    { sign: "कृ", sound: "kr", note: <span>This matra adds an <LetterAudioElement letter="र" /> sound. There is no English equivalent.</span> }];


    const matras2: LetterExplanation[] = [{ sign: "पा", sound: "paa", soundInEnglish: { start: "p", sound: "a", end: "th" } },
    { sign: "पि", sound: "pi", soundInEnglish: { start: "p", sound: "i", end: "t" } },
    { sign: "पी", sound: "pii", soundInEnglish: { start: "p", sound: "ee", end: "r" } },
    { sign: "पु", sound: "pu", soundInEnglish: { start: "p", sound: "u", end: "t" } },
    { sign: "पू", sound: "puu", soundInEnglish: { start: "p", sound: "oo", end: "dle" } },
    { sign: "पे", sound: "pe", soundInEnglish: { start: "p", sound: "e", end: "t" } },
    { sign: "पै", sound: "pai", soundInEnglish: { start: "p", sound: "ai", end: "r" } },
    { sign: "पो", sound: "po" },
    { sign: "पौ", sound: "pau", soundInEnglish: { start: "p", sound: "o", end: "t" } },
    { sign: "पृ", sound: "pr" }];

    const matras3: LetterExplanation[] = [
        { sign: "कं", sound: "kan", soundInEnglish: { start: "c", sound: "an", end: "" }, note: <span>A dot like this adds an “n” sound after the syllable. It can be combined with other matras, so <LetterAudioElement letter="का" /> + <LetterAudioElement letter="अं" /> = <LetterAudioElement letter="कां" /> (kaan)</span> },
        { sign: "कँ", sound: "ka", note: "This makes the sound nasal. There is no equivalent in English. Instead listen to the audio by clicking the letter." },
        { sign: "क़", sound: "ka", note: "A dot below the letter does not change the pronunciation and is only used in loan words." },
        { sign: "कॉ", sound: "kau", soundInEnglish: { start: "c", sound: "ou", end: "gh" }, note: "This is pronounced the same as कौ and is only used in loan words" }];

    const br = <span className="mb-6 block" />;
    const pClass = "text-lg leading-loose my-12";
    const h2Class = "text-4xl font-bold my-12 mt-32";
    const tableClass = "text-md leading-10 my-12";

    return (
        <div className="mx-auto max-w-7xl mt-4 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <p className="text-lg leading-loose mt-12 mb-4">
                    This is lesson 3 of our Hindi reading guide. You can find the previous lessons here:
                </p>
                <ul className="list-disc pl-6 text-lg leading-loose">
                    <li><a className="link" href="/articles/how-to-read-hindi">Lesson 1: Intro</a></li>
                    <li><a className="link" href="/articles/hindi-alphabet">Lesson 2: Hindi Alphabet</a></li>
                </ul>
                <p className={pClass}>
                    All letters you studied so far end in an 'a' sound. If you want to write any other sound (like 'i' or 'u'), you need to add lines to the letters (called Matras).
                    {br}
                    Below are the most important Matras (applied to 'क'). You should study them the same as the letters. Take these 10 signs and copy them on paper. Try to write them all by heart.
                </p>
                <div className={tableClass}><LetterTable letterExplanations={matras1} /></div>
                <p className={pClass}>
                    Those were all the most important Matras. Before moving on, write these Matras on another letter. Here they are with प:
                </p>
                <div className={tableClass}><LetterTable letterExplanations={matras2} /></div>
                <p className={pClass}>
                    The next Matras are more rare, but you should still know them:
                </p>
                <div className={tableClass}><LetterTable letterExplanations={matras3} /></div>
                <p className={pClass}>
                    There are a few more Matras in Devanagri, that are practically never used in modern Hindi, so we will not go over them.
                    {br}
                    Congratulations, you have memorized the whole of Devanagri. Finish up with our guide on how to combine letters to words. There are just a few rules you need to remember.
                </p>
                <div className="mb-12 flex justify-end">
                    <a href="/articles/joining-letter-in-hindi" className="text-lg border shadow p-2 link">
                        Lesson 4: Joining Letter in Hindi <ChevronDoubleRightIcon className="h-5 w-5 inline" />
                    </a>
                </div>
            </div>
        </div>
    );
}