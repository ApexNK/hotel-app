/**
 * Created by andyhuang on 2017/6/4.
 */

const isDev: boolean = false;
const devUrl: string = 'http://wkzj.tunnel.echomod.cn/hostel-app-war/app/serviceApi';
const proUrl: string = 'http://121.196.194.174/hostel-app-war/app/serviceApi';
const imgServerUrl: string = 'http://121.196.194.174:8086/'; // 读取图片路径
const imgAPI = 'http://121.196.194.174/hostel-app-war/app/appUploadImg';

export default {
  isDev: isDev,
  devUrl: devUrl,
  proUrl: proUrl,
  imgServerUrl: imgServerUrl,
  imgAPI: imgAPI
}
