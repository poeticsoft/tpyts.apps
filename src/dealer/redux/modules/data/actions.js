import * as Actions from 'rdx/actions'

export const DATA_PROVIDERS_READY = 'DATA_PROVIDERS_READY'
export const dataProvidersReady = data => ({ type: DATA_PROVIDERS_READY })

export const DATA_PROVIDER_ADDED = 'DATA_PROVIDER_ADDED'
export const dataProviderAdded = data => ({
  type: DATA_PROVIDER_ADDED,
  payload: {
    data: data
  }
})

export const DATA_PROVIDER_CHANGED = 'DATA_PROVIDER_CHANGED'
export const dataProviderChanged = data => ({
  type: DATA_PROVIDER_CHANGED,
  payload: {
    data: data
  }
})

export const DATA_PROVIDER_REMOVED = 'DATA_PROVIDER_REMOVED'
export const dataProviderRemoved = data => ({
  type: DATA_PROVIDER_REMOVED,
  payload: {
    data: data
  }
})


