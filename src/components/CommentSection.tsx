import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
}

interface CommentSectionProps {
  mediaId: number;
  mediaType: 'movie' | 'tv';
}

export const CommentSection = ({ mediaId, mediaType }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        user: {
          name: 'Current User',
          avatar: '/placeholder.svg?height=40&width=40'
        },
        content: newComment,
        date: new Date().toISOString()
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <div className='mt-8'>
      <h2 className='mb-4 text-2xl font-bold'>Comments</h2>
      <div className='mb-4 flex'>
        <Input
          type='text'
          placeholder='Write your comment here...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className='mr-2 flex-grow'
        />
        <Button onClick={handleSubmitComment}>Submit</Button>
      </div>
      <div className='space-y-4'>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className='flex items-start'
          >
            <img
              src={comment.user.avatar}
              alt={comment.user.name}
              className='mr-4 h-10 w-10 rounded-full'
            />
            <div>
              <div className='mb-1 flex items-center'>
                <span className='mr-2 font-bold'>{comment.user.name}</span>
                <span className='text-sm text-gray-500'>
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
