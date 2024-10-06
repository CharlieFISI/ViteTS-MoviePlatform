import { useAppSelector } from '../../../store/hooks';

interface EpisodeListProps {
  seriesId: number;
  seasonNumber: number;
}

export const EpisodeList = ({ seriesId, seasonNumber }: EpisodeListProps) => {
  const episodes = useAppSelector(
    (state) => state.media.episodes[`${seriesId}-${seasonNumber}`] || []
  );

  return (
    <div className='mt-8'>
      <h2 className='mb-4 text-2xl font-bold'>Episodes</h2>
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
