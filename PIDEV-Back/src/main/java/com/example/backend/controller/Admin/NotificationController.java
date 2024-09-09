package com.example.backend.controller.Admin;


import com.example.backend.dto.PushNotificationRequest;
import com.example.backend.service.admin.Token.TokenService;
import com.example.backend.service.admin.notification.NotificationService;
import com.google.firebase.messaging.FirebaseMessagingException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/v1/notifications")
@AllArgsConstructor
public class NotificationController {

    @Autowired
    TokenService tokenService;


    private final NotificationService notificationService;


    @PostMapping("/send-to-device")
    public ResponseEntity<String> sendNotification(@RequestBody PushNotificationRequest request) {
        try {
            notificationService.sendNotificationToDevice(request);
            return ResponseEntity.ok("Notification sent successfully.");
        } catch (FirebaseMessagingException | ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send notification.");
        }
    }
    @PostMapping("/addToken/{token}")
    public void addToken(@PathVariable String token){

    tokenService.addToken(token);

}





}
