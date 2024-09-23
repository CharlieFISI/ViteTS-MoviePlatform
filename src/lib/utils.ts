import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMovieBackdropURL(movieBackdrop: string) {
  return `https://image.tmdb.org/t/p/original${movieBackdrop}`;
}
