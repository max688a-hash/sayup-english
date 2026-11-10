/** Expected rejection of untrusted Apple input, not an operational server failure. */
export class AppleRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppleRequestError';
  }
}