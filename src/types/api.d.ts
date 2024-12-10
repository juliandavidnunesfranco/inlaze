export interface TMDBResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
    message?: string;
    status_code?: number;
  }
  
  export interface AuthResponse {
    success: boolean;
    request_token?: string;
    guest_session_id?: string;
    expires_at?: string;
  }