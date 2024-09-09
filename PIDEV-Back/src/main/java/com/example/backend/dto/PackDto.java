package com.example.backend.dto;

import com.example.backend.Enum.TypePack;
import lombok.Data;
@Data
public class PackDto {
    private Long id ;
    private TypePack packType ;
    private Double pricePack;
}
