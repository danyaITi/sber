export const ratingApi = {
  getUser: async () => {
    const res = await fetch("/api/user");
    return res.json();
  },

  getRating: async () => {
    const res = await fetch("/api/rating");
    return res.json();
  },

  getDetails: async () => {
    const res = await fetch("/api/details");
    return res.json();
  },
};
