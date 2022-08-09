import { ComponentWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import {
  CacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import { IBuilderDataNode } from '../../ui'
import { IAuth0Id } from '../user'
import {
  IComponentDTO,
  ICreateComponentDTO,
  IUpdateComponentDTO,
} from './component.dto.interface'
import { IComponent } from './component.model.interface'

export interface IComponentService
  extends ICRUDService<IComponent, ICreateComponentDTO, IUpdateComponentDTO>,
    IQueryService<IComponent, ComponentWhere>,
    ICRUDModalService<Ref<IComponent>, { component: Maybe<IComponent> }>,
    CacheService<IComponent, IComponentDTO> {
  components: ObjectMap<IComponent>
  component(id: string): Maybe<IComponent>
  componentAntdNode: IBuilderDataNode
  loadComponentTrees(auth0Id: IAuth0Id): Promise<any>
}
