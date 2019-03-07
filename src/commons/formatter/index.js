export const cleanValue = value => value.replace(/(\.|\/|-)/g, '');

export const cpfMask = value =>
  value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');

export const cnpjMask = value =>
  value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');

export const cpfFormat = /[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}/g;

export const cnpjFormat = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/g;
