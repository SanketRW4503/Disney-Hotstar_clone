import { useState } from "react";
import { useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa";
import VideoPlayer from "./VideoPlayer";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const VideoCover = () => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerMute, setTrailerMute] = useState(true);

  const videodata = useSelector((store) => store.movie.trendingMovie);

  const bgstyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${videodata?.backdrop_path})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div className="relative shadow-4xl">
      <div
        style={showTrailer ? bgstyle : {}}
        onMouseEnter={() => setShowTrailer(false)}
        onMouseLeave={() => setShowTrailer(true)}
        className="w-full h-screen absolute top-0 left-0 bg-gradient-to-r from-black to-transparent z-40 text-white shadow-custom-inset"
      >
        <div className="absolute bottom-[35%] left-[8%] flex items-center right-[5%] p-2 justify-between drop-shadow-lg">
          <div className="flex flex-col items-start space-y-4 w-full">
            <h1 className="text-4xl font-bold">{videodata.title}</h1>
            <p className="w-[50%]">{videodata.overview}</p>
            <Link to={"/watch"}>
              <button className="cursor-pointer bg-[#ffffff33] px-20 py-3 rounded-md text-white font-bold flex items-center">
                <FaPlay className="mx-2" /> Watch Trailer
              </button>
            </Link>
          </div>
          <div className="w-full flex items-center justify-end text-4xl">
            {trailerMute ? (
              <IoVolumeMuteOutline
                className="cursor-pointer"
                onClick={() => setTrailerMute(false)}
              />
            ) : (
              <IoVolumeHighOutline
                className="cursor-pointer"
                onClick={() => setTrailerMute(true)}
              />
            )}
          </div>
        </div>
      </div>

      <VideoPlayer muteStatus={trailerMute} ytPlayer={false} showTrailer={showTrailer} setShowTrailer={setShowTrailer}/>
    </div>
  );
};

export default VideoCover;
