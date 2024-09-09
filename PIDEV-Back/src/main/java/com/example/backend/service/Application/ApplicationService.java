package com.example.backend.service.Application;

import com.example.backend.model.Application;

import java.util.List;

public interface ApplicationService {



    Application addApplication(Application application, String user_id, Long offer_id);

    Application updateApplication(Application application);

    void cancelApplication(Long appCode);


    List<Application> getAllApplications();

    Application getApplicationByCode(Long code);
}
