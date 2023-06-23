import type { IPropData } from '@codelab/frontend/abstract/core'
import {
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_REGEX,
  STATE_PATH_TEMPLATE_START,
} from '@codelab/frontend/abstract/core'
import { mapDeep } from '@codelab/shared/utils'
import isString from 'lodash/isString'

export const hasStateExpression = (str: unknown): boolean =>
  isString(str) &&
  str.includes(STATE_PATH_TEMPLATE_START) &&
  str.includes(STATE_PATH_TEMPLATE_END)

export const isSingleStateExpression = (str: string) =>
  str.startsWith(STATE_PATH_TEMPLATE_START) &&
  str.endsWith(STATE_PATH_TEMPLATE_END)

export const stripStateExpression = (expression: string) =>
  expression.substring(2, expression.length - 2).trim()

export const evaluateExpression = (
  expression: string,
  state: IPropData,
  props: IPropData = {},
) => {
  try {
    const code = `return ${stripStateExpression(expression)}`

    // eslint-disable-next-line no-new-func
    return new Function('props', code).call(state, props)
  } catch (error) {
    console.log(error)

    return expression
  }
}

export const replaceStateInProps = (
  props: IPropData,
  state: IPropData = {},
  injectedProps: IPropData = {},
) =>
  mapDeep(
    props,
    // value mapper
    (value, key) =>
      isString(value) ? getByExpression(value, state, injectedProps) : value,
    // key mapper
    (value, key) =>
      (isString(key)
        ? getByExpression(key, state, injectedProps)
        : key) as string,
  )

export const getByExpression = (
  key: string,
  state: IPropData,
  props: IPropData = {},
) => {
  if (!hasStateExpression(key)) {
    return key
  }

  /**
   * return typed value for : {{expression}}
   */
  if (isSingleStateExpression(key)) {
    return evaluateExpression(key, state, props)
  }

  /**
   * return string value for : [text1]? {{expression1}} [text2]? {{expression2}}...
   */
  return key.replace(STATE_PATH_TEMPLATE_REGEX, (value) =>
    evaluateExpression(value, state, props),
  )
}
