import {
  SelectAnyElement,
  SelectAtom,
  SelectComponent,
} from '@codelab/frontend/modules/type'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import {
  IBuilderService,
  IComponentService,
  ICreateElementDTO,
  IElementService,
  IElementTree,
  IRenderService,
  IUserService,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { mapElementOption } from '../../../utils/elementOptions'
import { createElementSchema } from './createElementSchema'

type CreateElementModalProps = {
  pageTree: IElementTree
  renderService: IRenderService
  builderService: IBuilderService
  elementService: IElementService
  userService: IUserService
  componentService: IComponentService
}

export const CreateElementModal = observer<CreateElementModalProps>(
  ({
    elementService,
    builderService,
    userService,
    pageTree,
    renderService,
  }) => {
    const onSubmit = async (data: ICreateElementDTO) => {
      const [element] = await elementService.create([data])

      // Build tree for page
      pageTree.buildTree([element])

      // Get the component tree for the current element, so we can update the component tree
      const componentId = builderService.activeComponent?.id

      if (componentId) {
        const componentTree =
          renderService.renderers.get(componentId)?.pageTree?.current

        componentTree?.buildTree([element])
      }

      return Promise.resolve([element])
    }

    const onSubmitError = createNotificationHandler({
      title: 'Error while creating element',
    })

    const parentElement = elementService.createModal.parentElement

    const model = {
      parentElementId: parentElement?.id || undefined,
      order: parentElement ? parentElement?.lastChildOrder + 1 : 1,
      owner: userService.user?.auth0Id,
    }

    const closeModal = () => elementService.createModal.close()

    return (
      <ModalForm.Modal
        okText="Create"
        onCancel={closeModal}
        title={<span css={tw`font-semibold`}>Create element</span>}
        visible={elementService.createModal.isOpen}
      >
        <ModalForm.Form<ICreateElementDTO>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={closeModal}
          schema={createElementSchema}
        >
          <AutoFields
            omitFields={[
              'parentElementId',
              'atomId',
              'instanceOfComponentId',
              'order',
              'customCss',
              'guiCss',
              'propsData',
            ]}
          />
          <AutoField
            component={observer((props) => (
              <SelectAnyElement
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...(props as any)}
                allElementOptions={pageTree.elementsList
                  .filter(
                    (element) =>
                      !element?.instanceOfComponent && !element?.component,
                  )
                  .map(mapElementOption)}
              />
            ))}
            name="parentElementId"
          />
          <AutoField name="order" />
          <AutoField component={SelectAtom} name="atomId" />
          <AutoField
            activeComponentId={builderService.activeComponent?.id}
            component={SelectComponent}
            name="instanceOfComponentId"
          />
        </ModalForm.Form>
      </ModalForm.Modal>
    )
  },
)

CreateElementModal.displayName = 'CreateElementModal'
