package com.example.backend.service.admin.items;

import com.example.backend.Repository.ItemsRepository;
import com.example.backend.dto.ItemsDto;
import com.example.backend.model.Items;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ServiceItems implements IServiceItems{

    @Autowired
    ItemsRepository itemsRepository;



    public ItemsDto addItem(ItemsDto itemsDto) throws IOException {
        Items item = new Items();
        item.setName(itemsDto.getName());
        item.setDescription(itemsDto.getDescription());
        item.setQuantity(itemsDto.getQuantity());
        item.setCodeItem(itemsDto.getCodeItem());
        item.setImg(itemsDto.getImg().getBytes());
        return itemsRepository.save(item).getDto();
    }

    public List<ItemsDto> getAllItems(){
        List<Items> products = itemsRepository.findAll();
        return products.stream().map(Items::getDto).collect(Collectors.toList());
    }

    public ItemsDto getItemById(Long id){
        Optional<Items> optionalItems = itemsRepository.findById(id);
        if (optionalItems.isPresent()){
            return optionalItems.get().getDto();
        }else {
            return null;
        }

    }


    public ItemsDto updateDto(Long id , ItemsDto itemsDto) throws IOException {
        Optional<Items> optionalItems = itemsRepository.findById(id);
        if (optionalItems.isPresent() ){
            Items items = optionalItems.get();
            items.setName(itemsDto.getName());
            items.setDescription(itemsDto.getDescription());
            items.setQuantity(itemsDto.getQuantity());
            if (itemsDto.getImg() != null){
                items.setImg(itemsDto.getImg().getBytes());
            }
            return itemsRepository.save(items).getDto();
        }else {
            return null;
        }
    }

 /*   @Scheduled(fixedRate = 60000)
    public void runEveryDay() {

         Long id = 1L;
        Session s = sessionRepository.findById(id).get();

        List<Items> l = itemsRepository.findAll();
        LocalDate date =s.getStartDate().minusDays(3);
        log.info("date"+date);

        log.info("hiya ho"+date.isEqual(LocalDate.now()));
        if (date.isEqual(LocalDate.now())){
            for (Items i:l
                 ) {
                log.info("Cbon");
                i.setQuantity(s.getNbrReservation());
                itemsRepository.save(i);

            }
        }


        // do something
    }

*/
    public boolean deleteitem(Long id){
        Optional<Items> optionalItems= itemsRepository.findById(id);
        if(optionalItems.isPresent()){
            itemsRepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }
    @PostConstruct
    public void createItems(){
       Items a = itemsRepository.findItemsByName("desk");
       Items b = itemsRepository.findItemsByName("chair");
       if (a == null) {
           Items desks = new Items();
           desks.setQuantity(0L);
           desks.setName("desk");
           desks.setDescription("a white desk for 4 persone");
                itemsRepository.save(desks);
       }if (b==null) {
            Items chair = new Items();
            chair.setQuantity(0L);
            chair.setName("chair");
            chair.setDescription("a white chair");
            itemsRepository.save(chair);

        }


    }






}
