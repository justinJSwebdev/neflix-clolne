import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import { MovieInterface } from "@/types";
interface IMovieList {
  data: MovieInterface[];
  title: string;
}
export default function MovieList({ data: moviesList, title }: IMovieList) {
  if (isEmpty(moviesList)) return null;
  console.log(moviesList);
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {moviesList.map((movie) => (
            <div key={movie.id}>
              <MovieCard data={movie}></MovieCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
