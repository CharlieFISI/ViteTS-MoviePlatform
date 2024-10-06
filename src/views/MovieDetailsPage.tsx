import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentSection } from '../components/CommentSection';
import { MediaRecommendations } from '../components/MediaRecommendations';
import { Button } from '../components/ui/button';
import { VideoPlayer } from '../components/VideoPlayer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMovieDetailsData } from '../store/mediaSlice';

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.media.movieDetails[Number(id)]);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetailsData(Number(id)));
    }
  }, [dispatch, id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <VideoPlayer videoUrl={movie.videoUrl} />
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8 flex'>
          <img
            src={movie.poster_path}
            alt={movie.title}
            className='mr-8 h-96 w-64 object-cover'
          />
          <div>
            <h1 className='mb-2 text-4xl font-bold'>{movie.title}</h1>
            <div className='mb-4 flex items-center'>
              <span className='mr-2 rounded bg-gray-700 px-2 py-1 text-sm'>
                {movie.genres[0]?.name}
              </span>
              <span className='text-sm'>
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className='ml-4 text-sm'>{movie.runtime} min</span>
            </div>
            <p className='mb-4'>{movie.overview}</p>
            <Button variant='destructive'>+ Add to Favourite</Button>
          </div>
        </div>
        <MediaRecommendations
          mediaType='movie'
          mediaId={movie.id}
        />
        <CommentSection
          mediaId={movie.id}
          mediaType='movie'
        />
      </div>
    </div>
  );
};
