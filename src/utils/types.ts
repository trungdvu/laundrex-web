export type ApiResponse = {
  statusCode: number;
  ok: boolean;
  data: unknown;
};

export type ErrorData = {
  path?: string;
  timestamp: string;
  errorCode?: string;
  message: string;
};
