import { requireAuth, useAuth } from "util/auth";
import Flashcard from "./vocab/Flashcard";
import { useVocab } from "util/clientDb";
import { useEffect, useState } from "react";
import { getCardsLeftToday, orderAndFilterVocabList } from "util/srs";
import { Vocab } from "model/vocab";

function PracticePage() {
    const auth = useAuth();
    const { data: vocabList } = useVocab(auth.user?.uid ?? null);

    const [cardsLeft, setCardsLeft] = useState(0);
    const [filteredVocabList, setFilteredVocabList] = useState<Array<Vocab>>([]);

    useEffect(() => {
        if (!vocabList) return;
        const filteredList = orderAndFilterVocabList(vocabList);
        setCardsLeft(getCardsLeftToday(filteredList));
        setFilteredVocabList(filteredList);
    }, [vocabList]);

    return (
        <>
            {filteredVocabList && filteredVocabList.length > 0
                && <div className="">
                    <Flashcard vocab={filteredVocabList[0]} />
                    <div className="flex">
                        <p className="m-4 text-sm text-slate-700 mx-auto">
                            Cards left: {cardsLeft}
                        </p>
                    </div>
                </div>
                ||
                <div className="flex justify-center my-4">
                    <p>You are all caught up!</p>
                </div>
            }
        </>
    );
}

export default requireAuth(PracticePage);