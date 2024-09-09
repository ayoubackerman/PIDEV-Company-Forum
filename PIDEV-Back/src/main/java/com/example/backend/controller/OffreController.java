package com.example.backend.controller;

import com.example.backend.model.Offre;
import com.example.backend.model.SearchHistory;
import com.example.backend.service.Exception.OffreNotFoundException;
import com.example.backend.service.Offre.OffreServiceImpl;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@AllArgsConstructor
@RequestMapping("/Offer")
public class OffreController {
    private static final Logger logger = LoggerFactory.getLogger(OffreController.class); // Instantiate logger

    @Autowired
    private OffreServiceImpl offreService;

    @Autowired
    private OffreServiceImpl serviceOffre;

   /* @PostMapping("/addOffre")
    public ResponseEntity<Offre> addOffre(@RequestBody Offre offre) {
        // Ensure that the favorite field is always set to false
        offre.setFavorite(false);
        Offre addedOffre = offreService.addOffre(offre);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedOffre);
    }*/

    @PostMapping("/addOffre/{user_id}")
    public ResponseEntity<Offre> addOffre(@RequestBody Offre offre, @PathVariable("user_id") String userId) {
        // Ensure that the favorite field is always set to false
        offre.setFavorite(false);
        Offre addedOffre = offreService.addOffre(offre,userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedOffre);
    }

    @PutMapping("/updateOffreAsNotFavorite")
    public Offre updateOffreAsNotFavorite(@RequestBody Offre offre) {
        return offreService.updateOffreAsNotFavorite(offre);
    }

    @GetMapping("/getAll")
    public List<Offre> getOffres() {
        return offreService.listAll();
    }

    @PutMapping("/offres/{reference}")
    public Offre updateOffre(@PathVariable Long reference, @RequestBody Offre offre) {
        return offreService.updateOffre(reference, offre);
    }

    @DeleteMapping("/delete/{reference}")
    public ResponseEntity<Void> deleteOffre(@PathVariable Long reference) {
        boolean deleted = serviceOffre.deleteOffre(reference);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/offres/{reference}")
    public Offre getOffreById(@PathVariable Long reference) {
        return offreService.getOffreByReference(reference);
    }

    @PutMapping("/offres/{reference}/favorite")
    public ResponseEntity<Offre> toggleFavoriteStatus(@PathVariable Long reference, @RequestParam boolean favoriteStatus) {
        Offre updatedOffre = offreService.toggleFavorite(reference, favoriteStatus);
        return ResponseEntity.ok(updatedOffre);
    }




    @GetMapping("/offres/{reference}/elapsedTime")
    public ResponseEntity<Map<String, String>> getElapsedTimeSincePublication(@PathVariable Long reference) {
        try {
            String elapsedTime = offreService.calculateElapsedTimeSincePublication(reference);
            Map<String, String> responseBody = new HashMap<>();
            responseBody.put("elapsedTime", elapsedTime);
            return ResponseEntity.ok(responseBody);
        } catch (OffreNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/offres/{reference}/rate")
    public ResponseEntity<Offre> rateOffre(@PathVariable Long reference, @RequestBody Map<String, Integer> requestBody) {
        int rating = requestBody.get("rating");
        Offre ratedOffre = offreService.rateOffre(reference, rating);
        return ResponseEntity.ok(ratedOffre);
    }

    @GetMapping("/offres/{reference}/similar")
    public ResponseEntity<List<Offre>> getSimilarOffers(@PathVariable Long reference) {
        try {
            List<Offre> similarOffers = offreService.getSimilarOffers(reference);
            if (!similarOffers.isEmpty()) {
                return ResponseEntity.ok(similarOffers);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (OffreNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/offres/search")
    public ResponseEntity<List<Offre>> searchOffresByTitle(@RequestParam String keyword) {
        List<Offre> offres = offreService.searchOffresByTitle(keyword);
        if (!offres.isEmpty()) {
            return ResponseEntity.ok(offres);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/search-history/add")
    public ResponseEntity<SearchHistory> addSearchHistory(@RequestBody Map<String, Long> requestBody) {
        Long keyword = requestBody.get("keyword");
        SearchHistory history = offreService.addSearchHistory(keyword);
        return ResponseEntity.ok(history);
    }


    @GetMapping("/search-history/all")
    public ResponseEntity<List<SearchHistory>> getAllSearchHistory() {
        List<SearchHistory> historyList = offreService.getAllSearchHistory();
        return ResponseEntity.ok(historyList);
    }

    @DeleteMapping("/search-history/delete")
    public ResponseEntity<Void> deleteSearchHistoryItem(@RequestBody Map<String, Long> requestBody) {
        Long keyword = requestBody.get("keyword");
        try {
            offreService.deleteOffre(keyword);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting search history item:", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    @DeleteMapping("/search-history/clear")
    public ResponseEntity<Void> clearAllSearchHistory() {
        offreService.deleteAllSearchHistory();
        return ResponseEntity.noContent().build();
    }

}
