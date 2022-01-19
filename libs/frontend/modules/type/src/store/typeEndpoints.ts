import {
  ATOMS_CACHE_TAG,
  ELEMENT_CACHE_TAG,
  invalidatesAll,
  LAMBDA_CACHE_TAG,
  PAGE_CACHE_TAG,
  providesAll,
  providesById,
  TYPE_CACHE_TAG,
  TYPE_GRAPH_CACHE_TAG,
} from '@codelab/frontend/model/infra/api'
import { api as generatedApi } from '../graphql/type.endpoints.graphql.gen'

export const typeApi = generatedApi.enhanceEndpoints({
  endpoints: {
    CreateType: {
      invalidatesTags: () => [TYPE_GRAPH_CACHE_TAG, TYPE_CACHE_TAG],
    },
    GetType: {
      providesTags: (result) =>
        providesById(result?.getType?.id, TYPE_CACHE_TAG),
    },
    DeleteType: {
      invalidatesTags: () =>
        invalidatesAll(TYPE_CACHE_TAG, TYPE_GRAPH_CACHE_TAG),
    },
    GetTypeGraph: {
      providesTags: (result, _, arg) => [
        {
          type: TYPE_GRAPH_CACHE_TAG,
          id: arg.variables?.input.where.id ?? undefined,
        },
        ...(result?.getTypeGraph?.vertices.map((v) => ({
          type: TYPE_CACHE_TAG,
          id: v.id,
        })) ?? []),
      ],
    },
    GetTypes: {
      providesTags: (result) => providesAll(result?.getTypes, TYPE_CACHE_TAG),
    },
    UpdateEnumType: {
      invalidatesTags: (result) =>
        providesById(result?.updateEnumType?.id, TYPE_CACHE_TAG),
    },
    UpdatePrimitiveType: {
      invalidatesTags: (result) =>
        providesById(result?.updatePrimitiveType?.id, TYPE_CACHE_TAG),
    },
    ExportTypes: {
      providesTags: (result) => providesAll(result?.getTypes, TYPE_CACHE_TAG),
    },
    UpdateType: {
      invalidatesTags: (result) =>
        providesById(result?.updateType?.id, TYPE_CACHE_TAG),
    },
    UpdateUnionType: {
      invalidatesTags: (result) => [
        providesById(result?.updateUnionType?.id, TYPE_CACHE_TAG)[0],
        TYPE_GRAPH_CACHE_TAG,
      ],
    },
    GetTypeKinds: {
      providesTags: (result) => providesAll(result?.getTypes, TYPE_CACHE_TAG),
    },
    GetAtomsForSelect: {
      providesTags: (result) => providesAll(result?.getAtoms, ATOMS_CACHE_TAG),
    },
    GetComponentsForSelect: {
      providesTags: (result) =>
        providesAll(result?.getComponents, ELEMENT_CACHE_TAG),
    },
    GetLambdasForSelect: {
      providesTags: (result) =>
        providesAll(result?.getLambdas, LAMBDA_CACHE_TAG),
    },
    GetPagesForSelect: {
      providesTags: (result) => providesAll(result?.pages, PAGE_CACHE_TAG),
    },
    ImportTypes: {
      invalidatesTags: () =>
        invalidatesAll(TYPE_CACHE_TAG, TYPE_GRAPH_CACHE_TAG),
    },
  },
})

export { generatedApi as typeEndpoints }

export const {
  useImportTypesMutation,
  useGetAtomsTypeHookForSelectQuery,
  useCreateTypeMutation,
  useDeleteTypeMutation,
  useGetTypeGraphQuery,
  useGetTypeQuery,
  useGetTypesQuery,
  useLazyGetTypeGraphQuery,
  useLazyGetTypeQuery,
  useLazyGetTypesQuery,
  useUpdateEnumTypeMutation,
  useUpdatePrimitiveTypeMutation,
  useUpdateTypeMutation,
  useUpdateUnionTypeMutation,
  useGetTypeKindsQuery,
  useLazyGetTypeKindsQuery,
  useGetAtomsForSelectQuery,
  useGetComponentsForSelectQuery,
  useGetPagesForSelectQuery,
  useGetLambdasForSelectQuery,
  useLazyGetAtomsForSelectQuery,
  useLazyGetComponentsForSelectQuery,
  useLazyGetLambdasForSelectQuery,
  useLazyGetPagesForSelectQuery,
  useLazyExportTypesQuery,
} = generatedApi
