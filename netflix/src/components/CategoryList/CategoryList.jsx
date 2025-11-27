import MovieRow from "../MovieRow/MovieRow";

export default function CategoryList() {
  return (
    //categorie di film
    <div className="category-list">
      <MovieRow title="Film Popolari" endpoint="/movie/popular" />
      <MovieRow title="Più votati" endpoint="/movie/top_rated" />
      <MovieRow title="In Tendenza" endpoint="/trending/movie/week" />
    </div>
  );
}
