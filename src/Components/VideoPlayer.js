import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TRAILER_LINK } from "../Utils/constant";
import { useNavigate } from "react-router-dom";

const VideoPlayer = ({ muteStatus, showTrailer, ytPlayer ,setShowTrailer}) => {
    const [trailer, setTrailer] = useState(null);
    const movieShots = useSelector((store) => store?.movie?.trendingMovieTrailer);
    const navigate = useNavigate();

    const getTrailer = (movieShots) => {
        if(movieShots===undefined) return ;
        if (movieShots && movieShots.length===0) return;

        const isTrailer = movieShots?.filter((c) => c?.type === "Trailer");
        if ( isTrailer && isTrailer?.length > 0) {
            setTrailer(isTrailer[0]);
        } else {
            setTrailer(movieShots[0]);
        }
    };

    useEffect(() => {
        getTrailer(movieShots);
    }, [movieShots]);

    return (
        ytPlayer === true ? (
            <div className="  absolute top-0 right-0 left-0 bottom-0 bg-black z-[1000] ">
                <button onClick={() => navigate(-1)}
                    className="font-white px-8 py-2 rounded-md font-bold bg-blue-500 m-4 text-white hover:bg-blue-700">Back</button>
                <iframe
                    className="w-full  h-[90%]"
                    id="video_player"
                    src={`${TRAILER_LINK}${trailer?.key}?autoplay=${showTrailer ? 0 : 1}&showinfo=1&controls=1&mute=${muteStatus ? 1 : 0}&loop=1&playlist=${trailer?.key}`}
                    title="YouTube video player"
                    allow="autoplay;"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        ) : (
            <div className="w-full h-screen relative shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]">
                <div className="w-full h-screen absolute z-10 bg-transparent"></div>
                <iframe
                    className="w-full absolute h-[104%] z-0 mt-[-4%] scale-110"
                    id="video_player"
                    src={`${TRAILER_LINK}${trailer?.key}?autoplay=${showTrailer ? 0 : 1}&showinfo=0&controls=0&mute=${muteStatus ? 1 : 0}&loop=1&playlist=${trailer?.key}`}
                    title="YouTube video player"
                    allow="autoplay;"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    onError={()=>setShowTrailer(false)}
                ></iframe>
            </div>
        )
    );
};

export default VideoPlayer;
