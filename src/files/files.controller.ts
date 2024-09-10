import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * findOne: Busca y devuelve la imagen de contenido estático asociada a un contentId
   * @param res Respuesta de Express para enviar el archivo
   * @param contentId ID del contenido a buscar
   */
  @Get('content/:contentId')
  findOne(@Res() res: Response, @Param('contentId') contentId: string) {
    const path = this.filesService.getStaticContentImage(contentId);
    res.sendFile(path);
  }

  /**
   * uploadContentImage: Sube una imagen asociada a un contenido, la almacena y genera una URL segura para acceder a la imagen
   * @param contentUUID UUID del contenido al que pertenece la imagen
   * @param file Archivo de imagen subido
   * @returns Objeto con la URL segura de la imagen
   */
  @Post('content/:contentUUID')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      limits: { fileSize: 20000000 }, // Límite de tamaño de archivo a 20MB
      storage: diskStorage({
        destination: './static/imgContent',
        filename: fileNamer,
      }),
    }),
  )
  uploadContentImage(
    @Param('contentUUID', ParseUUIDPipe) contentUUID: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file)
      throw new BadRequestException('Asegúrese de que el archivo sea una imagen');

    const secureUrl: string = `${this.configService.get('HOST_API')}/files/content/${file.filename}`;

    this.filesService.updateImgUser({
      id: contentUUID,
      image: secureUrl,
    });

    return {
      secureUrl,
    };
  }
}
