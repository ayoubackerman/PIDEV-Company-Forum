package com.example.backend.service.admin.Pack;


import com.example.backend.dto.PackDto;

import java.io.IOException;
import java.util.List;

public interface IServicePack{
        public PackDto addPack(PackDto packDto) throws IOException;

        public List<PackDto> getAllPacks();
        public boolean deletePack(Long id);
}
