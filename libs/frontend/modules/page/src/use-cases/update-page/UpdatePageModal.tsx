import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { usePageState } from '../../hooks'
import { UpdatePageInput } from './types'
import { updatePageSchema } from './updatePageSchema'
import { useUpdatePageForm } from './useUpdatePageForm'

export const UpdatePageModal = () => {
  const { actionType } = usePageState()

  const { onSubmit, onSubmitSuccess, onSubmitError, isLoading, reset, model } =
    useUpdatePageForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Update Page"
      onCancel={reset}
      visible={actionType === CRUDActionType.Update}
    >
      {({ submitRef }) => (
        <Form<UpdatePageInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={updatePageSchema}
          submitRef={submitRef}
        >
          <AutoFields omitFields={['appId']} />
        </Form>
      )}
    </FormModal>
  )
}
