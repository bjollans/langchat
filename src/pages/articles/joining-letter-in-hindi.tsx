import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import LetterAudioElement from "components/articles/LetterAudioElement";
import LetterTable, { LetterExplanation } from "components/articles/LetterTable";

export default function HowToReadHindi() {
    const br = <span className="mb-6 block" />;
    const pClass = "text-lg leading-loose my-12";
    const h2Class = "text-4xl font-bold my-12 mt-32";
    const tableClass = "text-md leading-10 my-12";

    const conjuncts: LetterExplanation[] = [
        { sign: "त्क", sound: "tka", annotation: "त + क" },
        { sign: "स्क", sound: "ska", annotation: "स + क" },
        { sign: "च्क", sound: "chka", annotation: "च + क" },
        { sign: "ज्क", sound: "jka", annotation: "ज + क" },
        { sign: "ब्क", sound: "bka", annotation: "ब + क" },
        { sign: "व्क", sound: "vka", annotation: "व + क" },
        { sign: "ल्क", sound: "lka", annotation: "ल + क" },
        { sign: "क्क", sound: "kka", annotation: "क + क" },
        { sign: "म्क", sound: "mka", annotation: "म + क" },
        { sign: "फ्क", sound: "fka", annotation: "फ + क" },
        { sign: "न्क", sound: "nka", annotation: "न + क" },
        { sign: "श्क", sound: "shka", annotation: "श + क" },
        { sign: "ग्क", sound: "gka", annotation: "ग + क" },
        { sign: "र्क", sound: "rka", annotation: "र + क" },
        { sign: "क्र", sound: "kra", annotation: "क + र" },
    ];

    const rConjuncts: LetterExplanation[] = [
        { sign: "र्क", sound: "rka", annotation: "र + क" },
        { sign: "क्र", sound: "kra", annotation: "क + र" },
        { sign: "कृ", sound: "kra", annotation: "क +  ृ" }
    ];

    const irregularConjuncts: LetterExplanation[] = [
        { sign: "क्ष", sound: "ksha", annotation: "क + ष" },
        { sign: "त्र", sound: "tra", annotation: "त + र" },
        { sign: "ज्ञ", sound: "gya", annotation: "ज + ञ" },
        { sign: "श्र", sound: "shra", annotation: "श + र" },
    ];

    const combinationIllustration: LetterExplanation[] = [
        { sign: "स्का", sound: "skaa", annotation: "Combined" },
        { sign: "सका", sound: "sakaa", annotation: "Not Combined" },
    ];


    return (
        <div className="mx-auto max-w-7xl mt-4 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <p className={pClass}>
                    This is lesson 4 of our Hindi reading guide. You can find the previous lessons here:
                    <ul className="list-disc pl-6">
                        <li><a className="underline text-blue-500" href="/articles/how-to-read-hindi">Lesson 1: Intro</a></li>
                        <li><a className="underline text-blue-500" href="/articles/hindi-alphabet">Lesson 2: Hindi Alphabet</a></li>
                        <li><a className="underline text-blue-500" href="/articles/hindi-alphabet">Lesson 3: Matras</a></li>
                    </ul>
                    {br}
                    In Hindi you can combine two letters to remove the 'a' sound in between. The first letter is only written half, like so:
                    {br}
                    <div className={tableClass}><LetterTable letterExplanations={combinationIllustration} /></div>
                    {br}
                    Every letter looks different when you combine it. Here are the most common ones (combined with क). There is no need to spend much time on these. You should be able to read them even without memorizing.
                    {br}
                    <div className={tableClass}><LetterTable letterExplanations={conjuncts} /></div>
                    {br}
                    As you can see, the <LetterAudioElement letter="र"/> is a little special. There are three ways to combine it with another letter:
                    {br}
                    <div className={tableClass}><LetterTable letterExplanations={rConjuncts} /></div>
                    {br}
                    There are some irregular combinations, that do not show up often. I still recommend writing them down on paper and memorizing them.
                    {br}
                    <div className={tableClass}><LetterTable letterExplanations={irregularConjuncts} /></div>
                    {br}
                    These were all letter combinations. But they are not the only way to combine letters.
                    {br}
                    As in any language, you can combine letters to make words. Hindi has 4 extra rules that change pronunciation by removing an 'a' sound from the word. Once you memorized these rules you know how to read Hindi.
                    {br}
                    The 'a' sound gets removed... 
                    {br}
                    <ul className="list-decimal pl-6">
                        <li>
                            ...at the end of a word:
                            <ul className="list-disc pl-6">
                                <li>
                                <LetterAudioElement letter="काम"/> = kaam (not kaama)
                                </li>
                                <li>
                                <LetterAudioElement letter="खुद"/> = khud (not khuda)
                                </li>
                            </ul>

                        </li>
                        <li>
                            ...from the second letter in a 3-letter-word that ends in a Matra:
                            <ul className="list-disc pl-6">
                                <li>
                                <LetterAudioElement letter="आदमी"/> = aadmi (not aadami)
                                </li>
                                <li>
                                <LetterAudioElement letter="कुरसी"/> = kursii (not kurasii)
                                </li>
                            </ul>
                        </li>
                        <li>
                            ...from the second letter in a 4-letter-word that does NOT end in a Matra:
                            <ul className="list-disc pl-6">
                                <li>
                                <LetterAudioElement letter="अदरक"/> = adrak (not adarak)
                                </li>
                                <li>
                                <LetterAudioElement letter="बचपन"/> = bachpan (not bachapan)
                                </li>
                            </ul>
                        </li>
                        <li>
                            ...from the third letter in a 4-letter-word that ends in a Matra:
                            <ul className="list-disc pl-6">
                                <li>
                                <LetterAudioElement letter="समझना"/> = samajhnaa (not samajhanaa)
                                </li>
                                <li>
                                <LetterAudioElement letter="खरीदना"/> = khariidnaa (not khariidanaa)
                                </li>
                            </ul>
                        </li>
                    </ul>
                </p>
                <p className={pClass}>
                    Congratulations. You know how to read Hindi!
                    {br}
                    Be sure to practice reading, else you will forget it. To start, check out our practice texts <a className="underline text-blue-500" href="/story/hi">over here</a>.
                    {br}
                    You should also download our free Hindi Alphabet Chart:
                    <img src="/images/hindi-alphabet-chart.gif" alt="Hindi Alphabet Chart" className="w-full" />
                    {br}
                    Happy practicing!
                    {br}
                    <div className="mb-12 flex justify-end">
                        <a href="/story/hi" className="text-lg border shadow p-2 underline text-blue-500">
                            Practice <ChevronDoubleRightIcon className="h-5 w-5 inline" />
                        </a>
                    </div>
                </p>
            </div>
        </div>
    );
}