import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { APPLY_AUDIT,QUERY_AUDIT } from '../../../providers/API_MARCO';
import { Toast } from '../../../providers';
import config from '../../../config/config';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the IdentityAuditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  segment:"identity-audit"
})
@Component({
  selector: 'page-identity-audit',
  templateUrl: 'identity-audit.html',
})
export class IdentityAuditPage {

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: false,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    targetWidth: 275,
    targetHeight:275
  };
  public cardIDImg:string = '';
  public userName:string ='';
  public cardID:string = '';
  showFooter:boolean = true;
  private api:any;
  private readonly imgApi: string = config.imgAPI;
  private cardIdURl: string;
  private currentAuditCode: string;
  private code ={
    unSubmit:"0",
    aduiting:"1",
    pass:"2",
    failture:"3"
  };
  public allowSubmitted = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private  camera: Camera,
              public actionSheetCtrl: ActionSheetController,private events:Events,@Inject('ApiService') api,
              private transfer: FileTransfer,private toast:Toast) {
    this.api = api;
    this.currentAuditCode = this.navParams.get('status');
    if(this.currentAuditCode !== this.code.unSubmit){
      this.getAuditInfo();
    }
    if(this.currentAuditCode === this.code.aduiting){
      this.allowSubmitted = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentityAuditPage');
  }
  ionViewWillLeave() {
    this.showFooter = false;
  }

  public submit () {
    //this.navCtrl.push('AuditStatePage');
    if( this.cardIdURl === "" || this.cardID === "" || this.userName === "") {
      this.toast.show("请完善信息");
      return;
    }
    let param = {
      picPath:this.cardIdURl, // 图片路径
      tjsfzh: this.cardID, // 身份证号码
      tjxm: this.userName // 姓名
    };
    this.api.httpByUser(APPLY_AUDIT,param).then(res => {
      this.toast.show(res.message);
      if(res.code !== '0') {
        return;
      }
      this.events.publish('updateUserCenter',true);
      this.navCtrl.pop();
    }, err => {
      console.info(err);
    })
  }

  private getAuditInfo(){
    this.api.httpByUser(QUERY_AUDIT,{}).then(res => {
      console.info(res);
      this.cardID = res.datas.idcard;
      this.userName = res.datas.name;
      this.cardIDImg = res.datas.picture;// for show
      this.cardIdURl = res.datas.picture;// for save in server
    }, err => {
      console.info(err);
    })
  }

  // 上传图片
  public pickPicForLib () {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.getPicture();
  }

  public pickPicForCamera () {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    this.getPicture();
  }

  private getPicture () {
    this.camera.getPicture(this.options).then((imageUrl) => {
      this.cardIDImg = imageUrl;
      alert(this.cardIDImg);
      console.info(this.cardIDImg);
      this.getFileEntry(imageUrl);
    }, (err) => {
      console.info(err);
    })
  }

  public presentPicActionSheet() {
    if(!this.allowSubmitted){
      return;
    }
    let actionSheet = this.actionSheetCtrl.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '从相册选择图片',
          role: 'destructive',
          handler: () => {
            console.log('pick picture from lib clicked');
            this.pickPicForLib();
          }
        },{
          text: '拍照',
          handler: () => {
            console.log('pick picture from camera clicked');
            this.pickPicForCamera();
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private getFileEntry(imgUrl) {
    var self = this;
    window['resolveLocalFileSystemURL'](imgUrl, function success(fileEntry) {
      // Do something with the FileEntry object, like write to it, upload it, etc.
      // writeFile(fileEntry, imgUri);
      self.upload(fileEntry.toURL());
    });
  }

  private upload(fileURL) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let self = this;
    let params = {
      bussinessType:'idAudit'
    };

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: fileURL.substr(fileURL.lastIndexOf('/') + 1),
      mimeType: 'image/jpeg',
      params: params
    };
    fileTransfer.upload(fileURL, encodeURI(this.imgApi), options)
    .then((res) => {
      console.info("upload success"+JSON.stringify(res));
      // alert("upload success"+JSON.stringify(res));
      let result = JSON.parse(res.response);
      self.cardIdURl = result.data;
      // success
    }, (err) => {
      // error
      console.info("upload err"+JSON.stringify(err));
      alert("upload err"+JSON.stringify(err));
    })
  }

}
