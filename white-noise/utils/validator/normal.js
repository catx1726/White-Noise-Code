const CONSOLE_TAG = 'utils validator normal.js'

export function handleDataIsUndefined(data) {
  console.log(`${CONSOLE_TAG} handleDataIsUndefined:`, data)
  if (data === undefined) return false
  return true
}
