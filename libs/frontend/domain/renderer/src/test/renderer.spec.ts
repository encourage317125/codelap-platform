import type { IRenderOutput } from '@codelab/frontend/abstract/core'
import {
  DATA_COMPONENT_ID,
  isAtomInstance,
} from '@codelab/frontend/abstract/core'
import { ComponentRenderPipe } from '../renderPipes/component-render-pipe'
import { setupTestForRenderer } from './setup/setup-test'

const extraProps = {
  extra1: '01',
  extra2: '02',
}

describe('Renderer', () => {
  /**
   * Before all render pipes were built in to the renderer, now we extract and test only the ones we need
   */
  const data = setupTestForRenderer([ComponentRenderPipe])

  it('should add extra props', () => {
    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
      extraProps,
    ) as IRenderOutput

    expect(props).toMatchObject(extraProps)
  })

  it('should apply transformation function', () => {
    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
      extraProps,
    ) as IRenderOutput

    expect(props).toMatchObject({
      'prop01-edited': 'prop01Value',
      'prop02-edited': 'prop02Value',
      'prop03-edited': 'prop03Value',
    })
  })

  it('should keep same props when transform function is invalid', () => {
    data.element.setPropTransformationJs('invalid fn')

    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.element,
      extraProps,
    ) as IRenderOutput

    expect(props).not.toMatchObject({
      'prop01-edited': 'prop01Value',
      'prop02-edited': 'prop02Value',
      'prop03-edited': 'prop03Value',
    })
  })

  it('should render component instance', () => {
    const { atomType, props } =
      data.rootStore.renderer.renderIntermediateElement(
        data.componentInstance,
        {},
      ) as IRenderOutput

    const clonedComponent =
      data.rootStore.componentService.clonedComponents.get(
        data.componentInstance.id,
      )

    const componentRootElement = data.component.rootElement.current

    expect(props).toMatchObject({
      [DATA_COMPONENT_ID]: clonedComponent?.id,
      ...data.componentInstance.props.current.values,
    })

    const componentAtomType = isAtomInstance(componentRootElement.renderType)
      ? componentRootElement.renderType.current.type
      : null

    expect(atomType).toBe(componentAtomType)
  })

  it('should have props with a replaced expression using the instance prop value', () => {
    const { props } = data.rootStore.renderer.renderIntermediateElement(
      data.componentInstance,
      {},
    ) as IRenderOutput

    const clonedComponent =
      data.rootStore.componentService.clonedComponents.get(
        data.componentInstance.id,
      )

    expect(props).toMatchObject({
      [DATA_COMPONENT_ID]: clonedComponent?.id,
      ...data.componentInstance.props.current.values,
      expressionProp: 'expression value - component instance prop',
    })
  })
})
