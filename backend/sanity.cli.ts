import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '25x1yw4c',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
    appId: 'diejamixr28zln9cnxsv1wqg',
  },
})
