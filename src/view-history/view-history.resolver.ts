import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ViewHistoryService } from './view-history.service';
import { ViewHistory } from './entities/view-history.entity';
import { CreateViewHistoryInput } from './dto/create-view-history.input';
import { UpdateViewHistoryInput } from './dto/update-view-history.input';

@Resolver(() => ViewHistory)
export class ViewHistoryResolver {
  constructor(private readonly viewHistoryService: ViewHistoryService) {}

  @Mutation(() => ViewHistory, { description: 'Crea un nuevo registro de historial de vistas' })
  createViewHistory(
    @Args('createViewHistoryInput')
    createViewHistoryInput: CreateViewHistoryInput,
  ) {
    return this.viewHistoryService.create(createViewHistoryInput);
  }

  @Query(() => [ViewHistory], { name: 'viewHistories', description: 'Obtiene todos los registros de historial de vistas' })
  findAll() {
    return this.viewHistoryService.findAll();
  }

  @Query(() => ViewHistory, { name: 'viewHistory', description: 'Obtiene un registro de historial de vistas por ID' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.viewHistoryService.findOne(id);
  }

  @Mutation(() => ViewHistory, { description: 'Actualiza un registro de historial de vistas' })
  updateViewHistory(
    @Args('updateViewHistoryInput')
    updateViewHistoryInput: UpdateViewHistoryInput,
  ) {
    return this.viewHistoryService.update(
      updateViewHistoryInput.id,
      updateViewHistoryInput,
    );
  }

  @Mutation(() => ViewHistory, { description: 'Elimina un registro de historial de vistas por ID' })
  removeViewHistory(@Args('id', { type: () => Int }) id: number) {
    return this.viewHistoryService.remove(id);
  }
}
