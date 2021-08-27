import {
  CreateTypeInput,
  PrimitiveKind,
  TypeKind,
} from '@codelab/shared/codegen/graphql'

export const createPrimitiveStringInput: CreateTypeInput = {
  name: 'String',
  typeKind: TypeKind.PrimitiveType,
  primitiveType: { primitiveKind: PrimitiveKind.String },
}

export const createInterfaceTypeInput: CreateTypeInput = {
  name: 'New Interface',
  typeKind: TypeKind.InterfaceType,
}
