package com.example.backend.service.Reclamation;

import com.example.backend.Repository.Reclamation.ReclamationRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.dto.ReclamationDto;
import com.example.backend.model.Reclamation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Component
public class ReclamationService implements IReclamationService {

    private final ReclamationRepository reclamationRepository;
    private final UserRepository userRepository;


    @Override
    public Reclamation addItem(Reclamation reclamationDto, String user_id) {
        // Optional<User> userOptional = userRepository.findById(iduser);
        // if (userOptional.isPresent()) {
        //   User user = userOptional.get();

        //   if (user.getNumberOfReclamations() == 0) {
        //       throw new RuntimeException("User cannot add more reclamations as they already have zero reclamations");
        //    }



reclamationDto.setUser_id(user_id);

        // Update the user's number of reclamations
        // user.setNumberOfReclamations(user.getNumberOfReclamations() - 1);
        //  userRepository.save(user);

        return reclamationRepository.save(reclamationDto);
    }// else {
    // throw new RuntimeException("User not found with id: " + iduser);
    // }
    //  }


    @Override
    public List<ReclamationDto> getAllItems() {
        List<Reclamation> products = reclamationRepository.findAll();
        return products.stream().map(Reclamation::getDto).collect(Collectors.toList());
    }


    @Override
    public boolean deleterec(Long id) {
        Optional<Reclamation> optionalReclamation = reclamationRepository.findById(id);
        if (optionalReclamation.isPresent()) {
            reclamationRepository.delete(optionalReclamation.get());
            return true;
        }
        return false;
    }


    @Override
    public ReclamationDto updaterec(Reclamation reclamationDto) {
        if (reclamationDto.getCodeReclamation() == null) {
            return null;
        }
        Optional<Reclamation> optionalReclamation = reclamationRepository.findById(reclamationDto.getCodeReclamation());
        if (optionalReclamation.isPresent()) {
            Reclamation rec = optionalReclamation.get();
            // You don't need to set the codeReclamation again since it remains unchanged
            // rec.setCodeReclamation(reclamationDto.getCodeReclamation());
            rec.setDescription(reclamationDto.getDescription());
            rec.setStatus(reclamationDto.getStatus());
            rec.setType(reclamationDto.getType());
            rec.setDate(reclamationDto.getDate());
            return reclamationRepository.save(rec).getDto();
        }
        return null;
    }

    public Optional<Reclamation> getItemById(Long id) {
        Optional<Reclamation> reclamation = reclamationRepository.findById(id);
        return reclamation; // Convert entity to DTO
    }


    private ReclamationDto convertToDto(Reclamation reclamation) {
        ReclamationDto reclamationDto = new ReclamationDto();
        // Map fields from Reclamation entity to ReclamationDto
        reclamationDto.setDescription(reclamation.getDescription());
        reclamationDto.setStatus(reclamation.getStatus());
        //reclamationDto.setDate(reclamation.getDate());
        reclamationDto.setType(reclamation.getType());
        // Map other fields as needed

        return reclamationDto;
    }


}

