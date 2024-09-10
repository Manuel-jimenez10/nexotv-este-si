import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { Content } from './entities/content.entity';
import { ContentService } from './content.service';
import { CreateContentInput } from './dto/inputs/create-content.input';
import { UpdateContentInput } from './dto/inputs/update-content.input';
import { PaginationContentArgs } from './dto/args/pagination-content.args';
/* import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards'; */
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.emun';

@Resolver(() => Content)
//@UseGuards(JwtAuthGuard)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Mutation(() => Content, { 
    description: 'createContent: Crea un nuevo contenido con la información proporcionada.' 
  })
  createContent(
    @Args('createContentInput') createContentInput: CreateContentInput,
    @CurrentUser([ValidRoles.admin]) content: Content,
  ) {
    console.log(content);
    return this.contentService.create(createContentInput);
  }

  @Query(() => [Content], { 
    name: 'contentAll', 
    description: 'findAll: Obtiene una lista de todos los contenidos con paginación.' 
  })
  findAll(
    @Args('paginationContentArgs') paginationContentArgs: PaginationContentArgs,
  ) {
    return this.contentService.findAll(paginationContentArgs);
  }

  @Query(() => Content, { 
    name: 'contentOne', 
    description: 'findOne: Obtiene un contenido específico por su ID.' 
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.contentService.findOne(id);
  }

  @Mutation(() => Content, { 
    description: 'updateContent: Actualiza un contenido existente con la nueva información proporcionada.' 
  })
  updateContent(
    @Args('updateContentInput') updateContentInput: UpdateContentInput,
    //@CurrentUser([ValidRoles.admin]) content: Content,
  ) {
    //console.log(content);
    return this.contentService.update(
      updateContentInput.id,
      updateContentInput,
    );
  }

  @Mutation(() => Content, { 
    description: 'removeContent: Elimina un contenido específico por su ID.' 
  })
  removeContent(
    @Args('id', { type: () => String }) id: string,
    //@CurrentUser([ValidRoles.admin]) content: Content,
  ) {
    //console.log(content);
    return this.contentService.remove(id);
  }

  @Query(() => Float, { 
    name: 'getRate', 
    description: 'getRate: Obtiene la tasa de un contenido específico por su ID.' 
  })
  getRate(@Args('contentId') id: string) {
    return this.contentService.getRate(id);
  }
}
