import { useAppSelector } from '../../store/hooks';
import { MediaCard } from '../MediaCard';

interface MediaRecommendationsProps {
  mediaType: 'movie' | 'tv';
  mediaId: number;
}

export const MediaRecommendations = ({
  mediaType,
  mediaId
}: MediaRecommendationsProps) => {
  const recommendations = useAppSelector(
    (state) => state.media.recommended[`${mediaType}-${mediaId}`] || []
  );

  return (
    <div className='mt-8'>
      <h2 className='mb-4 text-2xl font-bold'>You may also like</h2>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {recommendations.slice(0, 5).map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            cardType='recommended'
          />
        ))}
      </div>
    </div>
  );
};
