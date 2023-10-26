"use client"

import Image from 'next/image'
import codeImage from '../public/monacoSample2.jpg'
import codeImage3 from '../public/monacoSample3.jpg'
import intellisense from '../public/intellisense.png'
import codeSuggestions from '../public/codeSuggestionsEdited.jpg'
import visualizer from '../public/visualizer.png'
import Link from 'next/link'
import { useRouter } from 'next/navigation';


export default function Home()

// glass card
// <div className="flex items-center justify-center">
// <div className="card my-10 w-2/3 glass">
//   {/* <figure><img src="../public/monacoSample2.jpg" alt="car!" /></figure> */}
//   <figure className=''><Image
//     src={codeImage}
//     alt='code-image'
//     layout="responsive"
//     quality={100}
//   /></figure>

//   <div className="card-body">
//     <h2 className="card-title">Life hack</h2>
//     <p>How to park your car at your garage?</p>
//     <div className="card-actions justify-end">
//       <button className="btn btn-primary">Learn now!</button>
//     </div>
//   </div>
// </div>
// </div>


{
  // routerhook
  const router = useRouter();

  return (
    <main className="flex flex-col">
      <div className="bg-customBG1">

        <h1 className='text-5xl text-white font-bold text-center mt-10'>Coding is hard</h1>
        <h2 className='text-5xl text-white font-bold text-center mb-10'>We know</h2>

        <div className="overflow-y-auto">
          <div className='flex flex-wrap mx-40 px-60 my-20s w-500 h-200 overflow-y-auto'>
            <p className='text-slate-200 flex flex-wrap '>
              Lorem ipsum dolor sit amet, consect etur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <div className='flex justify-center'>
          <Link className='btn btn-primary my-10 w-40 mb-10' href="/editor">Try it</Link>
        </div>
        <div className="flex items-center justify-center">
          <div className="card card-side lg:w-2/3 sm:w-full bg-base-100 shadow-xl">
            <figure className='lg:w-1/2 sm:w-screen'><Image
              src={codeImage3}
              alt='codeSampleImage'
              quality={100}
              layout="responsive"
            /></figure>
            <div className="card-body">
              <h2 className="card-title font-sans font-semibold leading-loose text-2xl ">An Editor built for beginners by beginners !</h2>
              <p className=''>A fully fledged text editor built to help new developers learn and experiment programming</p>
              <div className="">
                <ul className='  list-inside list-disc'>
                  <li className='text-white '>Code Visualizer</li>
                  <li className='text-white'>User friendly error messages</li>
                  <li className='text-white'>Code hints and suggestions</li>
                  <li className='text-white'>Integrated discussion forum</li>
                </ul>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary mx-15" onClick={() => router.push('/editor')}>See how it works</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">

          <div className="flex flex-row justify-center my-20">

            <div className="card lg:card-side bg-base-100 lg:w-1/3 sm:w-full shadow-xl ">
              <figure className='relative w-1/2 '><Image
                src={visualizer}
                alt='codeSampleImage'
                quality={100}
                fill={true}
              /></figure>
              <div className="card-body w-1/2 sm:w-full">
                <h2 className="card-title">Data structure visualizer</h2>
                <p>A unique data structure visualizer to help you understand how data structures work and interact with each other</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => router.push('/editor')}>View</button>
                </div>
              </div>
            </div>

            <div className="card lg:card-side bg-base-100 lg:w-1/3 sm:w-full shadow-xl mx-10">
              <figure className='relative w-1/2'><Image
                src={codeSuggestions}
                alt='codeSampleImage'
                quality={100}
                fill={true}
              /></figure>
              <div className="card-body w-1/2">
                <h2 className="card-title">Intelligent code suggestions</h2>
                <p>Lets you see the functions and attributes applicabale for a code in real-time</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => router.push('/editor/errorHelper')}>View</button>
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-row justify-center my-5">

            <div className="card lg:card-side bg-base-100 lg:w-1/3 sm:w-full shadow-xl ">
              <figure className='relative w-1/2 '><Image
                src={intellisense}
                alt='codeSampleImage'
                quality={100}
                fill={true}
              /></figure>
              <div className="card-body lg:w-1/3 sm:w-full">
                <h2 className="card-title">Simplified error messages</h2>
                <p>No more complex error messages</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => router.push('/editor')}>View</button>
                </div>
              </div>
            </div>

            <div className="card lg:card-side bg-base-100 w-1/3 shadow-xl mx-10">
              <figure className='relative w-1/2'><Image
                src={intellisense}
                alt='codeSampleImage'
                quality={100}
                fill={true}
              /></figure>
              <div className="card-body w-1/2">
                <h2 className="card-title">Discussion forum</h2>
                <p>Discuss your findings with others
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View</button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </main>
  )
}