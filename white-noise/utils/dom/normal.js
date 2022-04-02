/**
 *
 * @description 我域名过期了，写这个检测当前用户是否在快过期的域名下面
 * @export
 * @param {string} domain
 * @returns {Boolean}
 */
export function checkDomainName(domain) {
  if (!window) return
  // 拿到当前域名
  const curURL = window.location.href

  // 检测是否是传入的快过期的域名
  return curURL.includes(domain)
}
