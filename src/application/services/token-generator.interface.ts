export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface TokenGenerator {
  generate(payload: TokenPayload): string;
  verify(token: string): TokenPayload;
} 