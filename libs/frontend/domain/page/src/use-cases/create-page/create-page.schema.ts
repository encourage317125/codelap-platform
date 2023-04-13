import type { ICreatePageData } from '@codelab/frontend/abstract/core'
import {
  appSchema,
  idSchema,
  nonEmptyString,
  ownerSchema,
  titleCaseValidation,
} from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'

export const createPageSchema: JSONSchemaType<ICreatePageData> = {
  properties: {
    ...idSchema,
    ...ownerSchema,
    ...appSchema,
    name: {
      autoFocus: true,
      ...nonEmptyString,
      ...titleCaseValidation,
    },
    url: {
      type: 'string',
      label: 'Deployed Page URL',
      help: 'Leave blank to autogenerate value',
    },
  },
  required: ['name'],
  title: 'Create Page Input',
  type: 'object',
} as const
