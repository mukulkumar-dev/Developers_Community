import React from 'react'
import Link from 'next/link';
export default function Header() {
  return (
    <header className="fixed bg-white top-0 left-0 w-full flex items-center justify-between px-6 py-3 bg-opacity-20 z-50 text-black  border-gray-400">
    <img src="https://img.icons8.com/?size=100&id=fyrdMrvxBV9y&format=png&color=000000" width={44}/>
    <nav className="flex gap-14">
      {['Home', 'Docs', 'Blog', 'Projects', 'Events'].map((item) => (
        <Link key={item} href="#" className="hover:text-blue-800 text-xl">
          {item}
        </Link>
      ))}
    </nav>
    <button className="border border-blue-500 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white">
      Join Now
    </button>
  </header>
  )
}
