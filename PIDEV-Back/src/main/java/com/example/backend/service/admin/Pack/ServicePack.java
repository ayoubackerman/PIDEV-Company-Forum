package com.example.backend.service.admin.Pack;

import com.example.backend.Repository.PackRepository;
import com.example.backend.dto.PackDto;
import com.example.backend.model.Pack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServicePack implements IServicePack {

    @Autowired
    private PackRepository packRepository;

    @Override
    public PackDto addPack(PackDto packDto) throws IOException {
        Pack pack = new Pack();
        pack.setTypePack(packDto.getPackType());
        pack.setPricePack(packDto.getPricePack());
        packRepository.save(pack);
        return packDto;
    }

    @Override
    public List<PackDto> getAllPacks() {
        List<Pack> packs = packRepository.findAll();
        return packs.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public boolean deletePack(Long id) {
        Optional<Pack> packOptional = packRepository.findById(id);
        if (packOptional.isPresent()) {
            packRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private PackDto convertToDto(Pack pack) {
        PackDto packDto = new PackDto();
        packDto.setId(pack.getId());
        packDto.setPackType(pack.getTypePack());
        packDto.setPricePack(pack.getPricePack());
        return packDto;
    }
}
