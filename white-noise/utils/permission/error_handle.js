const actionResEnum = {
  SUCCESS: 0,
  FAILED: 1,
  UNEXPECTED_EXCEPTION: 2,
  OTHER: 3,
  EXPIRED_DATA: 4,
  ILLEGAL: 5,
  OUT_OF_PERIOD: 6
}

// const authResEnum = {
//   ERROR_LOGIN_INFO: 100,
//   TOKEN_EXPIRATION: 101,
//   INVALID_TOKEN: 102
// }

export function checkResCodeAndBackMsg(res) {
  // // console.log('!checkResCodeAndBackMsg!', res)
  let message = ''
  if (!res.ErrorCode) {
    return { message: '操作成功', state: true }
  }
  switch (res.ErrorCode) {
    case actionResEnum.SUCCESS:
      message = res.Info || '操作成功'
      break
    case actionResEnum.FAILED:
      message = res.Info || '操作失败'
      break
    case actionResEnum.UNEXPECTED_EXCEPTION:
      message = res.Info || '数据为空'
      break
    case actionResEnum.OTHER:
      message = res.Info || '未知错误，联系网站管理员'
      break
    case actionResEnum.EXPIRED_DATA:
      message = res.Info || '超时，请重试'
      break
    case actionResEnum.ILLEGAL:
      message = res.Info || '非法操作，请登录'
      break
    case actionResEnum.OUT_OF_PERIOD:
      message = res.Info || '没有权限'
      break
  }
  return { state: false, message }
}

export function showErrorMessage(dom, message) {}
