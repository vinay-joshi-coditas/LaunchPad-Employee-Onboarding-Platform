export const RealtimeEvents = {
  TASK_STATUS_UPDATED: "task:status_updated",

  DOCUMENT_REVIEWED: "document:reviewed",
} as const;

export type RealtimeEvent = (typeof RealtimeEvents)[keyof typeof RealtimeEvents];
