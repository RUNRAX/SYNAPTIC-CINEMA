// src/entities/User.js

// A mock user object to simulate a logged-in user.
const mockUser = {
  id: 'user123',
  full_name: 'Rakshit',
  email: 'rakshitawati@gmail.com',
  created_date: '2023-10-26T10:00:00Z',
  bio: 'Just a cinephile exploring different worlds, one movie at a time.',
  notifications: true,
  autoplay: true,
  quality: 'hd',
  privacy: 'friends',
};

/**
 * This object simulates the User entity from a backend.
 * It provides methods for fetching and updating user data.
 */
export const User = {
  // Simulates fetching the current user's data[cite: 5, 290, 569].
  me: async () => {
    return Promise.resolve(mockUser);
  },

  // Simulates updating user data on a server[cite: 293, 577].
  updateMyUserData: async (data) => {
    Object.assign(mockUser, data);
    return Promise.resolve(mockUser);
  },

  // Simulates a logout action.
  logout: async () => {
    // In a real app, this would clear tokens and redirect.
    window.location.href = '/';
    return Promise.resolve();
  },
};