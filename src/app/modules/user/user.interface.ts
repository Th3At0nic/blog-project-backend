export type TUser = {
  name: string; // The full name of the user
  email: string; // The email address used for authentication and communication
  password: string; // The securely stored password
  role: 'admin' | 'user'; // The role determining access level, default is "user"
  isBlocked: boolean; // Indicates whether the user is blocked, default is false
};
