import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Events} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { APPLY_AUDIT } from '../../../providers/API_MARCO';


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
  public imgUrl:string = '';
  public userName:string ='';
  public cardID:string = '';
  showFooter:boolean = true;
  private api:any;
  private base64Data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private  camera: Camera,
              public actionSheetCtrl: ActionSheetController,private events:Events,@Inject('ApiService') api,
              private transfer: FileTransfer) {
    this.api = api;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentityAuditPage');
  }
  ionViewWillLeave() {
    this.showFooter = false;
  }

  public submit () {
    //this.navCtrl.push('AuditStatePage');
    let param = {
      sctp:this.base64Data,
      tjsfzh: this.cardID,
      tjxm: this.userName
    };
    this.api.httpByUser(APPLY_AUDIT,param).then(res => {
      console.info(res);
      this.navCtrl.pop();
      this.events.publish('updateUserCenter',true);
    }, err => {
      console.info(err);
    })
  }

  public pickPicForLib () {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.getPicture();
  }

  public pickPicForCamera () {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    this.getPicture();
  }

  private getPicture () {
/*    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,'+imageData;
      this.base64Data = imageData;
      this.imgUrl = base64Image;
    }, (err) => {
      console.info(err);
    })*/
    this.camera.getPicture(this.options).then((imageUrl) => {
      this.imgUrl = imageUrl;
      alert(this.imgUrl);
      this.getFileEntry(imageUrl);
      //window.resolveLocalFileSystemURL
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
   // alert(window['resolveLocalFileSystemURL']);
    window['resolveLocalFileSystemURL'](imgUrl, function success(fileEntry) {

      // Do something with the FileEntry object, like write to it, upload it, etc.
      // writeFile(fileEntry, imgUri);
      console.log("got file: " + fileEntry.fullPath);
      console.log("got file toInternalURL: " + fileEntry.toInternalURL());
      alert(fileEntry.fullPath);
      alert(fileEntry.toURL());

      self.upload(fileEntry.toURL());
      //alert(fileEntry.fullPath);
      // displayFileData(fileEntry.nativeURL, "Native URL");

    }, function () {
      // If don't get the FileEntry (which may happen when testing
      // on some emulators), copy to a new FileEntry.
     // this.createNewFileEntry(imgUri);
    });
  }

  private createNewFileEntry(imgUri) {
/*    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

      // JPEG file
      dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {

        // Do something with it, like write to it, upload it, etc.
        // writeFile(fileEntry, imgUri);
        console.log("got file: " + fileEntry.fullPath);
        // displayFileData(fileEntry.fullPath, "File copied to");

      }, onErrorCreateFile);

    }, onErrorResolveUrl);*/
  }

  private upload(fileURL) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let params = {};
    params['bussinessType'] = 'idAudit';
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: fileURL.substr(fileURL.lastIndexOf('/') + 1),
      mimeType: 'image/jpeg',
      params: params
    };
    alert("upload");

      fileTransfer.upload(fileURL, encodeURI('http://121.196.194.174:8086/hostel-app-war/app/appUploadImg'), options)
      .then((data) => {
        console.info(data);
        //alert(data);
        alert("upload success"+JSON.stringify(data));
        // success
      }, (err) => {
        // error
        console.info(err);
        alert("upload err"+JSON.stringify(err));
       //alert(err);
      })
  }

}
