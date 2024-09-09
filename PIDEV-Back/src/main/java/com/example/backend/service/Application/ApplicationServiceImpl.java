package com.example.backend.service.Application;

import com.example.backend.Enum.Status;
import com.example.backend.Repository.ApplicationRepository;
import com.example.backend.Repository.OffreRepository;
import com.example.backend.Repository.UserRepository;
import com.example.backend.model.Application;
import com.example.backend.model.Offre;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import java.util.Date;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {
    ApplicationRepository applicationRepository;
    OffreRepository offerRepository;
    UserRepository userRepository;


    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public Application getApplicationByCode(Long code) {
        return applicationRepository.findById(code).get();
    }




    @Override
    public Application addApplication(Application application, String user_id , Long offer_id) {
       Offre offre = offerRepository.findById(offer_id).get();
        application.setOffre(offre);
        application.setStatus(Status.SUBMITTED);
        application.setUser_id(user_id);
        application.setDate(new Date());

        return applicationRepository.save(application);
    }

    @Override
    public Application updateApplication(Application application) {
        Offre offer = offerRepository.findById(1L).get();
        //application.setOffer(offer);
        application.setDate(new Date());
        return applicationRepository.save(application);
    }

    @Override
    public void cancelApplication(Long appCode) {
        applicationRepository.deleteById(appCode);
    }

}
