import { DgraphEntityType, IQueryFactory } from '@codelab/backend/abstract/core'
import { makeFilterString } from '@codelab/backend/infra'

export class PropMapBindingQueryFactory implements IQueryFactory {
  /** Use with @normalize */
  static readonly pmbFragment = `
            id: uid
            sourceKey: sourceKey
            targetKey: targetKey
            targetElement {
              targetElementId: uid
            }`

  forGet(filter?: string, queryName = 'getPropMapBinding'): string {
    const filterString = makeFilterString(filter)

    return `{
      ${queryName}(func: type(${DgraphEntityType.PropMapBinding})) ${filterString} @normalize  {
        ${PropMapBindingQueryFactory.pmbFragment}
      }
    }`
  }
}
