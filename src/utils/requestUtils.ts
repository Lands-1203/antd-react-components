/**
 * @description 处理过的code码，'success'| 'accepted'代表成功处理
 * @param code 'success'| 'accepted'
 * @returns Boolean
 */
export function isCodeSuccess(code: string | undefined = '') {
  if (['success', 'accepted'].includes(code)) return true;
  return false;
}
/**
 *
 * @param code 处理过的code码，'success'| 'accepted'代表成功处理
 * @param resolve 成功回调
 * @param reject 失败回调
 * @param all 任何时候都会回调
 * @returns void
 */
export async function asyncIsCodeSuccess(
  code: string | undefined = '',
  resolve?: (() => void) | (() => Promise<void>),
  reject?: (() => void) | (() => Promise<void>),
  all?: () => void,
) {
  if (['success', 'accepted'].includes(code)) {
    await resolve?.();
    await all?.();
    return true;
  }
  await reject?.();
  await all?.();
  return false;
}
