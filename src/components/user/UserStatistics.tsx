import { useAuth } from "util/auth";
import { useUserStoriesRead, userWordsSeen } from "util/db";

export default function UserStatistics() {
    const auth = useAuth();
    const { data: wordsSeenJson } = userWordsSeen(auth?.user?.uid);
    const { data: storiesRead } = useUserStoriesRead(auth?.user?.uid);
    const wordsSeen = wordsSeenJson?.length > 0 ? wordsSeenJson[0]?.wordsSeen : [];

    return <p className="mx-auto text-center mb-2 mt-1 text-xs italic leading-6 font-medium text-gray-900">
        You have read {storiesRead?.length ?? 0} stories and seen {wordsSeen.length} words.
    </p>;
}