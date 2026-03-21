export const ratingApi = {
  getUser: async (token: string) => {
    const res = await fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getRating: async (token: string) => {
    const res = await fetch("/api/rating", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

  getDetails: async (token: string) => {
    const res = await fetch("/api/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },
};
