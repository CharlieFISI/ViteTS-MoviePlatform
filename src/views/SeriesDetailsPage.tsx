import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentSection } from '../components/CommentSection';
import { EpisodeList } from '../components/EpisodeList';
import { MediaRecommendations } from '../components/MediaRecommendations';
import { Button } from '../components/ui/button';
import { VideoPlayer } from '../components/VideoPlayer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchSeasonsData, fetchTVDetailsData } from '../store/mediaSlice';

export const SeriesDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const series = useAppSelector(
    (state) => state.media.serieDetails[Number(id)]
  );
  const seasons = useAppSelector((state) => state.media.seasons[Number(id)]);

  useEffect(() => {
    if (id) {
      dispatch(fetchTVDetailsData(Number(id)));
      dispatch(fetchSeasonsData(Number(id)));
    }
  }, [dispatch, id]);

  if (!series || !seasons) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <VideoPlayer videoUrl={series.videoUrl} />
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8 flex'>
          <img
            src={series.poster_path}
            alt={series.name}
            className='mr-8 h-96 w-64 object-cover'
          />
          <div>
            <h1 className='mb-2 text-4xl font-bold'>{series.name}</h1>
            <div className='mb-4 flex items-center'>
              <span className='mr-2 rounded bg-gray-700 px-2 py-1 text-sm'>
                {series.genres[0]?.name}
              </span>
              <span className='text-sm'>
                {new Date(series.first_air_date).getFullYear()}
              </span>
              <span className='ml-4 text-sm'>
                {series.number_of_seasons} Seasons
              </span>
            </div>
            <p className='mb-4'>{series.overview}</p>
            <Button variant='destructive'>+ Add to Favourite</Button>
          </div>
        </div>
        <EpisodeList
          seasons={seasons}
          seriesId={Number(id)}
        />
        <MediaRecommendations
          mediaType='tv'
          mediaId={series.id}
        />
        <CommentSection
          mediaId={series.id}
          mediaType='tv'
        />
      </div>
    </div>
  );
};
