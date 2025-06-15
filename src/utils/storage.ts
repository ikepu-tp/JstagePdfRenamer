export type StorageResource<
  V = string | number | boolean,
  T = Record<string, V>
> = Record<string, V> & T;

export async function getSyncStorage(
  key: keyof StorageResource | (keyof StorageResource)[] | undefined = undefined
): Promise<StorageResource> {
  const got = await chrome.storage.sync.get(key);
  return got;
}

export function setSyncStorage(value: StorageResource): void {
  chrome.storage.sync.get(value);
}
