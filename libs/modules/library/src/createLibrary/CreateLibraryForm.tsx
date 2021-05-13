import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  refetchLibraryExplorerQuery,
  useCreateLibraryMutation,
} from '@codelab/hasura'
import React, { useEffect } from 'react'
import { DeepPartial } from 'uniforms'
import { AutoFields } from 'uniforms-antd'
import { CreateLibraryInput, createLibrarySchema } from './createLibrarySchema'

type CreateLibraryFormProps = UniFormUseCaseProps<CreateLibraryInput>

export const CreateLibraryForm = ({ ...props }: CreateLibraryFormProps) => {
  const { reset, setLoading } = useCRUDModalForm(EntityType.Library)

  const [mutate, { loading: creating }] = useCreateLibraryMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchLibraryExplorerQuery()],
  })

  useEffect(() => {
    setLoading(creating)
  }, [creating])

  const onSubmit = (submitData: DeepPartial<CreateLibraryInput>) => {
    return mutate({
      variables: {
        input: {
          name: submitData.name,
          // owner: {
          //   email: user?.email,
          // },
        },
      },
    })
  }

  return (
    <FormUniforms<CreateLibraryInput>
      onSubmit={onSubmit}
      schema={createLibrarySchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating library',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
