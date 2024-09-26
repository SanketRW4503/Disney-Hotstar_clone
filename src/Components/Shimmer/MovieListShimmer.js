const MovieListShimmer = () => {

    return <div className="w-screen my-4 px-2">
        <div className="font-bold  bg-slate-800  w-[100px]  h-[30px] rounded-lg animate-pulse"></div>
        <div className="flex relative items-center w-full overflow-hidden">

            {
                Array(7).fill('').map((e,index)=><div key={index} className="animate-pulse bg-slate-800 mx-8 rounded-md w-[150px] my-2 h-[200px]"></div>)
            }


        </div>
    </div>

}

export default MovieListShimmer;