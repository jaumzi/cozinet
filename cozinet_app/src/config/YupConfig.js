import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Inválido',
    required: 'Campo obrigatório',
    // oneOf: 'deve ser um dos seguintes valores: ${values}',
    // notOneOf: 'não pode ser um dos seguintes valores: ${values}'
  },
  string: {
    length: 'Deve ter ${length} caracteres',
    min: 'Deve ter mais que ${min} caracteres',
    max: 'Deve ter menos que ${max} caracteres',
    email: 'Email inválido',
    url: 'URL inválida',
    // trim: 'não deve conter espaços no início ou no fim.',
    // lowercase: 'deve estar em maiúsculo',
    // uppercase: 'deve estar em minúsculo'
  },
  number: {
    min: 'Deve ser no mínimo ${min}',
    max: 'Deve ser no máximo ${max}',
    lessThan: 'Deve ser menor que ${less}',
    moreThan: 'Deve ser maior que ${more}',
    notEqual: 'Não pode ser igual à ${notEqual}',
    positive: 'Deve ser um número posítivo',
    negative: 'Deve ser um número negativo',
    integer: 'Deve ser um número inteiro'
  },
  date: {
    min: ({ min }) =>
      `Deve ser maior que a data ${new Date(min).toLocaleString()}`,
    max: ({ max }) =>
      `Deve ser menor que a data ${new Date(max).toLocaleString()}`
  },
  array: {
    min: 'Deve ter no mínimo ${min} itens',
    max: 'Deve ter no máximo ${max} itens'
  }
});

