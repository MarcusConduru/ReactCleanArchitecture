/* eslint-disable prettier/prettier */
export interface SaveAccessToken {
  save: (accessToken: string) => Promise<void>;
}
