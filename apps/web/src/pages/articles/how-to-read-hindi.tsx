import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import LetterAudioElement from "components/articles/LetterAudioElement";
import LetterTable, { LetterExplanation } from "components/articles/LetterTable";

export default function HowToReadHindi() {

    const vowels: LetterExplanation[] = [
        { sign: "अ", sound: "a", soundInEnglish: { start: "Americ", sound: "a", end: "" } },
        { sign: "आ", sound: "aa", soundInEnglish: { start: "f", sound: "a", end: "ther" } },
        { sign: "इ", sound: "i", soundInEnglish: { start: "b", sound: "i", end: "t" } },
        { sign: "ई", sound: "ii", soundInEnglish: { start: "mach", sound: "i", end: "ne" } },
        { sign: "उ", sound: "u", soundInEnglish: { start: "p", sound: "u", end: "t" } },
        { sign: "ऊ", sound: "uu", soundInEnglish: { start: "c", sound: "oo", end: "l" } },
        { sign: "ए", sound: "e", soundInEnglish: { start: "caf", sound: "e", end: "" } },
        { sign: "ऐ", sound: "ai", soundInEnglish: { start: "p", sound: "a", end: "rent" } },
        { sign: "ओ", sound: "o", soundInEnglish: { start: "n", sound: "o", end: "te" } },
        { sign: "औ", sound: "au", soundInEnglish: { start: "b", sound: "o", end: "ring" } }
    ];

    const consonants1: LetterExplanation[] = [{ sign: "क", sound: "ka", soundInEnglish: { start: "", sound: "k", end: "ite" } },
    { sign: "ख", sound: "kha", note: "A more aspirated version of 'k', similar to the 'k' in \"echo\" when spoken quickly. If you add a dot to the bottom (ख़) the sound changes to a “french R”. There is no English equivalent, so click the letter to hear the pronunciation." },
    { sign: "ग", sound: "ga", soundInEnglish: { start: "", sound: "g", end: "ame" } },
    { sign: "घ", sound: "gha", soundInEnglish: { start: "do", sound: "gh", end: "ouse" } },
    { sign: "ङ", sound: "nga", soundInEnglish: { start: "si", sound: "ng", end: "" } }];

    const letterExamples: LetterExplanation[] = [
        { sign: "क", sound: "ka" },
        { sign: "ग", sound: "ga" },
        { sign: "त", sound: "ta" }
    ];
    const matraExamples: LetterExplanation[] = [
        { sign: "का", sound: "ka" },
        { sign: "कि", sound: "ki" },
        { sign: "कु", sound: "ku" },
    ];

    const br = <span className="mb-6 block" />;
    const pClass = "text-lg leading-loose my-12";
    const h2Class = "text-4xl font-bold my-12 mt-32";
    const tableClass = "text-md leading-10 my-12";

    return (
        <div className="mx-auto max-w-7xl mt-4 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <p className={pClass}>
                    <span className="text-xl">You can learn to read Hindi in 2 days. Here’s how.</span>
                    {br}
                    Below are some Hindi letters and their pronunciation. You can tap all letters to hear their sound. Try it out:
                </p>
                <div className={tableClass}>
                    <LetterTable letterExplanations={letterExamples} />
                </div>
                <p className={pClass}>
                    The Hindi alphabet is called “Devanagri” and is also used in other languages. Letters represent syllables (or "aksar"). This is a key difference to the Latin alphabet (used in English).
                    {br}
                    For example: The word “Parrot” has two syllables “Par” and “Rot”, both have 3 letters. In Hindi, Parrot is <LetterAudioElement letter="तोता" /> (tota). The two letters “<LetterAudioElement letter="तो" />” and “<LetterAudioElement letter="ता" />” are also each one syllable.
                    {br}
                    Devanagri has so called "Matras", which change the pronounciation of letters. Below you can see how some of them change the pronounciation of the letter "<LetterAudioElement letter="क" />" (ka).
                </p>
                <div className={tableClass}>
                    <LetterTable letterExplanations={matraExamples} />
                </div>
                <p className={pClass}>
                    That was only a short overview. To learn the complete Hindi alphabet, I strongly recommend following these steps:
                </p>
                <ul className={"list-decimal pl-6 " + pClass}>
                    <li>(1 - 2 days): Memorise the Hindi alphabet. Go <a href="/articles/hindi-alphabet" className="underline">here</a> for this lesson.</li>

                    <li>(0 - 1 days): Memorise the Matras. Go <a href="/articles/hindi-matras" className="underline">here</a> for this lesson.</li>

                    <li>(30 minutes): Combine letters. Go <a href="/articles/hindi-pronunciation" className="underline">here</a> for this lesson.</li>

                    <li>Practice, Practice, Practice: Without practice you will forget Devanagri. Use our easy practice stories <a href="/story/hi" className="underline">here</a>.</li>
                </ul>
                <p className={pClass}>
                    For a refresher, you can always check out our Hindi alphabet chart:
                    {br}
                    <img src="/images/hindi-alphabet-chart.gif" alt="Hindi Alphabet Chart" className="w-full" />
                </p>
                <div className="mb-12 flex justify-end">
                    <a href="/articles/hindi-alphabet" className="text-lg border shadow p-2 link">
                        Lesson 2: Hindi Alphabet <ChevronDoubleRightIcon className="h-5 w-5 inline" />
                    </a>
                </div>
            </div>
        </div>
    );
}