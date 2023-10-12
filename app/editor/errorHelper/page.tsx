import ErrorList from "./errors"

export default function ErrorHelperUI() {

  return (
    <main>
        <div className="overlay rounded-md w-full h-full shadow-4xl">
            <ErrorList />
        </div>
    </main>


  )
}