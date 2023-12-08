import { Vocab } from "model/vocab";
import { useAuth } from "util/auth";
import { useVocab } from "util/db";

export default function VocabList() {
    const auth = useAuth();
    const { data: vocabList } = useVocab(auth.user?.uid);
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        All the vocabulary you have saved.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-x-6">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Practice
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Word
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Translation
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Times Practiced
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Percentage Correct
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {vocabList && vocabList.map((vocab: Vocab) => (
                                    <tr key={vocab.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {vocab.vocab}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vocab.translation} ({vocab.transliteration})</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vocab.timesPracticed}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vocab.timesPracticed && vocab.timesPracticed > 0 ? vocab.timesCorrect! / vocab.timesPracticed! : "---"}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        <button className="block rounded-md my-2 px-3 py-2 text-center text-sm font-semibold border shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            + Add custom vocab
                                        </button>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">---</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">---</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">---</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-gray-500 text-sm font-medium sm:pr-0">
                                        ---
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
