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
    { sign: "ख", sound: "kha", note: "This has no equivalent in English, just try to pronounce an 'h' after the 'k'." },
    { sign: "ग", sound: "ga", soundInEnglish: { start: "", sound: "g", end: "ame" } },
    { sign: "घ", sound: "gha" },
    { sign: "ङ", sound: "nga", soundInEnglish: { start: "si", sound: "ng", end: "" } }];


    const consonants2 = [{ sign: "च", sound: "cha", soundInEnglish: { start: "", sound: "ch", end: "at" } },
    { sign: "छ", sound: "chha" },
    { sign: "ज", sound: "ja", soundInEnglish: { start: "", sound: "j", end: "ump" }, note: <span>If you add a dot to the bottom it becomes <LetterAudioElement letter="ज़" /> (za) as in zoo</span> },
    { sign: "झ", sound: "jha" },
    { sign: "ञ", sound: "nya", soundInEnglish: { start: "ca", sound: "ny", end: "on" } },];

    const consonants3 = [{ sign: "त", sound: "ta", soundInEnglish: { start: "", sound: "t", end: "art" } },
    { sign: "थ", sound: "tha" },
    { sign: "द", sound: "da", soundInEnglish: { start: "", sound: "d", end: "og" } },
    { sign: "ध", sound: "dha" },
    { sign: "न", sound: "na", soundInEnglish: { start: "", sound: "n", end: "ice" } },];

    const consonants4 = [{ sign: "ट", sound: "ṭa" },
    { sign: "ठ", sound: "ṭha" },
    { sign: "ड", sound: "ḍa" },
    { sign: "ढ", sound: "ḍha" },
    { sign: "ण", sound: "ṇa" },];

    const consonants5 = [{ sign: "ड़", sound: "ṛa" },
    { sign: "ढ़", sound: "ṛha" },];

    const consonants6 = [{ sign: "प", sound: "pa", soundInEnglish: { start: "", sound: "p", end: "ot" } },
    { sign: "फ", sound: "pha", note: <span>If you add a dot to the bottom (<LetterAudioElement letter="फ़" />) it becomes a “f” like in “foto”.</span> },
    { sign: "ब", sound: "ba", soundInEnglish: { start: "", sound: "b", end: "at" } },
    { sign: "भ", sound: "bha" },
    { sign: "म", sound: "ma", soundInEnglish: { start: "", sound: "m", end: "other" } },];

    const consonants7 = [{ sign: "य", sound: "ya", soundInEnglish: { start: "", sound: "y", end: "es" } },
    { sign: "र", sound: "ra", note: "This rolling ”R” sound does not exist in English, but in many other languages (e.g. Spanish). If you cannot make this sound, don't worry. People also understand if you use an ‘r’ like in “crazy”." },
    { sign: "ल", sound: "la", soundInEnglish: { start: "", sound: "l", end: "amp" } },
    { sign: "व", sound: "va", soundInEnglish: { start: "", sound: "v", end: "ase" } },];

    const consonants8 = [{ sign: "श", sound: "sha", soundInEnglish: { start: "", sound: "sh", end: "ort" } },
    { sign: "ष", sound: "ṣa", note: "A ”sh”, pronounced with the tongue curled back, but nobody notices if you pronounce it as a regular “sh”." },
    { sign: "स", sound: "sa", soundInEnglish: { start: "", sound: "s", end: "un" } },
    { sign: "ह", sound: "ha", soundInEnglish: { start: "", sound: "h", end: "at" } },];

    const br = <span className="mb-6 block" />;
    const pClass = "text-lg leading-loose my-12";
    const h2Class = "text-4xl font-bold my-12 mt-32";
    const tableClass = "text-md leading-10 my-6 mt-12";

    return (
        <div className="mx-auto max-w-7xl mt-4 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <p className={pClass}>
                    This is part 2 of our Hindi reading guide (<a className="link" href="/articles/how-to-read-hindi">Click here for Part 1</a>).
                    {br}
                    In this part you will learn the basic Hindi alphabet (also called "Devanagri") with its consonants and vowels.
                    {br}
                    For future reference, here is a chart of the Hindi alphabet:
                    {br}
                    <img src="/images/hindi-alphabet-chart.gif" alt="Hindi Alphabet Chart" className="w-full" />
                    {br}
                    When memorising letters it helps a lot to write them down yourself. Get a pen and paper.
                    {br}
                    We will start with the vowels (see below). To learn the pronunciation, click the letters to hear them spoken, or read the text below them.
                </p>
                <div className={tableClass}><LetterTable letterExplanations={vowels} /></div>
                <p className={pClass}>
                    Copy the letters to your paper. Then try to write them from memory. Only move on when you can write them all by heart and remember their pronunciation.
                    {br}
                    Memorizing the vowels should take 10-20 minutes.
                    {br}
                    Let’s move on to the first row of the consonants.
                    Again, write all of these with a pen on your paper. When you know them by heart, move on to the next line. Remembering this line should take another 5-10 minutes.
                </p>
                <div className={tableClass}><LetterTable letterExplanations={consonants1} /></div>
                <p className={pClass}>
                    Congratulations, you know one third of the alphabet! Keep it up.
                    {br}
                    In Hindi most letters have a version with and without an 'h' sound (like <LetterAudioElement letter="क" /> and <LetterAudioElement letter="ख" />). Most of the time there are no English words with an equivalent sound. Instead, tap the letter to hear the pronunciation.
                    {br}
                    Let's move on to the next line. By now you know the drill, copy the row below until you can write it by heart.
                </p>
                <div className={tableClass}><LetterTable letterExplanations={consonants2} /></div>
                <p className={pClass}>
                    After memorizing this line, take a 5 minute break. Then see if you still know all the letters you learnt by heart. If not go back and revise them.
                </p>
                <p className={pClass}>
                    {br}
                    The next two lines need some explaining. If you are not born in India, the difference between them takes a lot of practice to hear.
                    {br}
                    Both lines have "t" and "d" sounds, but one line has dots underneath ("ṭ" and "ḍ"). For "t" and "d" your tongue touches your teeth (called "dental"). For "ṭ" and "ḍ" it touches above your teeth (called "retroflex"). Even slightly above your teeth is enough.
                    {br}
                    Now memorize both rows by writing them down on paper. The first line does not have any English equivalents, so click the letters to hear their pronounciation.
                </p>
                <div className={tableClass}><LetterTable letterExplanations={consonants4} /></div>
                <div className={tableClass}><LetterTable letterExplanations={consonants3} /></div>
                <p className={pClass}>
                    When you are done. Revise some previous letters. Write down the letters for "ka", "kha", "ga", "gha", "cha", "chha", "ja" and "jha".
                    {br}
                    Let's move on. Memorize the next row:
                </p>
                    <div className={tableClass}><LetterTable letterExplanations={consonants6} /></div>
                <p className={pClass}>
                    The next line only contains two letters. I have singled them out, because pronouncing them takes some explaining.
                </p>
                <div className={tableClass}><LetterTable letterExplanations={consonants5} /></div>
                <p className={pClass}>
                    These are “ṛ” sounds. If you are an English speaker, they will likely sound very new to you.
                    {br}
                    To make the sound, put your tongue to the top of your mouth. Now make an "L" sound while moving your tongue to the bottom of your mouth. Your tongue should move with some force, so that there is a small clicking sound.
                    {br}
                    While speaking your tongue will only touch the top briefly, making it a flapping movement.
                    {br}
                    Once you have memorized them study the last two lines. Write them down like before.
                </p>
                <div className={tableClass}><LetterTable letterExplanations={consonants7} /></div>
                <div className={tableClass}><LetterTable letterExplanations={consonants8} /></div>
                <p className={pClass}>
                    You made it through! That was the whole Hindi alphabet. Congratulations!!!
                    {br}
                    Try to write all letters in one go. Don't worry if you can't remember all. If you know 90%, you are ready to move on to Matras.
                </p>
                <div className="mb-12 flex justify-end">
                    <a href="/articles/hindi-matras" className="text-lg border shadow p-2 link">
                        Lesson 3: Matras <ChevronDoubleRightIcon className="h-5 w-5 inline" />
                    </a>
                </div>
            </div>
        </div>
    );
}