export const Rooms = {
  hr: () => "room:hr",
  manager: (managerId: string) => `room:manager:${managerId}`,
  user: (userId: string) => `room:user:${userId}`,
};
