"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { VscAccount } from "react-icons/vsc";
import {GoHomeFill} from "react-icons/go"
import {AiOutlineCodeSandbox} from "react-icons/ai"
import {MdForum} from "react-icons/md"
import {BiSolidHelpCircle} from "react-icons/bi"
import {FcHeatMap} from "react-icons/fc"
import { getCurrentUser } from '../utility/dbFunctions';
import { useRouter } from 'next/navigation';

export default function NavBar()
{
    // states
    const [drawerOpen, setDrawerOpen] = useState(false);

    // routerhook
    const router = useRouter();

    // close drawer fucntion -- redundant
    const closeDrawer: any = () =>
    {
        const drawer = document.getElementById('my-drawer-2') as HTMLInputElement
        if (drawer)
        {
            drawer.checked = false;
        }

    }

    const handleAccountBtnClick = async () =>{
       const result = await getCurrentUser();
       console.log("handleAccountBtnClick called");
        
       console.log(result);
       if (result.status) {
        router.push(`/user/${result.uid}`)
       }else{
        router.push('/user/signin');
       }

    }
    
    return (
        <div className="drawer  drawer-end">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Top nav bar */}
                <div className="navbar bg-base-100">
                    <div className="flex-none">
                        <button className="btn btn-square btn-ghost" onClick={handleAccountBtnClick}>
                            <VscAccount size={25} />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg> */}
                        </button>
                    </div>
                    <div className="flex-1">
                        <Link className='btn btn-ghost normal-case text-xl' href="/">CODE ME</Link>
                    </div>
                    <div className="flex-none">
                    <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                </div>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-lg font-semibold">
                    {/* Sidebar content here */}
                    <li><Link className='text-blue-500' href="/"> <GoHomeFill size={22}/> Home</Link></li>
                    <li><Link className='text-blue-500' href="/editor/new-editor"> <AiOutlineCodeSandbox size={25}/> Editor</Link></li>
                    <li><Link className='text-blue-500' href="/"><MdForum/> Forum</Link></li>
                    <hr className='my-4' />
                    <li><Link className='text-blue-400' href="/editor/errorHelper"><BiSolidHelpCircle/>Error helper</Link></li>
                    <li><Link className='text-blue-400' href="/"><FcHeatMap size={22}/>Code Visualizer</Link></li>
                </ul>


            </div>
        </div>
    )
}

