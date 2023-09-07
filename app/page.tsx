import Image from 'next/image'
import codeImage from '../public/monacoSample2.jpg'
import Link from 'next/link'

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
  return (
    <main className="flex flex-col">
      <div className="bg-customBG1 h-[70vh] lg:h-[80vh] w-full object-cover object-right">

        <h1 className='text-5xl text-white font-bold text-center mt-10'>Coding is hard</h1>
        <h2 className='text-5xl text-white font-bold text-center'>We know</h2>

        <div className='mx-40 px-60 my-20'>
          <p className='text-slate-200'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

        <div className='flex justify-center'>
          <Link className='btn btn-primary w-40 mb-10' href="/editor/new-editor">Try it</Link>
        </div>
        <div className="flex items-center justify-center">
          <div className="card card-side w-2/3 bg-base-100 shadow-xl">
            <figure className='w-1/2'><Image
              src={codeImage}
              alt='codeSampleImage'
              quality={100}
              layout="responsive"
            /></figure>
            <div className="card-body">
              <h2 className="card-title text-md ">An Editor built for beginners !</h2>
              <p>Click the button to watch on Jetflix app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Watch</button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}
