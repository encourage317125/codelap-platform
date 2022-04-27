import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { PageCreateInput, PageWhere } from '@codelab/shared/abstract/codegen'
import { IPageDTO } from '@codelab/shared/abstract/core'
import { print } from 'graphql'
import {
  CreatePagesDocument,
  GetPagesDocument,
} from '../../../../../libs/frontend/modules/page/src/graphql'

export const getPages = (input: PageWhere) =>
  cy
    .graphqlRequest({
      query: print(GetPagesDocument),
      variables: { input },
    })
    .then((result) => result.body.data?.pages as Array<IPageDTO>)

const defaultInput: PageCreateInput = {
  name: 'Test Page',
  rootElement: { create: { node: { name: ROOT_ELEMENT_NAME } } },
}

export const createPage = (input: Partial<PageCreateInput>) =>
  cy
    .graphqlRequest({
      query: print(CreatePagesDocument),
      variables: { input: { ...defaultInput, ...input } },
    })
    .then((result) => result.body.data?.createPages.pages as Array<IPageDTO>)
