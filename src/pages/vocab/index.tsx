import VocabList from "components/vocab/VocabList";
import { requireAuth } from "util/auth";

function VocabPage() {
    return (
        <VocabList />
    );
}

export default requireAuth(VocabPage);