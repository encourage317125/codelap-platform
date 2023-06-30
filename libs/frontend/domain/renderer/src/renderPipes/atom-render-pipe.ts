import {
  builderServiceContext,
  elementRef,
  type IElement,
  type IPropData,
  type IRenderOutput,
  type IRenderPipe,
  isAtomInstance,
} from '@codelab/frontend/abstract/core'
import type { IAtomType } from '@codelab/shared/abstract/core'
import { css } from '@emotion/react'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import { atomFactory } from '../atoms'
import { RenderOutput } from '../utils'
import { evalCss } from '../utils/eval-css'
import { BaseRenderPipe } from './render-pipe.base'

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

    const atomType = (atomRenderType.externalSourceType ??
      atomRenderType.type) as IAtomType

    const [ReactComponent, newProps] = atomFactory({
      atom: atomRenderType,
      node: element,
      props,
    })

    if (!ReactComponent && !atomRenderType.externalSourceType) {
      console.warn(
        `AtomRenderPipe: No RootComponent found for atom type ${atomType}`,
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
      console.info(`AtomRenderPipe: Rendering atom ${atomType}`, {
        element: element.name,
      })
    }

    return RenderOutput.withAtom({
      atomType,
      element,
      props: {
        ...newProps,
        css: elCss,

        // onMouseEnter: () =>
        //   builderServiceContext
        //     .get(element)
        //     ?.setHoveredNode(elementRef(element)),
        // onMouseLeave: () =>
        //   builderServiceContext.get(element)?.setHoveredNode(null),
      },
    })
  }
}
