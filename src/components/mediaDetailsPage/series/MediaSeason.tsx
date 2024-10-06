import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useCallback, useMemo, useState } from 'react';
import { Season } from '../../../models/Media';

interface MediaSeasonProps {
  seasons: Season[];
  onSeasonChange: (seasonNumber: number) => void;
}

export const MediaSeason = ({ seasons, onSeasonChange }: MediaSeasonProps) => {
  const [selectedSeason, setSelectedSeason] = useState<string>('');

  const memoizedSeasons = useMemo(() => seasons, [seasons]);

  const handleSeasonChange = useCallback(
    (value: string) => {
      setSelectedSeason(value);
      const selectedSeasonObj = memoizedSeasons.find(
        (season) => season.season_number.toString() === value
      );

      if (selectedSeasonObj) {
        onSeasonChange(selectedSeasonObj.season_number);
      }
    },
    [memoizedSeasons, onSeasonChange]
  );

  const selectedSeasonName = useMemo(
    () =>
      selectedSeason
        ? memoizedSeasons.find(
            (s) => s.season_number.toString() === selectedSeason
          )?.name
        : 'Select a season',
    [selectedSeason, memoizedSeasons]
  );

  return (
    <div className='mt-8'>
      <h2 className='mb-4 text-2xl font-bold'>Seasons</h2>
      <Select
        value={selectedSeason}
        onValueChange={handleSeasonChange}
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue>{selectedSeasonName}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {memoizedSeasons.map((season) => (
            <SelectItem
              key={season.id}
              value={season.season_number.toString()}
            >
              {season.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
