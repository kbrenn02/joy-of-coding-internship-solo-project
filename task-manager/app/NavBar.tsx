// Navigation Bar, visible on all pages
'use client';

import Link from 'next/link';
import { TiAdjustBrightness } from "react-icons/ti";
import React from 'react'
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

const NavBar = () => {
    
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Tasks', href: '/tasks' },
    ]
    
    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'> 
            {/* When you click on the logo, it sends you to the homepage. That's what this Link element is for.
            The href="/" means that the link goes to the root, aka homepage*/}
            <Link href="/"><TiAdjustBrightness /></Link>

            <ul className='flex space-x-6'>
                {links.map(link => 
                    <Link 
                        key={link.href}
                        className={classnames({ //this is a place where the CSS can be updated to colors I like
                            'text-zinc-900' : link.href === currentPath,
                            'text-zinc-500' : link.href !== currentPath,
                            'hover:text-zinc-800 transition-colors' : true
                        })}
                        href={link.href}>{link.label}
                    </Link>)}
            </ul>
        </nav>
    )
}

export default NavBar
