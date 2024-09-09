package com.example.backend.model;


import com.example.backend.dto.ItemsDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Items {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codeItem;

    private String name;
    private String description;
    private Long quantity;
    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] img;

    public ItemsDto getDto() {
        ItemsDto productDto = new ItemsDto();
        productDto.setCodeItem(codeItem);
        productDto.setName(name);
        productDto.setQuantity(quantity);
        productDto.setDescription(description);
        productDto.setByteImg(img);

        return productDto;
    }
}