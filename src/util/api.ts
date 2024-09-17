type ApiResponseError = {
  message?: string;
  trace?: string;
  critical: boolean;
};

type ApiResponse = {
  success: boolean;
  data?: unknown;
  error?: ApiResponseError
};

const Api = {
  getResponseSuccess(data?: unknown): string {
    const response: ApiResponse = {
      success: true,
    };

    if (data) {
      response.data = data;
    }

    return JSON.stringify(response);
  },

  getResponseFailure(message: string): string {
    const error: ApiResponseError = {
      message,
      critical: false,
    };

    if (process.env.API_TRACE === 'true') {
      error.trace = Error().stack;
    }

    const response: ApiResponse = {
      success: false,
      error,
    };

    return JSON.stringify(response);
  },

  getResponseCritical(message: string): string {
    const error: ApiResponseError = {
      message,
      critical: true,
    };

    if (process.env.API_TRACE === 'true') {
      error.trace = Error().stack;
    }

    const response: ApiResponse = {
      success: false,
      error,
    };

    return JSON.stringify(response);
  },
};

export default Api;
export { ApiResponse, ApiResponseError };
