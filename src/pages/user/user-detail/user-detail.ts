import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { PERSON_INFO, UPDATE_HEAD_ICON } from '../../../providers/API_MARCO';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Toast } from '../../../providers';
import config from '../../../config/config';

/**
 * Generated class for the UserDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  segment:"user-detail"
})
@Component({
  selector: 'page-user-detail',
  templateUrl: './user-detail.html',
})
export class UserDetailPage {
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: false,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    targetWidth: 48,
    targetHeight:48
  };
  private api:any;
  public photoUrl:string;
  public userName: string;
  public cardID:string;
  public telNo: string;
  public showHeader = true;
  private readonly imgApi: string = config.imgAPI;
  constructor(public navCtrl: NavController, public navParams: NavParams,private  camera: Camera,
              public actionSheetCtrl: ActionSheetController,@Inject('ApiService') api,
              private transfer: FileTransfer,private toast:Toast) {
    this.api = api;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailPage');
    this.getPersonInfo();
  }

  ionViewWillEnter() {
    console.log('ionViewWillenter');
    this.showHeader = true;
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    this.showHeader = false;
  }

  public updateHeadIcon (){
    console.info("update icon");
    // let img = "／normal//20170724225507579.png";
    // this.updateIconToServer(img);
     this.presentPicActionSheet();
  }

  private getPersonInfo () {
    this.api.httpByUser(PERSON_INFO,{}).then( res => {
      let userInfo = res.datas;
      try{
        this.photoUrl = userInfo.wdtx || './assets/img/default_avatar.png';
        this.userName = userInfo.xm;
        this.telNo = userInfo.lxfs;
        this.cardID = userInfo.sfzh;
      }catch (err){
        console.info(err);
      }
    },err => {
      console.info(err);
    });
  }

  private updateIconToServer(imgUrl) {
    let param = {
      headIcon:imgUrl
    };
    window.alert(JSON.stringify(param));
    this.api.httpByUser(UPDATE_HEAD_ICON,param).then( res => {
        this.toast.show(res.message);
    },err => {
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
      this.photoUrl = imageUrl;
      this.getFileEntry(imageUrl);
    }, (err) => {
      console.info(err);
    })
  }

  public presentPicActionSheet() {
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
      self.upload(fileEntry.toURL());
    });
  }

  private upload(fileURL) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let self = this;
    let params = {
      bussinessType:'portrait'
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
        self.updateIconToServer(result.data);
        // success
      }, (err) => {
        // error
        console.info("upload err"+JSON.stringify(err));
        alert("upload err"+JSON.stringify(err));
      })
  }

}
