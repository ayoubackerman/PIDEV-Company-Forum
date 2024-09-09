import { Component } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {
  async ngAfterViewInit(): Promise<void> {
    const { ZoomMtg } = await import('@zoomus/websdk');

    ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    let payload = {
      meetingNumber: '89709131113',
      passWord: '1WAe3y',
      sdkKey: 'UeP6HEcUSRO2kjr7Wm_T8A',
      sdkSecret: 'xRMSPKFeqjKc18oZr4kzhIfxIgh4fT4f',
      userName: 'Welcome ',
      userEmail: '',
      role: '0',
      leaveUrl: 'http://localhost:4200'
    };

    ZoomMtg.generateSDKSignature({
      meetingNumber: payload.meetingNumber,
      role: payload.role,
      sdkKey: payload.sdkKey,
      sdkSecret: payload.sdkSecret,
      success: function (res: any) {
        ZoomMtg.init({
          leaveUrl: payload.leaveUrl,
          success: function (initRes: any) {
            ZoomMtg.join({
              meetingNumber: payload.meetingNumber,
              passWord: payload.passWord,
              userName: payload.userName,
              signature: res.result,
              sdkKey: payload.sdkKey,
              userEmail: payload.userEmail,
              success: function (joinRes: any) {
                console.log(joinRes);
              },
              error: function (joinError: any) {
                console.log('--Error Join -->', joinError);
              }
            });
          },
          error: function (initError: any) {
            console.log('--Error Init -->', initError);
          }
        });
      },
      error: function (error: any) {
        console.log(error);
      }
    });
  }

}
