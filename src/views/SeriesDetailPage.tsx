import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MediaInfo } from '../components/mediaDetailsPage/MediaInfo';
import { MediaRecommendations } from '../components/mediaDetailsPage/MediaRecommendations';
import { EpisodeList } from '../components/mediaDetailsPage/series/EpisodeList';
import { MediaSeason } from '../components/mediaDetailsPage/series/MediaSeason';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchEpisodesData,
  fetchRecommendedMediaData,
  fetchSeasonsData,
  fetchTVDetailsData
} from '../store/mediaSlice';

export const SeriesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const seriesId = Number(id);
  const series = useAppSelector((state) => state.media.serieDetails[seriesId]);
  const seasons = useAppSelector((state) => state.media.seasons[seriesId]);
  const isLoading = useAppSelector((state) => state.media.isLoading);
  const error = useAppSelector((state) => state.media.error);
  const [selectedSeason, setSelectedSeason] = useState<number>(0);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['seriesDetails', seriesId],
        queryFn: () => dispatch(fetchTVDetailsData(seriesId)),
        enabled: !!seriesId
      },
      {
        queryKey: ['seriesSeasons', seriesId],
        queryFn: () => dispatch(fetchSeasonsData(seriesId)),
        enabled: !!seriesId
      },
      {
        queryKey: ['recommendedMedia', seriesId],
        queryFn: () =>
          dispatch(
            fetchRecommendedMediaData({ id: seriesId, mediaType: 'tv' })
          ),
        enabled: !!seriesId
      },
      {
        queryKey: ['episodes', seriesId, selectedSeason],
        queryFn: () =>
          dispatch(
            fetchEpisodesData({ seriesId, seasonNumber: selectedSeason })
          ),
        enabled: !!seriesId && selectedSeason > 0
      }
    ]
  });

  const isLoadingQueries = queries.some((query) => query.isLoading);
  const isErrorQueries = queries.some((query) => query.isError);

  if (isLoading || isLoadingQueries) return <div>Loading...</div>;
  if (error || isErrorQueries) return <div>Error: {error}</div>;
  if (!series || !seasons) return null;

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='container mx-auto px-4 py-8'>
        <MediaInfo media={series} />
        <MediaSeason
          seasons={seasons}
          onSeasonChange={setSelectedSeason}
        />
        <EpisodeList
          seriesId={seriesId}
          seasonNumber={selectedSeason}
        />
        <MediaRecommendations
          mediaType='tv'
          mediaId={seriesId}
        />
      </div>
    </div>
  );
};
