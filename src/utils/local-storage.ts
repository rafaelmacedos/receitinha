import { LocalStorageKeys } from './enums/local-storage-keys.enum'

export abstract class LocalStorageUtils {
  /**
   * @description Armazenar valor no localStorage
   *
   * @author Darllinson Azevedo
   *
   * @param key Chave do item
   * @param value Valor a ser armazenado
   */
  public static storage(key: LocalStorageKeys, value: string): void {
    localStorage.setItem(key, value)
  }

  /**
   * @description Recuperar item do localStorage
   *
   * @author Darllinson Azevedo
   *
   * @param key Chave do item
   * @returns Item recuperado
   */
  public static getItem(key: LocalStorageKeys): string | null {
    return localStorage.getItem(key)
  }

  /**
   * @description Limpar todo o localStorage
   *
   * @author Darllinson Azevedo
   */
  public static clear(): void {
    localStorage.clear()
  }
}
