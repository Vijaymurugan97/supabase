import { PermissionAction } from '@supabase/shared-types/out/constants'
import { LOCAL_STORAGE_KEYS, useParams } from 'common'

import LegacyAPIKeys from 'components/interfaces/APIKeys/LegacyAPIKeys'
import { PublishableAPIKeys } from 'components/interfaces/APIKeys/PublishableAPIKeys'
import { SecretAPIKeys } from 'components/interfaces/APIKeys/SecretAPIKeys'
import DefaultLayout from 'components/layouts/DefaultLayout'
import ApiKeysLayout from 'components/layouts/project/[ref]/settings/APIKeysLayout'
import SettingsLayout from 'components/layouts/ProjectSettingsLayout/SettingsLayout'
import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import { useLocalStorageQuery } from 'hooks/misc/useLocalStorage'
import type { NextPageWithLayout } from 'types'
import { Separator } from 'ui'

const ApiKeysSettings: NextPageWithLayout = () => {
  const { ref: projectRef } = useParams()
  const [apiKeysView] = useLocalStorageQuery(
    LOCAL_STORAGE_KEYS.API_KEYS_VIEW(projectRef ?? ''),
    undefined
  )

  // const isPermissionsLoaded = usePermissionsLoaded()
  // TODO: check if these permissions cover third party auth as well
  const canReadAPIKeys = useCheckPermissions(PermissionAction.READ, 'api_keys')

  return (
    <>
      {apiKeysView !== 'legacy-keys' ? (
        <>
          <PublishableAPIKeys />
          <Separator />
          <SecretAPIKeys />
        </>
      ) : (
        <LegacyAPIKeys />
      )}
    </>
  )
}

ApiKeysSettings.getLayout = (page) => (
  <DefaultLayout>
    <SettingsLayout>
      <ApiKeysLayout>{page}</ApiKeysLayout>
    </SettingsLayout>
  </DefaultLayout>
)

export default ApiKeysSettings
