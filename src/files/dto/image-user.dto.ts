import { IsArray, IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO para la actualización de imágenes de usuario.
 */
export class UpdateImageUserDto {
  /**
   * Lista de URLs de imágenes de usuario. Cada URL debe ser una cadena no vacía.
   */
  @IsArray()
  @IsString({ each: true, message: 'Cada imagen debe ser una cadena válida.' })
  @IsNotEmpty({ message: 'La lista de imágenes no puede estar vacía.' })
  userImage: string[];
}
