export class GetFeedQuery {
    constructor(
      public readonly page: number,
      public readonly limit: number,
      public readonly direction: string,
    ) {}
  }