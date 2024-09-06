import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from '../users/users.service';
import { CloudinaryResponse } from './cloudinary-response';
import { ContentService } from '../content/content.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly usersService: UsersService,
    private readonly contentService: ContentService,
  ) {}

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1220 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|mp4)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const response: CloudinaryResponse =
        await this.cloudinaryService.uploadFile(file);

      const secure_url: string = response.secure_url;
      console.log(response);

      if (response.format === 'mp4') {
        await this.contentService.update(id, { id, contentUrl: [secure_url] });
      }

      this.usersService.update(id, { id, userImage: [secure_url] });
      return response;
    } catch (error) {
      console.log('File upload error:', error);
      throw error;
    }
  }
}
