export type ApiResponse = {
  statusCode: number;
  ok: boolean;
  data: any;
};

export type ErrorData = {
  path?: string;
  timestamp: string;
  errorCode?: string;
  message: string;
};

export type UserDetail = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  role?: {
    id: number;
    name: string;
    description?: string;
  };
};
