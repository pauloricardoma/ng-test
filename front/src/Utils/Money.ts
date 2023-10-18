export const numberToMoney = (value: number) => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
