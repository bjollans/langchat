import Meta from "components/Meta";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CheatSheet() {
    const letterClass = "text-3xl font-light p-1 py-2 pl-2 w-16 text-center";
    const pronunciationClass = "italic text-md pr-1 text-center w-12";
    const headingClass = "text-lg text-center py-1 font-semibold tracking-wider uppercase";
    const tdClass = "w-44";
    const vowelLetterClass = "";
    const vowelPronounciationClass = "bg-orange-200";
    const consonantLetterClass = "";
    const specialLetterClass = "bg-green-200";
    const consonantPronounciationClass = "bg-slate-50";
    const specialPronounciationClass = "bg-green-100";
    const matraLetterClass = "bg-sky-200";
    const matraPronounciationClass = "bg-sky-100";

    const vowelRowClass = "bg-orange-300";
    const consonantRowClass = "bg-slate-100";
    const specialRowClass = "bg-green-200";
    const matraRowClass = "bg-sky-200";
    /*
    ज़ (za)
    फ़ (fa)
    क्ष (ksha) - A conjunct of 'क' and 'ष', used in words like क्षमा (kshama - forgiveness).
    त्र (tra) - A conjunct of 'त' and 'र', used in words like त्रिकोण (trikon - triangle).
    ज्ञ (gya) - A conjunct of 'ज' and 'ञ', used in words like ज्ञान (gyan - knowledge).
    श्र (shra) - A conjunct of 'श' and 'र', used in words like श्रम (shram - labor).
    */

    return (
        <>
        <Meta noIndex={true} />
            <table className="my-4">

                <tr className={classNames(vowelRowClass)}>
                    <td className={classNames(headingClass)} colspan="10">Vowels</td>
                    <td className={classNames(headingClass, matraRowClass)} colspan="4">Matras</td>
                </tr>

                <tr className={vowelRowClass}>

                    <td className={classNames(letterClass, vowelLetterClass)}>अ</td>
                    <td className={classNames(pronunciationClass, vowelPronounciationClass)}>a</td>


                    <td className={classNames(letterClass, vowelLetterClass)}>आ</td>
                    <td className={classNames(pronunciationClass, vowelPronounciationClass)}>aa</td>


                    <td className={classNames(letterClass, vowelLetterClass)}>इ</td>
                    <td className={classNames(pronunciationClass, vowelPronounciationClass)}>i</td>


                    <td className={classNames(letterClass, vowelLetterClass)}>ई</td>
                    <td className={classNames(pronunciationClass, vowelPronounciationClass)}>ii</td>


                    <td className={classNames(letterClass, vowelLetterClass)}>उ</td>
                    <td className={classNames(pronunciationClass, vowelPronounciationClass)}>u</td>

                    <td className={classNames(letterClass, matraLetterClass)}>क</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ka</td>

                    <td className={classNames(letterClass, matraLetterClass)}>का</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kaa</td>

                </tr>


                <tr className={vowelRowClass}>


                    <td className={classNames(letterClass, vowelLetterClass)}>ऊ</td>
                    <td className={classNames(pronunciationClass, vowelPronounciationClass)}>uu</td>

                    <td className={classNames(letterClass, vowelLetterClass)}>ए</td>
                    <td className={classNames(pronunciationClass, vowelPronounciationClass)}>e</td>


                    <td className={classNames(letterClass, vowelLetterClass)}>ऐ</td>
                    <td className={classNames(pronunciationClass, vowelPronounciationClass)}>ai</td>


                    <td className={classNames(letterClass, vowelLetterClass)}>ओ</td>
                    <td className={classNames(pronunciationClass, vowelPronounciationClass)}>o</td>


                    <td className={classNames(letterClass, vowelLetterClass)}>औ</td>
                    <td className={classNames(pronunciationClass, vowelPronounciationClass)}>au</td>


                    <td className={classNames(letterClass, matraLetterClass)}>कि</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ki</td>


                    <td className={classNames(letterClass, matraLetterClass)}>की</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kii</td>

                </tr>



                <tr className={classNames(consonantRowClass)}>
                    <td className={classNames(headingClass)} colspan="10">Consonants</td>
                    <td className={classNames(letterClass, matraLetterClass)}>कु</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ku</td>


                    <td className={classNames(letterClass, matraLetterClass)}>कू</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kuu</td>
                </tr>

                <tr className={consonantRowClass}>

                    <td className={classNames(letterClass, consonantLetterClass)}>क</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ka</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ख</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>kha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ग</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ga</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>घ</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>gha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ङ</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>nga</td>

                    <td className={classNames(letterClass, matraLetterClass)}>को</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ko</td>


                    <td className={classNames(letterClass, matraLetterClass)}>कौ</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kau</td>


                </tr>



                <tr className={consonantRowClass}>

                    <td className={classNames(letterClass, consonantLetterClass)}>च</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>cha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>छ</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>chha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ज</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ja</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>झ</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>jha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ञ</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>nya</td>

                    <td className={classNames(letterClass, matraLetterClass)}>के</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ke</td>


                    <td className={classNames(letterClass, matraLetterClass)}>कै</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kai</td>
                </tr>



                <tr className={consonantRowClass}>

                    <td className={classNames(letterClass, consonantLetterClass)}>त</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ta</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>थ</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>tha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>द</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>da</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ध</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>dha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>न</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>na</td>

                    <td className={classNames(letterClass, matraLetterClass)}>कं</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kan</td>

                    <td className={classNames(letterClass, matraLetterClass)}>कँ</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ka<br />(nasal)</td>

                </tr>



                <tr className={consonantRowClass}>

                    <td className={classNames(letterClass, consonantLetterClass)}>ट</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ṭa</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ठ</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ṭha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ड</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ḍa</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ढ</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ḍha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ण</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ṇa</td>


                    <td className={classNames(headingClass, specialRowClass)} colspan="4">Extra Characters</td>


                </tr>



                <tr className={consonantRowClass}>


                    <td className={classNames(letterClass, consonantLetterClass)}>प</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>pa</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>फ</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>pha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ब</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ba</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>भ</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>bha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>म</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ma</td>

                    <td className={classNames(letterClass, specialLetterClass)}>ज़</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>za</td>

                    <td className={classNames(letterClass, specialLetterClass)}>फ़</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>fa</td>

                </tr>



                <tr className={consonantRowClass}>


                    <td className={classNames(letterClass, consonantLetterClass)}>व</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>va</td>

                    <td className={classNames(letterClass, consonantLetterClass)}>र</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ra</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ल</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>la</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ड़</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ṛa</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ढ़</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ṛha</td>

                    <td className={classNames(letterClass, specialLetterClass)}>श्र</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>shra</td>

                    <td className={classNames(letterClass, specialLetterClass)}>क्ष</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>ksha</td>

                </tr>

                <tr className={consonantRowClass}>

                    <td className={classNames(letterClass, consonantLetterClass)}>श</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>sha</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ष</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ṣa</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>स</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>sa</td>


                    <td className={classNames(letterClass, consonantLetterClass)}>ह</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ha</td>

                    <td className={classNames(letterClass, consonantLetterClass)}>य</td>
                    <td className={classNames(pronunciationClass, consonantPronounciationClass)}>ya</td>



                    <td className={classNames(letterClass, specialLetterClass)}>ज्ञ</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>gya</td>
                    <td className={classNames(letterClass, specialLetterClass)}>त्र</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>tra</td>

                </tr>

                {/* 
                <tr className={classNames(specialRowClass, "border-t border-black")}>
                    <td colspan="4" className={classNames(headingClass, specialLetterClass)}>Special</td>


                    <td className={classNames(letterClass, specialLetterClass)}>ज़</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>za</td>

                    <td className={classNames(letterClass, specialLetterClass)}>फ़</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>fa</td>

                    <td className={classNames(letterClass, specialLetterClass)}>ज्ञ</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>gya</td>
                </tr>

                <tr className={classNames(specialRowClass)}>
                    <td colspan="4" className={classNames(headingClass, specialLetterClass)}>Characters</td>


                    <td className={classNames(letterClass, specialLetterClass)}>श्र</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>shra</td>

                    <td className={classNames(letterClass, specialLetterClass)}>क्ष</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>ksha</td>
                    <td className={classNames(letterClass, specialLetterClass)}>त्र</td>
                    <td className={classNames(pronunciationClass, specialPronounciationClass)}>tra</td>
                </tr>


                <tr className={classNames(matraRowClass)}>
                    <td className={classNames(headingClass)} colspan="10">Matras</td>
                </tr>

                <tr className={matraRowClass}>

                    <td className={classNames(letterClass, matraLetterClass)}>क</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ka</td>

                    <td className={classNames(letterClass, matraLetterClass)}>का</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kaa</td>


                    <td className={classNames(letterClass, matraLetterClass)}>कि</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ki</td>


                    <td className={classNames(letterClass, matraLetterClass)}>की</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kii</td>

                    <td className={classNames(letterClass, matraLetterClass)}>कं</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kan</td>



                </tr>





                <tr className={matraRowClass}>




                    <td className={classNames(letterClass, matraLetterClass)}>कु</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ku</td>


                    <td className={classNames(letterClass, matraLetterClass)}>कू</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kuu</td>

                    <td className={classNames(letterClass, matraLetterClass)}>को</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ko</td>


                    <td className={classNames(letterClass, matraLetterClass)}>कौ</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kau</td>



                    <td className={classNames(letterClass, matraLetterClass)}>कँ</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ka<br />(nasal)</td>

                </tr>


                <tr className={matraRowClass}>



                    <td className={classNames(letterClass, matraLetterClass)}>के</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ke</td>


                    <td className={classNames(letterClass, matraLetterClass)}>कै</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kai</td>


                    <td className={classNames(letterClass, matraLetterClass)}>कृ</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kr</td>


                    <td className={classNames(letterClass, matraLetterClass)}>कॉ</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>kau</td>

                    <td className={classNames(letterClass, matraLetterClass)}>क़</td>
                    <td className={classNames(pronunciationClass, matraPronounciationClass)}>ka</td>

                </tr>
                */}
            </table>
        </>
    );
}