// Navigation Bar, visible on all pages
'use client';

import Link from 'next/link';
import { TiAdjustBrightness } from "react-icons/ti";
import React from 'react'
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

const NavBar = () => {
    
    const currentPath = usePathname();

    /* create an array of links to be called via the mapping below. That way, if we want to add another page/link, we 
    add it here, and not have to change the CSS/build the components in so many places*/
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Tasks', href: '/tasks' }, /* this link will send out to the Tasks.tsx page (when created). This Tasks
        page component will not be imported to the homepage, it will only be accessible via clicking the tasks link*/
    ]
    
    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center sticky top-0 bg-white'> 
            {/* When you click on the logo, it sends you to the homepage. That's what this Link element is for.
            The href="/" means that the link goes to the root, aka homepage*/}
            <Link href="/"><TiAdjustBrightness size='30px'/></Link>

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
