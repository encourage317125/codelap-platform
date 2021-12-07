import { withProvider } from '@codelab/frontend/presenter/container'
import { ConditionalView } from '@codelab/frontend/view/components'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'
import { useProvideCurrentApp } from './useProvideCurrentApp'

export const AppProvider = ({ children }: PropsWithChildren<unknown>) => {
  const { query } = useRouter()
  const appId = query.appId as string
  const { currentApp } = useProvideCurrentApp(appId)

  return <ConditionalView condition={!!currentApp}>{children}</ConditionalView>
}

export const withAppProvider = withProvider(AppProvider)
