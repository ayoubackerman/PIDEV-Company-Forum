package com.example.backend.controller;

import com.example.backend.model.Application;
import com.example.backend.service.Application.ApplicationServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/Application")
public class ApplicationController {
    ApplicationServiceImpl applicationService ;


    @PostMapping("/add/{user_id}/{offer_id}")
    public Application add(@RequestBody Application application, @PathVariable("user_id") String userId , @PathVariable("offer_id") Long offerId ){
        return applicationService.addApplication(application,userId,offerId);
    }

    /*@PostMapping("/add")
    public Application add(@RequestParam("application") String applicationStr,
                           @RequestParam(name = "cv", required = false) MultipartFile cv,
                           @RequestParam(name = "lettre", required = false) MultipartFile lettre) throws IOException {
        Application application = new ObjectMapper().readValue(applicationStr, Application.class);
        return applicationService.addApplication(application, cv, lettre);
    }
    @PostMapping("/add")
    public Application add(@RequestPart("application") String applicationStr,
                           @RequestPart(name = "cv", required = false) MultipartFile cv,
                           @RequestPart(name = "lettre", required = false) MultipartFile lettre) throws IOException {
        Application application = new ObjectMapper().readValue(applicationStr, Application.class);
        return applicationService.addApplication(application, cv, lettre);
    }*/



    @PostMapping("/updateApplication")
    public Application updateApplication(@RequestBody Application application)
    {
        return applicationService.updateApplication(application) ;
    }

    @DeleteMapping("/cancelApplication/{appCode}")
    public void cancelApplication(@PathVariable("appCode") Long appCode)
    {
        applicationService.cancelApplication(appCode);
    }

    @GetMapping("/allApplications")
    public List<Application> getAllApplications()
    {

        return applicationService.getAllApplications() ;
    }

    @GetMapping("/getApplicationByCode/{code}")
    public Application getApplicationByCode(@PathVariable("code") Long code) {
        return  applicationService.getApplicationByCode(code);
    }

}


