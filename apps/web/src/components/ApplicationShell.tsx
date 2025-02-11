"use client";

import { Dialog, Transition } from '@headlessui/react'
import {
    AcademicCapIcon,
    ArrowLeftIcon,
    Bars3Icon,
    BookOpenIcon,
    BuildingLibraryIcon,
    LanguageIcon,
    UserCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { useAuth } from 'util/auth'

var navigation = [
    { name: 'Hindi Stories', href: '/story/hi', icon: BookOpenIcon },
    { name: 'Japanese Stories', href: '/story/ja', icon: BookOpenIcon },
    { name: 'Chinese Stories', href: '/story/zh', icon: BookOpenIcon },
    { name: 'German Stories', href: '/story/de', icon: BookOpenIcon },
    { name: 'Greek Stories', href: '/story/el', icon: BookOpenIcon },
    { name: 'How to Read Hindi', href: '/articles/how-to-read-hindi', icon: AcademicCapIcon },
    { name: 'My Account', href: '/settings/general', icon: UserCircleIcon },
]

const pageTitles = (location: string) => {
    switch (location) {
        case '/articles/how-to-read-hindi': return '🇮🇳 How to Read Hindi';
        case '/articles/hindi-alphabet': return '🇮🇳 Hindi Alphabet';
        case '/articles/hindi-alphabet-2': return '🇮🇳 Hindi Alphabet';
        case '/articles/hindi-matras': return '🇮🇳 Hindi Matras';
        case '/articles/joining-letter-in-hindi': return '🇮🇳 Joining Letter in Hindi';
        case '/': return '';
        case '/story/hi': return '🇮🇳 Hindi Reading Practice';
        case '/vocab': return 'Your Vocabulary';
        case '/practice': return 'Practice Vocabulary';
        default: return <a className='flex items-center' href='/story/hi'>
            <img src="/android-chrome-32x32.png" className='w-6 h-6 mx-2' />
            Linguin
        </a>
    }
}

const backLocation = (currentLocation: string) => {
    // Turn story/../xxx-xxx-xxx into story/..
    if (currentLocation.search(/story\/..\//) != -1) {
        return currentLocation.replace("/",":").replace("/",":").replace(/\/.*/,"").replaceAll(":","/");
    }
    switch (currentLocation) {
        case '/': return null;
        case '/articles/hindi-alphabet': return '/articles/how-to-read-hindi';
        case '/articles/hindi-alphabet-2': return '/articles/hindi-alphabet';
        case '/articles/hindi-matras': return '/articles/hindi-alphabet';
        case '/articles/joining-letter-in-hindi': return '/articles/hindi-matras';
        case '/story/hi': return null;
        case '/vocab': return null;
        case '/practice': return '/vocab';
        default: return '/story/hi';
    }
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ApplicationShell(props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname()
    const auth = useAuth();

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <a href="/" className="flex items-center">
                                                <img
                                                    className="h-8 w-auto"
                                                    src="/favicon.png"
                                                    alt="Linguin"
                                                />
                                            </a>
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.href == pathname
                                                                            ? 'bg-gray-50 text-indigo-600'
                                                                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className={classNames(
                                                                            item.href == pathname ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                                            'h-6 w-6 shrink-0'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="sticky top-0 z-10 flex items-center justify-between w-full gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6">
                    <div className='flex gap-x-6'>
                        <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        {backLocation(pathname)
                            && <button onClick={() => router.push(backLocation(pathname)!)}>
                                <ArrowLeftIcon className="h-6 w-6" />
                            </button>}
                    </div>
                    <div className="min-w-0 flex w-full">
                        <h2 className="text-2xl text-center font-bold mx-auto leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            {pageTitles(pathname)}
                        </h2>
                    </div>
                    <a href="/auth/signin"
                        className='flex items-center gap-x-1 hover:bg-slate-50'
                        onClick={(e) => {
                            if (auth.user) {
                                e.preventDefault();
                                auth.signout();
                            }
                        }}>
                        {auth.user
                            && <span>Logout</span>
                            || <span>Login</span>}
                    </a>
                </div>

                <main>
                    {props.children}
                </main>
            </div>
        </>
    )
}
