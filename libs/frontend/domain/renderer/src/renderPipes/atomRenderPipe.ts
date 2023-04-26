import {
  type IElement,
  type IPropData,
  type IRenderOutput,
  type IRenderPipe,
  builderServiceContext,
} from '@codelab/frontend/abstract/core'
import { isAtomInstance } from '@codelab/frontend/domain/atom'
import { css } from '@emotion/react'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'
import { atomFactory } from '../atoms'
import { evalCss } from '../utils/evalCss'
import { BaseRenderPipe } from './renderPipe.base'

@model('@codelab/AtomRenderPipe')
export class AtomRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (!isAtomInstance(element.renderType)) {
      if (this.renderer.debugMode) {
        console.info(`AtomRenderPipe: No atom found`, { element: element.name })
      }

      return this.next.render(element, props)
    }

    const atomRenderType = element.renderType.current

    const [ReactComponent, newProps] = atomFactory({
      atomType: atomRenderType.type,
      node: element,
      props,
    })

    if (!ReactComponent) {
      console.warn(
        `AtomRenderPipe: No RootComponent found for atom type ${atomRenderType.type}`,
      )

      return this.next.render(element, props)
    }

    const elCss =
      element.customCss || element.guiCss
        ? css([
            JSON.parse(element.guiCss || '{}'),
            evalCss(element.customCss || ''),
          ])
        : undefined

    if (this.renderer.debugMode) {
      console.info(`AtomRenderPipe: Rendering atom ${atomRenderType.type}`, {
        element: element.name,
      })
    }

    return RenderOutput.withAtom({
      atomType: atomRenderType.type,
      element,
      props: { ...newProps, css: elCss },
    })
  }
}
