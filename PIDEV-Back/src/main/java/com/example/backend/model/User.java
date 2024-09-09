package com.example.backend.model;

import com.example.backend.dto.UserDto;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ext.SqlBlobSerializer;
import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.*;
import org.apache.catalina.UserDatabase;
import org.springframework.data.annotation.Id;

import java.sql.Blob;
import java.util.List;


@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "_user_Info")
public class  User {

    @jakarta.persistence.Id
    @Id
    private String id;
    private String phoneNumber;
    private String adress ;
    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] img ;

    @Transient
    private List<String> skills;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CompanyReview> companyReviews;
    public UserDto getDto() {
        UserDto userDto = new UserDto();
        userDto.setId(id);
        userDto.setPhoneNumber(phoneNumber);
        userDto.setAdress(adress);
        userDto.setByteImg(img);

        return userDto;
    }




}
