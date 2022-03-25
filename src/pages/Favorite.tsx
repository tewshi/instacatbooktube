import React, { useEffect, useState } from "react";
import { Favorite } from "../utils/types";
import { addFavorite, deleteFavorite, getFavorites } from "../utils/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Favorites(): JSX.Element {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setFavorites(await getFavorites());
    };
    fetchData();
  }, []);

  const addFavor = async (id: string) => {
    if (favorites.find((i) => i.image_id === id)) {
      await deleteFavorite(
        favorites.find((i) => i.image_id === id)?.id as number
      );
      setFavorites(await getFavorites());
    } else {
      await addFavorite(id);
      setFavorites(await getFavorites());
    }
  };

  const variantA = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    },
    exit: {}
  };

  const variantB = {
    initial: {
      left: 200,
    },
    animate: {
      left: 0,
    },
    exit: {
      left: -200,
    },
  };

  return (
    <div className="h-screen">
      <div className="flex absolute w-full h-14 justify-between items-center px-4 top-0 backdrop-blur-md z-10">
        <button onClick={() => navigate("/")}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
              fill="#3E3E3E"
            />
          </svg>
        </button>
        <h1>Favorites</h1>
        <div></div>
      </div>
      <AnimatePresence>
        <motion.div
          variants={variantA}
          initial="initial"
          animate="animate"
          exit="exit"
          className="p-2 h-full pt-14 overflow-auto"
        >
          {favorites.map((i, index) => (
            <motion.div
              variants={variantB}
              key={i.image_id}
              layout
              className="min-h-[100px] rounded my-[2px] overflow-hidden relative"
            >
              <LazyLoadImage
                effect="blur"
                src={i.image.url}
                alt={`cat - ${index}`}
                className="w-full"
                width={"100%"}
              />
              <button
                className="absolute bottom-6 right-6"
                onClick={() => addFavor(i.image_id)}
              >
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
              </button>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
