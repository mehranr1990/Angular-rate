export class User {
  constructor(
    public mobile: string,
    private _token: string,
  ) {}

  get token() {
    return this._token;
  }
}
