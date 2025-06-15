export type StorageResource<
  V = string | number | boolean,
  T = Record<string, V>
> = Record<string, V> & T & { fileNameTemplate?: string };

/**
 * 指定したキーの値をchrome.storage.syncから取得します。
 * @param key 取得するキーまたはキーの配列
 * @returns 取得したStorageResourceオブジェクト
 */
export async function getSyncStorage(
  key: keyof StorageResource | (keyof StorageResource)[]
): Promise<StorageResource> {
  const result = await chrome.storage.sync.get(key);
  console.debug("getSyncStorage:", result);
  return result as StorageResource;
}

/**
 * chrome.storage.syncに値を保存します。
 * @param value 保存するStorageResourceオブジェクト
 * @returns Promise<void>
 */
export async function setSyncStorage(value: StorageResource): Promise<void> {
  await chrome.storage.sync.set(value);
  console.debug("setSyncStorage:", value);
}
