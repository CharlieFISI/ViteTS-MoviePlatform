interface MediaTrailerProps {
  videoKey: string;
}

export const MediaTrailer = ({ videoKey }: MediaTrailerProps) => {
  return (
    <div className='mt-8'>
      <h2 className='mb-4 text-2xl font-bold'>Trailer</h2>
      <div className='aspect-w-16 aspect-h-9'>
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}`}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Embedded youtube'
          className='h-[calc(100vh-200px)] max-h-[600px] w-full'
        />
      </div>
    </div>
  );
};
