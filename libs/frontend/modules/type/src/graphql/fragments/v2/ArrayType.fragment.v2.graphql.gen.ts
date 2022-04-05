import * as Types from '@codelab/shared/abstract/codegen-v2'

import {
  TypeBase_AppType_Fragment,
  TypeBase_ArrayType_Fragment,
  TypeBase_ElementType_Fragment,
  TypeBase_EnumType_Fragment,
  TypeBase_InterfaceType_Fragment,
  TypeBase_LambdaType_Fragment,
  TypeBase_MonacoType_Fragment,
  TypeBase_PageType_Fragment,
  TypeBase_PrimitiveType_Fragment,
  TypeBase_ReactNodeType_Fragment,
  TypeBase_RenderPropsType_Fragment,
  TypeBase_UnionType_Fragment,
} from './TypeBase.fragment.v2.graphql.gen'
export type ArrayTypeWithItemTypeFragment = {
  itemType: Array<
    | TypeBase_AppType_Fragment
    | TypeBase_ArrayType_Fragment
    | TypeBase_ElementType_Fragment
    | TypeBase_EnumType_Fragment
    | TypeBase_InterfaceType_Fragment
    | TypeBase_LambdaType_Fragment
    | TypeBase_MonacoType_Fragment
    | TypeBase_PageType_Fragment
    | TypeBase_PrimitiveType_Fragment
    | TypeBase_ReactNodeType_Fragment
    | TypeBase_RenderPropsType_Fragment
    | TypeBase_UnionType_Fragment
  >
} & ArrayTypeFragment

export type ArrayTypeFragment = {
  itemType: Array<
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
  >
} & TypeBase_ArrayType_Fragment
