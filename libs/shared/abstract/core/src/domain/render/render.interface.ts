import { ArrayOrSingle } from 'ts-essentials'
import { IAtomType } from '../atom'
import { IElement } from '../element'
import { IPropData, IPropDataByElementId } from '../prop'

/**
 * This is the intermediate output from rendering a single Element
 */
export interface IRenderOutput {
  /** This is the id of the element which this RenderOutput was rendered from */
  elementId: string
  atomType?: IAtomType
  props?: IPropData
  /** Any props that should get passed to descendants of this element, mapped by id */
  globalProps?: IPropDataByElementId
}

export interface IRenderPipe {
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput>
}
