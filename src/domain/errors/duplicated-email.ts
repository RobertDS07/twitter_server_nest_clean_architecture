export default class DuplicatedEmailError extends Error {
  constructor(message: string) {
    super(message);
  }
}
