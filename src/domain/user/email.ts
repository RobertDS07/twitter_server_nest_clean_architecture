export default class Email {
  constructor(readonly value: string) {
    const isValid = this.validate();
    if (!isValid) throw new Error('Invalid email');
  }

  private validate() {
    const isValid = this.value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );

    return isValid;
  }
}
