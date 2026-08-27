import React, { useState, useEffect } from 'react';
import { useResources } from '../../context/ResourceContext';
import { useAuth } from '../../context/AuthContext';
import { Rating } from '../common/Rating';
import { Input, Textarea } from '../common/Input';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { validateCommentForm } from '../../utils/validators';
import { formatDate } from '../../utils/formatters';
import { MessageSquare, Star, Send, User, CheckCircle2 } from 'lucide-react';

export function CommentSection({ resource }) {
  const { addComment } = useResources();
  const { user } = useAuth();

  const [userName, setUserName] = useState(user ? `${user.name} (${user.role === 'Faculty' ? 'Faculty' : `ECE Sem ${user.semester || 4}`})` : '');
  const [commentText, setCommentText] = useState('');
  const [ratingValue, setRatingValue] = useState(5);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && !userName) {
      setUserName(`${user.name} (${user.role === 'Faculty' ? 'Faculty' : `ECE Sem ${user.semester || 4}`})`);
    }
  }, [user]);

  const comments = resource.comments || [];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const validation = validateCommentForm({
      user: userName,
      text: commentText,
      rating: ratingValue,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    addComment(resource.id, {
      user: userName.trim(),
      text: commentText.trim(),
      rating: ratingValue,
    });

    setUserName('');
    setCommentText('');
    setRatingValue(5);
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Student Reviews & Discussion
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {comments.length} {comments.length === 1 ? 'review' : 'reviews'} for this material
            </p>
          </div>
        </div>

        <Rating value={resource.rating} count={resource.ratingCount} size="md" />
      </div>

      {/* Add Review Form */}
      <Card className="p-5 bg-slate-50/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
          <span>Leave a Review or Feedback</span>
        </h4>

        <form onSubmit={handleCommentSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Your Name / Year"
              placeholder="e.g. Ananya Roy (ECE 2nd Yr)"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                if (errors.user) setErrors((prev) => ({ ...prev, user: null }));
              }}
              error={errors.user}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Rating
              </label>
              <div className="flex items-center gap-3 pt-1">
                <Rating
                  value={ratingValue}
                  interactive
                  onChange={(val) => setRatingValue(val)}
                  size="lg"
                />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {ratingValue} / 5 Stars
                </span>
              </div>
            </div>
          </div>

          <Textarea
            label="Your Review / Note"
            rows={2}
            placeholder="Share how this resource helped you, any specific chapters of note, or corrections..."
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
              if (errors.text) setErrors((prev) => ({ ...prev, text: null }));
            }}
            error={errors.text}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={Send}
              disabled={isSubmitting}
            >
              Post Review
            </Button>
          </div>
        </form>
      </Card>

      {/* List of comments */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No reviews yet. Be the first student to review this resource!
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-xs space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center font-bold text-xs">
                    {comment.user.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {comment.user}
                    </span>
                    <span className="text-[10px] text-slate-400 block -mt-0.5">
                      {formatDate(comment.date)}
                    </span>
                  </div>
                </div>

                <Rating value={comment.rating || 5} size="sm" />
              </div>

              <p className="text-slate-600 dark:text-slate-300 pl-9 leading-relaxed">
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
