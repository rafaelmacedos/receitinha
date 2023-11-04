/**
 * Converter número para unidade monetária decimal no formato BRL.
 *
 * @author Darllinson Azevedo
 *
 * @param value Número a ser convertido
 * @returns Número convertido para unidade monetária decimal no formato BRL.
 */
export function ToCurrencyBRL(value: number): string {
  return value.toLocaleString('pt-br', {
    style: 'decimal',
    minimumFractionDigits: 2,
  })
}
