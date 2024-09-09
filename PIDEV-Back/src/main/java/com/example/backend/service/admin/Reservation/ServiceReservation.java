package com.example.backend.service.admin.Reservation;

import com.example.backend.Repository.PackRepository;
import com.example.backend.Repository.ReservationRepository;
import com.example.backend.Repository.SessionRepository;
import com.example.backend.Repository.StandRepository;
import com.example.backend.dto.ReservationDto;
import com.example.backend.model.Pack;
import com.example.backend.model.Reservation;
import com.example.backend.model.Session;
import com.example.backend.model.Stand;
import com.example.backend.service.admin.Mailing.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Slf4j
@Service
public class ServiceReservation implements  IServiceReservation{
    @Autowired
    ReservationRepository reservationRepository ;
    @Autowired
    PackRepository packRepo ;
    @Autowired
    StandRepository standRepository;

    @Autowired
    SessionRepository sessionRepository;
    @Autowired
    EmailService emailService ;
    private Long id = 1L;

    @Override
    public ReservationDto addReservation(ReservationDto reservationDto) throws IOException {
        Reservation reservation = new Reservation();

        // Récupération du Pack en fonction du type de Pack
        Pack pack = packRepo.findById(reservationDto.getPack()).get();
        reservation.setPack(pack);

        // Récupération du Stand en fonction du numéro de Stand
        Stand stand = standRepository.findById(reservationDto.getStandNum()).get();
        reservation.setStand(stand);

        reservation.setExposant(reservation.getExposant());
        reservation.setEmail(reservation.getEmail());
        // Vérification et gestion de la valeur du prix du Pack
        Double prixStand=stand.getPrice();
        Double prixPack=pack.getPricePack();

        if (prixStand != null && prixPack!=null) {
            reservation.setPrice(prixStand+prixPack);
        } else {
            // Gérer le cas où le prix du Pack est null, par exemple en affectant une valeur par défaut
            reservation.setPrice(0.0); // Ou tout autre logique de gestion
        }


        // Récupération de la Session en fonction de l'emplacement de la session
        Session session = sessionRepository.findById(reservationDto.getSessionId()).get();
        reservation.setSession(session);

        // Enregistrement de la réservation
        Reservation savedReservation = reservationRepository.save(reservation);

        log.info("gmail"+reservationDto.getEmail());
        emailService.sendReservationEmail(reservationDto.getEmail(), savedReservation.getId(), savedReservation.getStand().getId(), savedReservation.getPrice());
        return savedReservation.getDto();
    }


    @Override
    public List<ReservationDto> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        return reservations.stream().map(Reservation::getDto).collect(Collectors.toList());     }

    @Override
    public boolean deleteReservation(Long id) {
        Optional<Reservation> optionalReservation= reservationRepository.findById(id);
        if(optionalReservation.isPresent()){
            reservationRepository.deleteById(id);
            return true;
        }else {
            return false;
        }       }

    public ReservationDto updateDto(Long id , ReservationDto reservationDto) throws IOException {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent() ){
            Reservation reservation = optionalReservation.get();
            Pack pack = packRepo.findById(reservationDto.getPack()).get();
            reservation.setPack(pack);
            Stand stand = standRepository.findById(reservationDto.getStandNum()).get();
            reservation.setStand(stand);
            reservation.setExposant(reservation.getExposant());
            reservation.setEmail(reservation.getEmail());

            // Vérification et gestion de la valeur du prix du Pack
            Double prixStand=stand.getPrice();
            Double prixPack=pack.getPricePack();

            if (prixStand != null && prixPack!=null) {
                reservation.setPrice(prixStand+prixPack);
            } else {
                // Gérer le cas où le prix du Pack est null, par exemple en affectant une valeur par défaut
                reservation.setPrice(0.0); // Ou tout autre logique de gestion
            }


            // Récupération de la Session en fonction de l'emplacement de la session
            Session session = sessionRepository.findById(reservationDto.getSessionId()).get();
            reservation.setSession(session);

            return reservationRepository.save(reservation).getDto();
        }else {
            return null;
        }
    }

    public ReservationDto GetReservationById(Long id){
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if(optionalReservation.isPresent()){
            return  optionalReservation.get().getDto();
        }else{ return null ;
    } }
}
