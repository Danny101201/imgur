export let orderObjKey = <TData>(input: Record<string, TData>) => {
  let result: Record<string, TData> = {}
  let sortedKeys = Object.keys(input).sort((a, b) => a.localeCompare(b))
  for (let key of sortedKeys) {
    result[key] = input[key]
  }
  return result

}