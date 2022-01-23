import { CRUDActionType, CRUDModalState } from '@codelab/frontend/abstract/core'
import {
  createCrudSlice,
  initialCrudState,
} from '@codelab/frontend/view/components'
import { Maybe } from '@codelab/shared/abstract/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { DefaultRootState } from 'react-redux'
import { ElementFragment } from '../graphql'

export interface ElementStateCreateMetadata {
  parentElementId?: string
}

export interface ElementState extends CRUDModalState<ElementFragment> {
  createMetadata?: ElementStateCreateMetadata
}

const initialState: ElementState = {
  ...initialCrudState,
  createMetadata: undefined,
}

export const elementSlice = createCrudSlice('element', initialState, {
  openCreateModal: (
    state,
    { payload }: PayloadAction<Maybe<ElementStateCreateMetadata>>,
  ) => {
    state.actionType = CRUDActionType.Create
    state.entity = undefined
    state.createMetadata = payload
  },
  resetModal: (s) => ({
    ...s,
    actionType: CRUDActionType.None,
    entity: undefined,
    deleteIds: [],
    updateId: '',
    createMetadata: undefined,
  }),
})

export const elementActions = elementSlice.actions
export const elementReducer = elementSlice.reducer

export const selectElement = (rootState: DefaultRootState) => rootState.element
