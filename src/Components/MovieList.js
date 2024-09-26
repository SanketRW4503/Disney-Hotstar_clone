import { useRef, useEffect } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movielist }) => {
    const scrollRef = useRef(null);


    const handleWheelScroll = (e) => {
        if (scrollRef.current) {
            e.preventDefault(); // Prevent vertical scrolling
            const scrollSpeed = 4;
            scrollRef.current.scrollLeft += e.deltaY * scrollSpeed; // Scroll horizontally
        }
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        scrollContainer.addEventListener("wheel", handleWheelScroll);

        return () => {
            scrollContainer.removeEventListener("wheel", handleWheelScroll);
        };
    }, []);

    return (
        <div className="w-full my-4 px-2 overflow-hidden">
            <h1 className="font-bold text-2xl text-white">{title}</h1>
            <div
                ref={scrollRef}
                className="flex relative items-center w-full overflow-hidden hover:overflow-x-auto snap-x"
                style={{ scrollBehavior: "smooth" }} // Smooth scroll effect
            >
                {movielist?.map((m) => (
                    <MovieCard
                        key={m?.id}
                        image={"https://image.tmdb.org/t/p/w500/" + m?.poster_path}
                        movieName={m?.title}
                        id={m?.id}
                        wholeInfo={m}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
