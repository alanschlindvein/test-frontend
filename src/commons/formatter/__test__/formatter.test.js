import {
  cleanValue,
  cpfMask,
  cnpjMask,
  cpfFormat,
  cnpjFormat
} from '../';

test('should clean value', () => {
  const cpf = '000.000.000-00';
  const cnpj = '00.000.000/000-00';

  expect(cleanValue(cpf)).toBe('00000000000');
  expect(cleanValue(cnpj)).toBe('0000000000000');
});

test('should apply mask to cpf/cnpj', () => {
  const cpf = '00000000000';
  const cnpj = '00000000000000';

  expect(cpfMask(cpf)).toBe('000.000.000-00');
  expect(cnpjMask(cnpj)).toBe('00.000.000/0000-00');
});

test('should validate invalid cpf/cnpj', () => {
  const cpf = '000.000.00';
  const cnpj = '00.000.000/00';

  expect(cpf.match(cpfFormat)).toBeFalsy();
  expect(cnpj.match(cnpjFormat)).toBeFalsy();
});

test('should validate valid cpf/cnpj', () => {
  const cpf = '000.000.000-00';
  const cnpj = '00.000.000/0000-00';

  expect(cpf.match(cpfFormat)).toBeTruthy();
  expect(cnpj.match(cnpjFormat)).toBeTruthy();
});