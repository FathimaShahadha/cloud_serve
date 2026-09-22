import React, { useState } from 'react';
import { StarIcon, ThumbsUpIcon, MessageSquareIcon } from 'lucide-react';
import { Review } from '../data/mockData';
interface ReviewSystemProps {
  reviews: Review[];
  averageRating: number;
  onSubmitReview?: (rating: number, comment: string) => void;
  canReview?: boolean;
}
export function ReviewSystem({
  reviews,
  averageRating,
  onSubmitReview,
  canReview = false
}: ReviewSystemProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      if (onSubmitReview) onSubmitReview(rating, comment);
      setIsSubmitting(false);
      setSubmitted(true);
      setRating(0);
      setComment('');
    }, 1000);
  };
  // Calculate rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    const percentage = reviews.length > 0 ? count / reviews.length * 100 : 0;
    return {
      star,
      count,
      percentage
    };
  });
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Rating Summary */}
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex text-accent mb-2">
            {[1, 2, 3, 4, 5].map((star) =>
            <StarIcon
              key={star}
              className={`h-5 w-5 ${star <= Math.round(averageRating) ? 'fill-current' : 'text-gray-300'}`} />

            )}
          </div>
          <p className="text-sm text-gray-500">
            Based on {reviews.length} reviews
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="md:col-span-2 flex flex-col justify-center space-y-2">
          {distribution.map(({ star, count, percentage }) =>
          <div key={star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12 text-sm text-gray-600">
                <span>{star}</span>
                <StarIcon className="h-3 w-3 text-gray-400 fill-current" />
              </div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                className="h-full bg-accent rounded-full"
                style={{
                  width: `${percentage}%`
                }}>
              </div>
              </div>
              <div className="w-8 text-right text-sm text-gray-500">
                {count}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Write a Review Form */}
      {canReview && !submitted &&
      <div className="mb-10 p-6 border border-gray-200 rounded-xl bg-gray-50">
          <h4 className="font-semibold text-gray-900 mb-4">Write a Review</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) =>
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none">
                
                    <StarIcon
                  className={`h-8 w-8 transition-colors ${star <= (hoverRating || rating) ? 'text-accent fill-current' : 'text-gray-300'}`} />
                
                  </button>
              )}
              </div>
            </div>
            <div className="mb-4">
              <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-2">
              
                Your Experience
              </label>
              <textarea
              id="comment"
              rows={4}
              className="input-field resize-none"
              placeholder="Tell others about your experience with this provider..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required>
            </textarea>
            </div>
            <button
            type="submit"
            className="btn btn-primary"
            disabled={rating === 0 || isSubmitting}>
            
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      }

      {submitted &&
      <div className="mb-10 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200 flex items-center gap-3">
          <ThumbsUpIcon className="h-5 w-5" />
          <p>Thank you for your review! It has been submitted successfully.</p>
        </div>
      }

      {/* Reviews List */}
      <div className="space-y-6">
        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
          <MessageSquareIcon className="h-5 w-5 text-gray-400" />
          Recent Reviews
        </h4>

        {reviews.length === 0 ?
        <p className="text-gray-500 italic">No reviews yet.</p> :

        reviews.map((review) =>
        <div
          key={review.id}
          className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
          
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary-light text-white flex items-center justify-center font-bold">
                    {review.customerName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {review.customerName}
                    </h5>
                    <p className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                    </p>
                  </div>
                </div>
                <div className="flex text-accent">
                  {[1, 2, 3, 4, 5].map((star) =>
              <StarIcon
                key={star}
                className={`h-4 w-4 ${star <= review.rating ? 'fill-current' : 'text-gray-300'}`} />

              )}
                </div>
              </div>
              <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                {review.comment}
              </p>
            </div>
        )
        }
      </div>
    </div>);

}