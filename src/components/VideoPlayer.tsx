interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  return (
    <div className='relative pt-[56.25%]'>
      <video
        className='absolute left-0 top-0 h-full w-full object-cover'
        controls
        src={videoUrl}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
