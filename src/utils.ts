export const productFromData = (form: HTMLFormElement): ProductInput =>
  Object.fromEntries(new FormData(form)) as unknown as ProductInput;
