/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * Organiza
 * API para o app organiza.
 * OpenAPI spec version: 1.0
 */

export interface UpdateUserDto {
  /** A url do avatar ou imagem do grupo */
  avatarUrl?: string;
  /** Seu e-mail */
  email?: string;
  /** Seu nome */
  name?: string;
  /**
   * Sua senha
   * @minLength 6
   */
  password?: string;
}