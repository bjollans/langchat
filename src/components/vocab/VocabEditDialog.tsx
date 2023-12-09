import { useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Vocab } from 'model/vocab';
import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { createVocab, updateVocab } from 'util/db';
import { useAuth } from 'util/auth';
import { TrashIcon } from '@heroicons/react/24/outline';

export interface VocabEditDialogProps {
  vocab?: Vocab;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function VocabEditDialog(props: VocabEditDialogProps) {
  const isCreate = !props.vocab;
  const { isOpen, setIsOpen } = props;

  const auth = useAuth();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({ reValidateMode: 'onChange' });

  const onSubmit = (data) => {
    const newVocab: Vocab = {
      'userId': auth.user?.uid,
      ...data,
      ...props.vocab,
    };
    if (isCreate) {
      createVocab(newVocab);
    }
    else {
      updateVocab(newVocab);
    }
    setIsOpen(false);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    if (props.vocab) {
      updateVocab({...props.vocab, deleted: true});
    }
    setIsOpen(false);
  }

  useEffect(() => {
    setValue('vocab', props.vocab?.vocab);
    setValue('translation', props.vocab?.translation);
    setValue('transliteration', props.vocab?.transliteration);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 flex w-full items-center justify-center p-4 z-20">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30 w-full h-full z-20" aria-hidden="true" />
        <Dialog.Panel
          className="relative bg-white p-1 px-4 shadow-xl z-30 rounded-lg">
          <div className='flex justify-center'>

            <Dialog.Title className="text-lg font-medium text-gray-900">
              {isCreate ? "New vocab" : "Edit vocab"}
            </Dialog.Title>

            <button className='absolute right-0 top-0 p-1' onClick={() => setIsOpen(false)}>
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-slate-500" aria-hidden="true" />
            </button>

          </div>
          <div className="isolate -space-y-px rounded-md my-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-4">
                <div className="relative">
                  <label htmlFor="vocab" className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                    Vocab
                  </label>
                  <input
                    type="text"
                    {...register("vocab", { required: true })}
                    id="vocabInput"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={props.vocab?.vocab}
                  />
                </div>
                {errors.vocab && <p className='text-red-500 text-xs'>This field is required</p>}
              </div>
              <div className="my-4">
                <div className="relative">
                  <label htmlFor="translation" className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                    Translation
                  </label>
                  <input
                    type="text"
                    {...register("translation", { required: true })}
                    id="translationInput"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={props.vocab?.translation}
                  />
                </div>
                {errors.translation && <p className='text-red-500 text-xs'>This field is required</p>}
              </div>
              <div className="relative my-4">
                <label htmlFor="transliteration" className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">
                  Pronounciation
                </label>
                <input
                  type="text"
                  {...register("transliteration")}
                  id="transliterationInput"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={props.vocab?.transliteration}
                />
              </div>
              <div className='flex justify-between mt-4'>
                {props.vocab && <button onClick={handleDelete}
                  className='block rounded-md border border-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                ><TrashIcon className='w-4 h-4 text-indigo-600' /></button> || <p> </p>}
                <button type='submit'
                  className='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >Save</button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}