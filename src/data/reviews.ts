export interface Review {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  verified?: boolean;
}

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: "review-1",
    quote:
      "The aroma and taste are just like the filter coffee I had at my grandmother's home. Truly authentic!",
    author: "Ramesh K.",
    location: "Bengaluru",
    rating: 5,
    verified: true,
  },
  {
    id: "review-2",
    quote:
      "Rich, smooth and so fresh. You can really taste the quality of estate-grown coffee. KAVERO is now my go-to.",
    author: "Anita M.",
    location: "Mysuru",
    rating: 5,
    verified: true,
  },
  {
    id: "review-3",
    quote:
      "Excellent flavour and great packaging. The bold roast is perfect for my morning brew. Highly recommended!",
    author: "Vikram S.",
    location: "Mangaluru",
    rating: 5,
    verified: true,
  },
];
