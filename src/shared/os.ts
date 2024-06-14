/**
 * @returns `true` if the script is running on a Windows platform. Otherwise, returns "false"
 */
export function isWindows() {
  return process.platform === 'win32';
}
