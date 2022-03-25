import React, { useEffect, useRef, useState } from "react";
import { Cat, Favorite } from "../utils/types";
import getDimensions, {
  addFavorite,
  deleteFavorite,
  getCats,
  getFavorites,
} from "../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";

export default function Home(): JSX.Element {
  const [images, setImages] = useState<Cat[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const containerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setImages(await getCats(1));
      setFavorites(await getFavorites());
    };
    fetchData();
  }, []);

  const fetchMoreData = async () => {
    setImages([...images, ...(await getCats(images.length / 10 + 1))]);
  };

  const addFavor = async (id: string) => {
    if (favorites.find((i) => i.image_id === id)) {
      await deleteFavorite(
        favorites.find((i) => i.image_id === id)?.id as number
      );
      
    } else {
      await addFavorite(id);
      setFavorites(await getFavorites());
    }
  };

  const logout = () => {
    localStorage.removeItem("api-key");
    navigate("/login");
  };

  return (
    <div className="h-screen relative">
      <div className="flex absolute w-full h-14 justify-between items-center px-4 top-0 backdrop-blur-md z-10">
        <button onClick={() => logout()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 17V14H9V10H16V7L21 12L16 17ZM14 2C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6H14V4H5V20H14V18H16V20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V4C3 3.46957 3.21071 2.96086 3.58579 2.58579C3.96086 2.21071 4.46957 2 5 2H14Z"
              fill="#3E3E3E"
            />
          </svg>
        </button>
        <h1>instacatbooktube</h1>
        <button onClick={() => navigate("favorite")}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_99_126)">
              <path
                d="M11.5 19.6L10 20.9C3.4 15 0 11.9 0 8.1C0 6.9 0.4 5.8 1 4.9C1 5.1 1 5.3 1 5.5C1 10.2 4.9 13.7 11.5 19.6ZM13.1 15.5C17.8 11.2 21 8.4 21.1 5.5C21.1 3.5 19.6 2 17.6 2C16 2 14.5 3 14 4.4H12.1C11.5 3 10 2 8.5 2C6.5 2 5 3.5 5 5.5C5 8.4 8.1 11.2 12.9 15.5L13 15.6L13.1 15.5ZM17.5 0C20.6 0 23 2.4 23 5.5C23 9.2 19.6 12.3 13 18.3C6.4 12.4 3 9.3 3 5.5C3 2.4 5.4 0 8.5 0C10.2 0 11.9 0.8 13 2.1C14.1 0.8 15.8 0 17.5 0Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_99_126">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
      <div className="p-2 h-full pt-14 overflow-auto" id="scrollableDiv" ref={containerRef}>
        <InfiniteScroll
          dataLength={images.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          {images.map((i, index) => (
            <div
              key={index}
              className="min-h-[100px] rounded my-[2px] overflow-hidden relative"
            >
              <LazyLoadImage
                effect="blur"
                src={i.url}
                alt={`cat - ${index}`}
                className="w-full"
                width={"100%"}
                height={((getDimensions(containerRef.current).width - 16) / i.width) * i.height}
              />
              <button
                className="absolute bottom-6 right-6"
                onClick={() => addFavor(i.id)}
              >
                {favorites.find((item) => item.image_id === i.id) ? (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="34" height="34" rx="4" fill="#62CC6D" />
                    <path
                      d="M17 26.35L15.55 25.03C10.4 20.36 7 17.27 7 13.5C7 10.41 9.42 8 12.5 8C14.24 8 15.91 8.81 17 10.08C18.09 8.81 19.76 8 21.5 8C24.58 8 27 10.41 27 13.5C27 17.27 23.6 20.36 18.45 25.03L17 26.35Z"
                      fill="#3E3E3E"
                    />
                  </svg>
                ) : (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="34" height="34" rx="4" fill="#62CC6D" />
                    <path
                      d="M17.1 23.55L17 23.65L16.89 23.55C12.14 19.24 9 16.39 9 13.5C9 11.5 10.5 10 12.5 10C14.04 10 15.54 11 16.07 12.36H17.93C18.46 11 19.96 10 21.5 10C23.5 10 25 11.5 25 13.5C25 16.39 21.86 19.24 17.1 23.55ZM21.5 8C19.76 8 18.09 8.81 17 10.08C15.91 8.81 14.24 8 12.5 8C9.42 8 7 10.41 7 13.5C7 17.27 10.4 20.36 15.55 25.03L17 26.35L18.45 25.03C23.6 20.36 27 17.27 27 13.5C27 10.41 24.58 8 21.5 8Z"
                      fill="#3E3E3E"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
