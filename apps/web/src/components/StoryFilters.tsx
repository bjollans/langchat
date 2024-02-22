import { Dialog, Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useStoryFilterContext } from '@linguin-shared/context/storyListFilterContext';
import { useAuth } from '@linguin-shared/util/auth';
import { Fragment, useState } from 'react'

export interface Filter {
    id: string;
    name: string;
    activeValues: string[];
    setActiveValues: (v: string[]) => void;
    options: FilterOption[];
}

export interface BooleanFilter {
    id: string;
    name: string;
    activeValue: boolean;
    setActiveValue: (v: boolean) => void;
}

export interface FilterOption {
    value: string;
    label: string;
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export interface StoryFiltersProps {
    filters: Array<Filter>;
    booleanFilters: Array<BooleanFilter>;
}

export default function StoryFiters() {
    const auth = useAuth();
    const {
        difficulties, setDifficulties,
        collectionNames, setCollectionNames,
        showRead, setShowRead,
        allCollectionNames, allDifficulties
    } = useStoryFilterContext();

    const [open, setOpen] = useState(false);

    const booleanFilters: Array<BooleanFilter> = [];

    if (auth?.user) {
        booleanFilters.push({
            id: 'showRead',
            name: 'Show Read',
            activeValue: showRead,
            setActiveValue: setShowRead,
        });
    }

    const filters: Array<Filter> = [
        {
            id: 'difficulty',
            name: 'Difficulty',
            activeValues: difficulties,
            setActiveValues: setDifficulties,
            options:
                allDifficulties.map((difficulty: string) => { return { value: difficulty, label: difficulty }; })
        },
        {
            id: 'collection',
            name: 'Topic',
            activeValues: collectionNames,
            setActiveValues: setCollectionNames,
            options:
                allCollectionNames.map((collectionName: string) => { return { value: collectionName, label: collectionName }; })
        }
    ];

    const activeFilters = filters.map(filter => filter.activeValues).flat();

    return (
        <div className="bg-white">
            {/* Mobile filter dialog */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4">
                                    {booleanFilters.map((filter) => (
                                        <div key={filter.name} className="border-t border-gray-200 px-4 py-4 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <h3 className="text-sm font-medium text-gray-900">{filter.name}</h3>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <input
                                                    id={`filter-mobile-${filter.id}`}
                                                    name={`${filter.id}[]`}
                                                    type="checkbox"
                                                    defaultChecked={filter.activeValue}
                                                    onChange={(e) => filter.setActiveValue(e.target.checked)}
                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {filters.map((filter) => (
                                        <Disclosure as="div" key={filter.name} className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                                            <span className="font-medium text-gray-900">{filter.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                <ChevronDownIcon
                                                                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {filter.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-mobile-${filter.id}-${optionIdx}`}
                                                                        name={`${filter.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        defaultChecked={filter.activeValues.includes(option.value)}
                                                                        onChange={(e) => {
                                                                            if (e.target.checked) {
                                                                                filter.setActiveValues([...filter.activeValues, option.value]);
                                                                            } else {
                                                                                filter.setActiveValues(filter.activeValues.filter((v) => v != option.value));
                                                                            }
                                                                        }}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${filter.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Filters */}
            <filter aria-labelledby="filter-heading my-2">
                <h2 id="filter-heading" className="sr-only">
                    Active Filters
                </h2>

                <div className="border-b border-gray-200 bg-white pb-4">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Active filters */}
                        <div className="">
                            <div className="mx-auto max-w-7xl sm:flex sm:items-center">
                                <div className="">
                                    <div className="-m-1 flex flex-wrap items-center">
                                        {activeFilters.map((activeFilter) => (
                                            <span
                                                key={activeFilter}
                                                className="inline-flex mr-1 items-center rounded-full border border-gray-200 bg-white py-1 pl-3 pr-2 text-sm font-medium text-gray-900"
                                            >
                                                <span>{activeFilter}</span>
                                                <button
                                                    type="button"
                                                    className="ml-2 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                                                    onClick={() => {
                                                        filters.forEach((filter) => {
                                                            if (filter.activeValues.includes(activeFilter)) {
                                                                filter.setActiveValues(filter.activeValues.filter((v) => v != activeFilter));
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <span className="sr-only">Remove filter for {activeFilter}</span>
                                                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                                    </svg>
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Menu as="div" className="relative inline-block text-left my-2">

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                            </Transition>
                        </Menu>

                        <button
                            type="button"
                            className="inline-block flex text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                            onClick={() => setOpen(true)}
                        >
                            Filters
                        </button>

                        <div className="hidden sm:block">
                            <div className="flow-root">
                                <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
                                    {booleanFilters.map((filter) => (
                                        <div>
                                            <input
                                                id={`filter-${filter.id}`}
                                                name={`${filter.id}[]`}
                                                type="checkbox"
                                                defaultChecked={filter.activeValue}
                                                onChange={(e) => filter.setActiveValue(e.target.checked)}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label
                                                htmlFor={`filter-${filter.id}`}
                                                className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                            >
                                                {filter.name}
                                            </label>
                                        </div>
                                    ))}
                                    {filters.map((filter, filterIdx) => (
                                        <Popover key={filter.name} className="relative inline-block px-4 text-left">
                                            <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                <span>{filter.name}</span>
                                                <ChevronDownIcon
                                                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <form className="space-y-4">
                                                        {filter.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${filter.id}-${optionIdx}`}
                                                                    name={`${filter.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={filter.activeValues.includes(option.value)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            filter.setActiveValues([...filter.activeValues, option.value]);
                                                                        } else {
                                                                            filter.setActiveValues(filter.activeValues.filter((v) => v != option.value));
                                                                        }
                                                                    }}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${filter.id}-${optionIdx}`}
                                                                    className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </form>
                                                </Popover.Panel>
                                            </Transition>
                                        </Popover>
                                    ))}
                                </Popover.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </filter>
        </div>
    )
}
