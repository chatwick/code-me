"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { VscAccount } from "react-icons/vsc";


export default function NavBar()
{
    const [drawerOpen, setDrawerOpen] = useState(false);

    // close drawer fucntion -- redundant
    const closeDrawer: any = () =>
    {
        const drawer = document.getElementById('my-drawer-2') as HTMLInputElement
        if (drawer)
        {
            drawer.checked = false;
        }

    }


    return (
        <div className="drawer drawer-start">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Top nav bar */}
                <div className="navbar bg-base-100">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>

                    </div>
                    <div className="flex-1">
                        <a className="btn btn-ghost normal-case text-xl">CODE ME</a>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-square btn-ghost">
                            <VscAccount size={25} />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg> */}
                        </button>
                    </div>
                </div>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/editor">Editor</Link></li>
                    <li><Link href="/">Forum</Link></li>
                </ul>


            </div>
        </div>
    )
}

