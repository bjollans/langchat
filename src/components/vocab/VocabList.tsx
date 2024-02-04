import { Vocab } from "model/vocab";
import { useState } from "react";
import { requireAuth, useAuth } from "util/auth";
import { useVocab } from "util/db";
import VocabEditDialog from "./VocabEditDialog";
import { nextReview, timeUntilNextReview } from "util/srs";

function VocabList() {
    const auth = useAuth();
    const { data: vocabList } = useVocab(auth.user?.uid);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editDialogVocab, setEditDialogVocab] = useState<Vocab | undefined>(undefined);

    const handleEdit = (vocab: Vocab) => {
        setEditDialogVocab(vocab);
        setIsEditDialogOpen(true);
    }

    const handleCreate = () => {
        setEditDialogVocab(undefined);
        setIsEditDialogOpen(true);
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-8 sm:m-8">
            <VocabEditDialog vocab={editDialogVocab} isOpen={isEditDialogOpen} setIsOpen={setIsEditDialogOpen} />
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <p className="mt-2 text-sm text-gray-700">
                        All the vocabulary you have saved.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-x-6">
                    <a
                        href="/practice"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Practice
                    </a>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Vocab
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Transl.
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-xs:hidden">
                                        Next Review
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {vocabList && vocabList.map((vocab: Vocab) => {
                                    const timeUntilNextReviewMs = timeUntilNextReview(vocab);
                                    const msInYear = 365 * 1440 * 60_000;
                                    const msInMonth = 30 * 1440 * 60_000;
                                    return (
                                        <tr key={vocab.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                {vocab.vocab}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vocab.translation} ({vocab.transliteration})</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-xs:hidden">{
                                                timeUntilNextReviewMs > msInYear
                                                    ? `In ${timeUntilNextReviewMs / msInYear} years`
                                                    : timeUntilNextReviewMs > msInMonth
                                                        ? `In ${timeUntilNextReviewMs / msInMonth} months`
                                                        : nextReview(vocab).toDateString().split(" ").splice(1, 2).join(" ")
                                            }</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <button onClick={() => handleEdit(vocab)} className="text-indigo-600 hover:text-indigo-900">
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        <button className="block rounded-md my-2 px-3 py-2 text-center text-sm font-semibold border shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={handleCreate}>
                                            +
                                        </button>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">---</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default requireAuth(VocabList);