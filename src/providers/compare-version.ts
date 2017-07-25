/**
 * Created by jinggk on 2017/7/25.
 */
// 检查版本号
// 生产环境版本号统一为类似“1.0.0”长度为3的方式
export function checkVersionNum (curVer, svrVer){
  const curVerList = curVer.split('.');
  const svrVerList = svrVer.split('.');

  for (let i = 0; i < 3 && i < curVerList.length && i < svrVerList.length; i++) {
    if (parseInt(curVerList[i]) < parseInt(svrVerList[i])) {
      return true;
    } else if (parseInt(curVerList[i]) > parseInt(svrVerList[i])) {
      return false;
    }
  }

  if (curVerList.length === 3 && svrVerList.length === 3) {
    //版本一致
    return false;
  } else if (curVerList.length < 3 || svrVerList.length < 3) {
    // 版本号长度小于3， 为非正常版本号，不需要更新
    return false;
  } else {
    if (svrVerList.length === 3) {
      //本地版本号长度大于3， 不需要更新, eg: 1.0.0.1(本地) > 1.0.0 (服务器)
      return false;
    } else if (curVerList.length === 3) {
      //服务器版本号长度大于3， 需要更新 , eg: 1.0.0(本地) < 1.0.0.2 (服务器)
      return true;
    } else {
      //本地和服务器版本号长度都大于3， 不符合目前版本号格式，不需要更新
      // eg: 1.0.0.1(本地) 与 1.0.0.2 (服务器)，
      // eg: 1.0.0.PS2(本地) 与 1.0.0.2 (服务器)，
      return false;
    }
  }
}
