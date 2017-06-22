import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: false,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    targetWidth: 275,
    targetHeight:275
  };
  public imgUrl:string = '';
  showFooter:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private  camera: Camera, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IdentityAuditPage');
  }
  ionViewWillLeave() {
    this.showFooter = false;
  }

  public submit () {
    this.navCtrl.push('AuditStatePage');
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
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,'+imageData;
      console.info(base64Image);
      this.imgUrl = base64Image;
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

}
