package com.example.backend.service.Reclamation;

import com.example.backend.dto.ReclamationDto;
import com.example.backend.model.Reclamation;

import java.util.List;
import java.util.Optional;

public interface IReclamationService {

    Reclamation addItem(Reclamation itemsDto , String user_id) ;
    public List<ReclamationDto> getAllItems();
    public boolean deleterec(Long id);
    public ReclamationDto updaterec(Reclamation reclamationDto);
    public Optional<Reclamation> getItemById(Long id);




}
