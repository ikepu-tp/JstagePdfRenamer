import { DEFAULT_BUTTON_DESIGN, DEFAULT_FILE_NAME_TEMPLATE } from "./constants";

export type buttonDesignType = "text" | "outlined" | "contained";
export type StorageResource<
  V = string | number | boolean,
  T = Record<string, V>
> = Record<string, V> &
  T & {
    fileNameTemplate?: string;
    buttonDesign?: buttonDesignType;
  };

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

/**
 * @export
 * @return {*}  {Promise<void>}
 */
export async function initializeStorage(): Promise<void> {
  const defaultStorage: StorageResource = {
    fileNameTemplate: DEFAULT_FILE_NAME_TEMPLATE,
    buttonDesign: DEFAULT_BUTTON_DESIGN,
  };
  const currentStorage = await getSyncStorage(Object.keys(defaultStorage));

  await setSyncStorage({ ...defaultStorage, ...currentStorage });
}
