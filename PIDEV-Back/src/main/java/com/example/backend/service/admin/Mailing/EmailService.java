package com.example.backend.service.admin.Mailing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    Date date = new Date();

    // Formatter la date selon votre format préféré (par exemple, "dd/MM/yyyy HH:mm:ss")
    SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    String formattedDate = formatter.format(date);

    public void sendReservationEmail(String email, Long reservationId, Long standId, Double price) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Confirmation de réservation");
        message.setText("Date : " + formattedDate + "\n\n"
                +"Bonjour ,\n\n"
                + "Nous vous remercions de votre réservation de stand pour notre forum  . Nous sommes ravis de vous accueillir en tant qu'exposant à notre événement.\n\n"
                + "Voici les détails de votre réservation :\n"
                + "ID de Réservation : " + reservationId + "\n"
                + "numero  du Stand : " + standId + "\n"
                + "Prix à Payer : " + price + " TND \n\n"
                + "Options de Paiement :\n"
                + "1. Versement d'espèces en Banque : Cette opération pourrait être effectuée auprès de toutes les agences AMEN BANK .\n"
                + "2. Paiement par chèque bancaire ou postal : à déposer auprès du service financier de l'école. Veuillez indiquer votre numero fiscale et votre id de reservation au dos du chèque.\n\n"
                + "Nous vous prions de bien vouloir effectuer le paiement avant la date limite de [Date Limite de Paiement] afin de garantir votre réservation de stand.\n\n"
                + "Cordialement,\n"
                + "[ESPRIT ]\n"
                + "");

        javaMailSender.send(message);
    }
}
