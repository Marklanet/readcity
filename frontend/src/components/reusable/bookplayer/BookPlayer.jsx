import React, { useRef, useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import "swiper/css";
import "swiper/css/effect-creative";
import "./bookplayer.css";
import { EffectCreative, Autoplay } from "swiper/modules";
import { Pause } from "@mui/icons-material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { ReadingListContext } from "../../context/ReadingListContext";

const BookPlayer = ({
  interupt,
  bookToPlay,
  addToReadingList,
  removeFromReadingList,
}) => {
  const swiperRef = useRef(null);
  const { readingList } = useContext(ReadingListContext);
  const [isPlaying, setIsPlaying] = useState(true);
  const isInReadingList = readingList.some(
    (book) => book.title === bookToPlay[0]?.title
  );

  const dummypages = ["Page 1", "Page 2", "Page 3", "Page 4", "Etc ..."];
  const slideColors = ["#FAAD00", "#4AA088", "#28B8B8", "#53C2C2", "#335c6e"];

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
      swiperRef.current.swiper.slideTo(0);
      swiperRef.current.swiper.autoplay.start();
      setIsPlaying(true);
    }
  }, [bookToPlay]);

  const handlePlayPause = () => {
    if (isPlaying) {
      swiperRef.current.swiper.autoplay.stop();
    } else {
      swiperRef.current.swiper.autoplay.start();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  const handlePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  return (
    <div className="book-player">
      <Swiper
        ref={swiperRef}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        loop={false}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[EffectCreative, Autoplay]}
        className="mySwiper3"
      >
        {bookToPlay.length > 0 ? (
          <>
            <SwiperSlide style={{ backgroundColor: "#335C6E" }}>
              {bookToPlay[0].title}
            </SwiperSlide>
            <SwiperSlide
              style={{ backgroundImage: `url(${bookToPlay[0].coverPhotoURL})` }}
            >
              Cover Photo
            </SwiperSlide>
            <SwiperSlide style={{ backgroundColor: "#5ACCCC" }}>
              By {bookToPlay[0].author}
            </SwiperSlide>
            <SwiperSlide style={{ backgroundColor: "#FABD33" }}>
              Reading Level : {bookToPlay[0].readingLevel}
            </SwiperSlide>
            {dummypages.map((page, index) => (
              <SwiperSlide
                key={index}
                style={{ backgroundColor: slideColors[index] }}
              >
                {page}
              </SwiperSlide>
            ))}
          </>
        ) : (
          <SwiperSlide style={{ backgroundColor: "#cffafa", color: "#335C6E" }}>
            Click the play icon to play
          </SwiperSlide>
        )}
      </Swiper>

      <div className="controls">
        <button
          onClick={() =>
            isInReadingList ? removeFromReadingList() : addToReadingList()
          }
        >
          {isInReadingList ? <BookmarkAddedIcon /> : <BookmarkIcon />}
        </button>
        <button onClick={handlePrev}>
          <SkipPreviousIcon />
        </button>
        <button onClick={handlePlayPause}>
          {isPlaying ? <Pause /> : <PlayArrowIcon />}
        </button>
        <button onClick={handleNext}>
          <SkipNextIcon />
        </button>
        <button onClick={interupt}>
          <StopIcon />
        </button>
      </div>
    </div>
  );
};

export default BookPlayer;
