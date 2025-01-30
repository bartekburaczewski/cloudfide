export async function tryAct<T = Error, K = any>(
  callback: () => Promise<K> | K,
): Promise<{
  result?: Promise<K> | K;
  error?: T;
}> {
  try {
    const result = await callback();
    return { result };
  } catch (error) {
    return { error: error as T };
  }
}
