package com.example.backend.service.Offre;

import com.example.backend.Repository.OffreRepository;
import com.example.backend.Repository.SearchHistoryRepository;
import com.example.backend.model.Offre;
import com.example.backend.model.SearchHistory;
import com.example.backend.service.Exception.OffreNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@AllArgsConstructor
@Service
public class OffreServiceImpl implements OffreService{

    @Autowired
    private OffreRepository offreRepository;

    @Autowired
    private SearchHistoryRepository searchHistoryRepository;
    private static final Logger logger = LoggerFactory.getLogger(OffreServiceImpl.class);

    /*public Offre addOffre(Offre offre ) {
        offre.setFavorite(false);
        offre.setPublicationDate(LocalDateTime.now());
       // offre.setUser_id(user_id);
        return offreRepository.save(offre);
    }*/

    public Offre addOffre(Offre offre , String user_id) {
        offre.setFavorite(false);
        offre.setPublicationDate(LocalDateTime.now());
         offre.setUser_id(user_id);
        return offreRepository.save(offre);
    }

    public Offre updateOffreAsNotFavorite(Offre offre) {
        offre.setFavorite(false);
        return offreRepository.save(offre);
    }

    public List<Offre> listAll() {
        List<Offre> allOffres = offreRepository.findAll();
        // Sort the offers by rating in ordre croissant
        allOffres.sort((o1, o2) -> o2.getRating() - o1.getRating());
        return allOffres;
    }


    public Offre updateOffre(Long reference, Offre offre) {
        // Find the existing offer by reference
        Optional<Offre> existingOffreOptional = Optional.ofNullable(offreRepository.findByReference(reference));

        if (existingOffreOptional.isPresent()) {
            Offre existingOffre = existingOffreOptional.get();
            // Update fields of existing Offre with the new values
            existingOffre.setTitle(offre.getTitle());
            existingOffre.setLocation(offre.getLocation());
            existingOffre.setDescription(offre.getDescription());
            existingOffre.setDeadline(offre.getDeadline());
            existingOffre.setContratType(offre.getContratType());
            existingOffre.setSkills(offre.getSkills());
            existingOffre.setExperienceLevel(offre.getExperienceLevel());

            // Update publication date to modification time
            existingOffre.setPublicationDate(LocalDateTime.now());

            // Save the updated Offre
            return offreRepository.save(existingOffre);
        } else {
            throw new OffreNotFoundException("Offre not found with reference: " + reference);
        }
    }


    public boolean deleteOffre(Long reference) {
        try {
            offreRepository.deleteById(reference);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public Offre getOffreByReference(Long reference) {
        // Find the Offre by its ID
        Optional<Offre> offreOptional = offreRepository.findById(reference);

        // Check if the Offre exists
        if (offreOptional.isPresent()) {
            return offreOptional.get();
        } else {
            throw new OffreNotFoundException("Offre not found with ID: " + reference);
        }
    }

    public Offre toggleFavorite(Long reference, boolean favoriteStatus) {
        Offre existingOffre = offreRepository.findByReference(reference);
        if (existingOffre != null) {
            existingOffre.setFavorite(favoriteStatus);
            return offreRepository.save(existingOffre);
        } else {
            throw new OffreNotFoundException("Offre not found with reference: " + reference);
        }
    }

    public String calculateElapsedTimeSincePublication(Long reference) {
        Offre offre = getOffreByReference(reference);
        LocalDateTime publicationDate = offre.getPublicationDate();
        LocalDateTime currentTime = LocalDateTime.now();
        Duration duration = Duration.between(publicationDate, currentTime);
        long days = duration.toDays();
        long hours = duration.toHours() % 24;
        long minutes = duration.toMinutes() % 60;
        long seconds = duration.getSeconds() % 60;
        return String.format("%d days, %d hours, %d minutes, and %d seconds", days, hours, minutes, seconds);
    }


    public Offre rateOffre(Long reference, int rating) {
        Offre offre = getOffreByReference(reference);

        // Check if rating is within range 1-5
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating should be between 1 and 5.");
        }

        // Add the new rating to the list of ratings
        offre.getRatings().add(rating);

        // Calculate the new average rating and update it
        double averageRating = offre.getRatings().stream()
                .mapToInt(Integer::intValue)
                .average().orElse(0.0);
        int roundedAverageRating = (int) Math.round(averageRating);
        offre.setRating(roundedAverageRating);

        // Update the rating in the database
        offreRepository.save(offre);

        return offre;
    }
    public List<Offre> getSimilarOffers(Long reference) {
        Offre offre = getOffreByReference(reference);
        String skills = offre.getSkills().toLowerCase();
        String title = offre.getTitle().toLowerCase();

        // Liste pour stocker les offres similaires
        List<Offre> similarOffers = new ArrayList<>();

        // Parcourir toutes les offres de la base de données
        for (Offre o : offreRepository.findAll()) {
            // Vérifier si l'offre est différente de celle en cours
            if (!o.getReference().equals(offre.getReference())) {
                // Vérifier si les compétences ou le titre ont au moins un mot en commun
                String oSkills = o.getSkills().toLowerCase();
                String oTitle = o.getTitle().toLowerCase();
                if (hasCommonWord(skills, oSkills) || hasCommonWord(title, oTitle)) {
                    similarOffers.add(o);
                }
            }
        }

        return similarOffers;
    }

    //vérifier s'il y a au moins un mot en commun entre deux chaînes
    private boolean hasCommonWord(String str1, String str2) {
        String[] words1 = str1.split("\\s+");
        String[] words2 = str2.split("\\s+");
        Set<String> set = new HashSet<>(Arrays.asList(words1));
        for (String word : words2) {
            if (set.contains(word)) {
                return true;
            }
        }
        return false;
    }
    public List<Offre> searchOffresByTitle(String keyword) {
        List<Offre> offres = offreRepository.findByTitleContainingIgnoreCase(keyword);
        List<Offre> filteredOffres = new ArrayList<>();

        for (Offre offre : offres) {
            // Utilisez une expression régulière pour rechercher le mot dans le titre de l'offre
            if (offre.getTitle().toLowerCase().matches(".*\\b" + keyword.toLowerCase() + "\\b.*")) {
                filteredOffres.add(offre);
            }
        }

        return filteredOffres;
    }
    public SearchHistory addSearchHistory(Long keyword) {
        SearchHistory existingHistory = searchHistoryRepository.findById(keyword).get();

        if (existingHistory != null) {
            logger.info("Search history for keyword '{}' already exists, skipping save.", keyword);
            return existingHistory;
        }
        SearchHistory searchHistory = new SearchHistory();
        searchHistory.setKeyword(keyword);
        searchHistory.setSearchDate(new Date());
        return searchHistoryRepository.save(searchHistory);
    }
    public List<SearchHistory> getAllSearchHistory() {
        return searchHistoryRepository.findAll();
    }

    public void deleteSearchHistoryByKeyword(Long keyword) {
        try {
            searchHistoryRepository.deleteById(keyword);
        } catch (Exception e) {
            throw e;
        }
    }
    public void deleteByKeyword(Long keyword) {
        searchHistoryRepository.deleteById(keyword);
    }
    public void deleteAllSearchHistory() {
        searchHistoryRepository.deleteAll();
    }
}
