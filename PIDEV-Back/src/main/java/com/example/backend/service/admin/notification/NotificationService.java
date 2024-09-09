package com.example.backend.service.admin.notification;


import com.example.backend.Repository.fcmTokenRepository;
import com.example.backend.dto.PushNotificationRequest;
import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
@Service
@Slf4j
@AllArgsConstructor

public class NotificationService {

    private final FirebaseApp firebaseApp;

    @Autowired
    private fcmTokenRepository fcm;

    /*

    @PostConstruct
    public void sendNotificationToDevice() throws FirebaseMessagingException, ExecutionException, InterruptedException {
      //  List<fcmToken> tokenList = fcm.findAll();


      //  for (fcmToken token : tokenList) {
            PushNotificationRequest request = new PushNotificationRequest();
            request.setTitle("New Auction");
            request.setBody("aa");
            request.setDeviceToken("eo9EYGEN2QGeV9JIYmuQih:APA91bGlebh5oRYyEg2xLYbPG_oSFE-zU52sItEioglUruUfo_ZztMquYLpmM1NVRDP1RO5uKWyzxbWV_M2ZMPJBMMTSQNWrFcmKQaWJMcNmxwHl9L_VIP06HT4mDqtU_2UAMOrenXRs");
           // request.setData();

            sendMessage(request);
      //  }
    }

    public void sendMessage(PushNotificationRequest request) throws FirebaseMessagingException, ExecutionException, InterruptedException {
        Message fcmMessage = Message.builder()
                .setToken(request.getDeviceToken())
                .setNotification(
                        Notification.builder()
                                .setTitle(request.getTitle())
                                .setBody(request.getBody())
                                .build()
                )
                .putAllData(request.getData())
                .build();

        String response = FirebaseMessaging.getInstance(firebaseApp).sendAsync(fcmMessage).get();
        log.info("sendNotificationToDevice response: {}", response);
    }
*/
    public void sendNotificationToDevice(PushNotificationRequest request) throws FirebaseMessagingException, ExecutionException, InterruptedException {
        Message fcmMessage = Message.builder()
                .setToken(request.getDeviceToken())
                .setNotification(
                        Notification.builder()
                                .setTitle(request.getTitle())
                                .setBody(request.getBody())
                                .setImage(request.getImageUrl())
                                .build()
                )
                .putAllData(request.getData())
                .build();

        String response = FirebaseMessaging.getInstance(firebaseApp).sendAsync(fcmMessage).get();
        log.info("sendNotificationToDevice response: {}", response);
    }




    private List<String> getAllDeviceTokens() {
        // Implement logic to retrieve all device tokens from your database or storage
        // Return a list of device tokens
        return new ArrayList<>();
    }

    private AndroidConfig getAndroidConfig(String topic) {
        return AndroidConfig.builder()
                .setTtl(Duration.ofMinutes(2).toMillis()).setCollapseKey(topic)
                .setPriority(AndroidConfig.Priority.HIGH)
                .setNotification(AndroidNotification.builder().setSound("default")
                        .setColor("#FFFF00").setTag(topic).build()).build();
    }

    private ApnsConfig getApnsConfig(String topic) {
        return ApnsConfig.builder()
                .setAps(Aps.builder().setCategory(topic).setThreadId(topic).build()).build();
    }


}
