import { ComponentElementNode } from '@codelab/frontend/shared'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { nodeToElementMapState } from '../renderer/nodeToElementMapState'
import { builderElementSelectionState } from '../selection'
import { OverlayToolbar } from './OverlayToolbar'

export const HoverOverlay = () => {
  const { map: nodeToElementMap } = useRecoilValue(nodeToElementMapState)
  const { hoveringElement } = useRecoilValue(builderElementSelectionState)

  const { node, element } =
    nodeToElementMap && hoveringElement && nodeToElementMap[hoveringElement]
      ? nodeToElementMap[hoveringElement]
      : { node: undefined, element: undefined }

  if (!element) {
    return null
  }

  return (
    <OverlayToolbar<ComponentElementNode>
      overlayElement={element}
      containerProps={{
        style: {
          border: '1px solid rgb(41, 205, 255)',
        },
      }}
      toolbarProps={{
        style: {
          background: 'transparent',
          color: 'rgb(41, 205, 255)',
        },
      }}
      content={<div>{node?.nodeType}</div>}
    />
  )
}
