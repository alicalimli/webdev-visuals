import Link from 'next/link'
import React from 'react'

const links = [
  {
    label: "Visuals",
    href: "/visuals"
  },
  {
    label: "Tutorials",
    href: "/tutorials"
  },
]

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const renderLinks = links.map(({label, href}) => <li key={href}><Link href={href}>{label}</Link></li> )
  
  return (
    <nav className='w-full items-center p-8 flex gap-2 px-vw-32 '>
      <Link href="/" className='fluid-2xl font-bold hidden sm:block'>WebDevVisuals</Link>
      <Link href="/" className='fluid-2xl font-bold sm:hidden'>WDV</Link>
      <ul className='ml-auto flex gap-4 text-xl'>
        {renderLinks}
      </ul>
    </nav>
  )
}

export default Navbar