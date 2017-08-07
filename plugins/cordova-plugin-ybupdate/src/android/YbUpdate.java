package com.youbang.plugins;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.NotificationCompat;

public class YbUpdate extends CordovaPlugin {
	
	public YbUpdate() {}
	
	private NotificationManager mNotificationManager;
	NotificationCompat.Builder mBuilder;
	Context context;
	CallbackContext mCallbackContext;
	DownloadApkThread downloadThread;
	private int notifyId = 666;
	private int progress = 0;
	private static String mSavePath = "";
	private static final int DOWNLOAD = 1;
	private String downLoadUrl = "";
	private boolean installNow = true;
	private static String clickAction = "Notification.Clicked";
	
	
	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		// TODO Auto-generated method stub
		super.initialize(cordova, webView);
		context = this.cordova.getActivity();
		mNotificationManager = (NotificationManager) context.getSystemService("notification");
		mBuilder = new NotificationCompat.Builder(context);
		PendingIntent pendingIntent= PendingIntent.getActivity(context, 1, new Intent(), 0);
		int resId = context.getResources().getIdentifier("icon", "drawable" , context.getPackageName());
		mBuilder.setWhen(System.currentTimeMillis())
		.setContentIntent(pendingIntent)
		.setPriority(Notification.PRIORITY_DEFAULT)
		.setOngoing(false)
		.setSound(null)
		.setVibrate(null)
		.setSmallIcon(resId);
	}

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
		mCallbackContext = callbackContext;
		
		if ("start".equals(action)) {
			if (args == null || args.length() != 1) {
				mCallbackContext.error("params is null");
				return false;
			}
			try {
				JSONObject params = args.optJSONObject(0);
				if (params.getString("downLoadUrl") == null) {
					mCallbackContext.error("downLoadUrl is null");
					return false;
				}
				downLoadUrl = params.getString("downLoadUrl");
				installNow = params.getBoolean("installNow");
				startDownloadNotify();
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				mCallbackContext.error("json error");
			}
		}
		
		return true;
	}
	
	private void startDownloadNotify() {
		if (downloadThread != null && downloadThread.isAlive()) {
			return;
		}
		downloadThread = new DownloadApkThread();
		downloadThread.start();
	}
	
	@SuppressLint("HandlerLeak") 
	private Handler mHandler = new Handler()
	{
		public void handleMessage(Message msg)
		{
			if (msg.what == DOWNLOAD) {
				if (progress < 100) {
					mBuilder.setContentTitle("下载中").setContentText("进度:" + progress + "%").setTicker("开始下载");
					mBuilder.setProgress(100, progress, false);
					mNotificationManager.notify(notifyId, mBuilder.build());
				} else {
					mHandler.removeMessages(DOWNLOAD);
					
					Intent intentClick = new Intent(context, NotificationBroadcastReceiver.class);
					intentClick.setAction(clickAction);
					intentClick.putExtra("id", notifyId);
					PendingIntent pendingIntentClick = PendingIntent.getBroadcast(context, 0, intentClick, PendingIntent.FLAG_ONE_SHOT);
					mBuilder.setContentText("下载完成").setTicker("下载完成").setProgress(0, 0, false).setAutoCancel(true).setContentIntent(pendingIntentClick);
					mNotificationManager.notify(notifyId, mBuilder.build());
					
					if (installNow) {
						installApk(context);
					}
					
					mCallbackContext.success();
				}
			}
		};
	};
	
	class DownloadApkThread extends Thread {
		@Override
		public void run() {
			// TODO Auto-generated method stub
			try {
				if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
					String sdpath = Environment.getExternalStorageDirectory() + "/";
					mSavePath = sdpath + "download";
					URL url = new URL(downLoadUrl);
					HttpURLConnection conn = (HttpURLConnection) url.openConnection();
					conn.connect();
					int length = conn.getContentLength();
					InputStream is = conn.getInputStream();
					File file = new File(mSavePath);
					if (!file.exists())
					{
						file.mkdir();
					}
					File apkFile = new File(mSavePath, "hawk");
					if (apkFile.exists()) {
						apkFile.delete();
					}
					FileOutputStream fos = new FileOutputStream(apkFile);
					int count = 0;
					byte buf[] = new byte[1024];
					int numread = 0;
					int preProgress = 0;
					while ((numread = is.read(buf)) != -1) {
						fos.write(buf, 0, numread);
						count += numread;
						progress = (int) (((float) count / length) * 100);
						if (preProgress < progress && ((progress > 0 && progress < 10) || (progress > 90 && progress < 100) || progress % 5 == 0)) {
							mHandler.sendEmptyMessage(DOWNLOAD);
						}
						preProgress = progress;
					}
					fos.close();
					is.close();
				}
			} catch (MalformedURLException e) {
				// TODO: handle exception
				mBuilder.setContentTitle("下载失败").setProgress(0, 0, false).setAutoCancel(true);
				mNotificationManager.notify(notifyId, mBuilder.build());
				mCallbackContext.error("url is not right");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				mBuilder.setContentTitle("下载失败").setProgress(0, 0, false).setAutoCancel(true);
				mNotificationManager.notify(notifyId, mBuilder.build());
				mCallbackContext.error("IOException");
			}
		}
	}
	
	public static class NotificationBroadcastReceiver extends BroadcastReceiver {
		@Override
		public void onReceive(Context context, Intent intent) {
			// TODO Auto-generated method stub
			String action = intent.getAction();
			int id = intent.getIntExtra("id", -1);
			
			if (id == 666) {
				if (action.equals(clickAction)) {
					installApk(context);
		        }
			}
		}
	}
	
	private static void installApk(Context context) {
		File apkfile = new File(mSavePath, "hawk");
		if (!apkfile.exists()) {
			return;
		}
		Intent i = new Intent(Intent.ACTION_VIEW);
		i.setDataAndType(Uri.parse("file://" + apkfile.toString()), "application/vnd.android.package-archive");
		i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		context.startActivity(i);
	}

	@Override
	public void onDestroy() {
		// TODO Auto-generated method stub
		if (downloadThread != null && downloadThread.isAlive()) {
			downloadThread.interrupt();
			downloadThread = null;
		}
		mHandler.removeMessages(DOWNLOAD);
		mNotificationManager.cancel(notifyId);
	}
	
}
