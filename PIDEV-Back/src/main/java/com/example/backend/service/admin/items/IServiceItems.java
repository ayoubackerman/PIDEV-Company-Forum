package com.example.backend.service.admin.items;


import com.example.backend.dto.ItemsDto;

import java.io.IOException;
import java.util.List;

public interface IServiceItems {


    ItemsDto addItem(ItemsDto itemsDto) throws IOException;
    public List<ItemsDto> getAllItems();
    public boolean deleteitem(Long id);
    public ItemsDto getItemById(Long id);
    public ItemsDto updateDto(Long id , ItemsDto itemsDto) throws IOException ;


    }
