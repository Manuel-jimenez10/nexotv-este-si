import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SupportService } from './support.service';
import { Support } from './entities/support.entity';
import { CreateSupportInput } from './dto/inputs';
import { UpdateSupportInput } from './dto/inputs';

@Resolver(() => Support)
export class SupportResolver {
  constructor(private readonly supportService: SupportService) {}

  @Mutation(() => Support, { description: 'Crea un nuevo registro de soporte' })
  async createSupport(
    @Args('createSupportInput') createSupportInput: CreateSupportInput,
  ) {
    return this.supportService.create(createSupportInput);
  }

  @Query(() => [Support], { name: 'supports', description: 'Obtiene todos los registros de soporte' })
  async findAll(): Promise<Support[]> {
    return this.supportService.findAll();
  }

  @Query(() => Support, { name: 'support', description: 'Obtiene un registro de soporte por ID' })
  async findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Support> {
    return this.supportService.findOne(id);
  }

  @Mutation(() => Support, { description: 'Actualiza un registro de soporte por ID' })
  async updateSupport(
    @Args('id', { type: () => String }) id: string,
    @Args('updateSupportInput') updateSupportDto: UpdateSupportInput,
  ): Promise<Support> {
    return this.supportService.update(id, updateSupportDto);
  }

  @Mutation(() => Support, { description: 'Elimina un registro de soporte por ID' })
  async removeSupport(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Support> {
    return this.supportService.remove(id);
  }
}
