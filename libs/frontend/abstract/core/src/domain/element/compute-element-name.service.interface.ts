import type { Maybe } from '@codelab/shared/abstract/types'
import type { RenderType } from './element.dto.interface'

export interface IComputeElementNameService {
  pickedRenderTypeName: Maybe<string>
  pickedName: Maybe<string>
  computedName: string
  setPickedRenderType(renderType: RenderType): void
  setPickedName(name: Maybe<string>): void
}
