export type StorageResource<
  V = string | number | boolean,
  T = Record<string, V>
> = Record<string, V> & T & { fileNameTemplate?: string };

export async function getSyncStorage(
  key: keyof StorageResource | (keyof StorageResource)[]
): Promise<StorageResource> {
  const got = await chrome.storage.sync.get(key);
  console.log("getSyncStorage", got);
  return got;
}

export function setSyncStorage(value: StorageResource): void {
  chrome.storage.sync.get(value);
  console.log("setSyncStorage", value);
}
