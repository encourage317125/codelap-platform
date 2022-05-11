import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { IAuth0Id } from '../user'
import { ComponentFragment } from './component.fragment.graphql.gen'

export interface ICreateComponentDTO {
  name: string
  auth0Id: IAuth0Id
}

export type IUpdateComponentDTO = Omit<ICreateComponentDTO, 'auth0Id'>

export type IComponentDTO = ComponentFragment

export type IComponentExport = OGM_TYPES.Component
