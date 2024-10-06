import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEpisodesData } from '../store/mediaSlice';
import { Button } from './ui/button';

interface Season {
  id: number;
  name: string;
  season_number: number;
}

interface EpisodeListProps {
  seasons: Season[];
  seriesId: number;
}

export const EpisodeList = ({ seasons, seriesId }: EpisodeListProps) => {
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const dispatch = useAppDispatch();
  const episodes = useAppSelector(
    (state) =>
      state.media.episodes[`${seriesId}-${selectedSeason?.season_number}`] || []
  );

  useEffect(() => {
    if (seasons.length > 0 && !selectedSeason) {
      setSelectedSeason(seasons[0]);
    }
  }, [seasons, selectedSeason]);

  useEffect(() => {
    if (selectedSeason) {
      dispatch(
        fetchEpisodesData({
          seriesId,
          seasonNumber: selectedSeason.season_number
        })
      );
    }
  }, [dispatch, seriesId, selectedSeason]);

  if (!selectedSeason) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mb-8'>
      <h2 className='mb-4 text-2xl font-bold'>Episodes</h2>
      <div className='mb-4 flex'>
        {seasons.map((season) => (
          <Button
            key={season.id}
            variant={selectedSeason.id === season.id ? 'default' : 'outline'}
            onClick={() => setSelectedSeason(season)}
            className='mr-2'
          >
            {season.name}
          </Button>
        ))}
      </div>
      <div className='grid grid-cols-1 gap-4'>
        {episodes.map((episode) => (
          <div
            key={episode.id}
            className='rounded bg-gray-800 p-4'
          >
            <h3 className='font-bold'>
              {episode.episode_number}. {episode.name}
            </h3>
            <p className='text-sm text-gray-400'>{episode.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
