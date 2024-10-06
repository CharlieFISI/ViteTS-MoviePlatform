import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MediaInfo } from '../components/mediaDetailsPage/MediaInfo';
import { MediaRecommendations } from '../components/mediaDetailsPage/MediaRecommendations';
import { MediaTrailer } from '../components/mediaDetailsPage/MediaTrailer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchMovieDetailsData,
  fetchMovieVideosData,
  fetchRecommendedMediaData
} from '../store/mediaSlice';

export const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const movieId = Number(id);
  const movie = useAppSelector((state) => state.media.movieDetails[movieId]);
  const videos = useAppSelector((state) => state.media.movieVideos[movieId]);
  const isLoading = useAppSelector((state) => state.media.isLoading);
  const error = useAppSelector((state) => state.media.error);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetailsData(movieId));
      dispatch(fetchMovieVideosData(movieId));
      dispatch(fetchRecommendedMediaData({ id: movieId, mediaType: 'movie' }));
    }
  }, [dispatch, movieId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return null;

  const trailer = videos?.find((video) => video.type === 'Trailer');

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='container mx-auto px-4 py-8'>
        <MediaInfo media={movie} />
        {trailer && <MediaTrailer videoKey={trailer.key} />}
        <MediaRecommendations
          mediaType='movie'
          mediaId={movieId}
        />
      </div>
    </div>
  );
};
