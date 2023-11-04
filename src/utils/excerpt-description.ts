/**
 * Resumir descrição dos produtos anunciados na Budega.
 *
 * @author Darllinson Azevedo
 *
 * @param description Descrição do produto
 * @param limit Limite de caracteres (padrão = 256)
 * @returns Descrição dos produtos resumida e com "..." no final
 */
export function ExcerptDescription(description: string, limit = 256) {
  if (description.length > limit) {
    description = description.substring(0, limit - 3) + '...'
  }

  return description
}
