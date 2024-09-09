package com.example.backend.service.admin.Reservation;


import com.example.backend.dto.ReservationDto;

import java.io.IOException;
import java.util.List;

public interface IServiceReservation {
    public ReservationDto addReservation(ReservationDto reservationDto) throws IOException;

    public List<ReservationDto> getAllReservations();
    public boolean deleteReservation(Long id);
}
