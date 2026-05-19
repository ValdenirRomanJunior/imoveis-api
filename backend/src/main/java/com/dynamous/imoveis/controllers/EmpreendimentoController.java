package com.dynamous.imoveis.controllers;

import com.dynamous.imoveis.dto.EmpreendimentoDTO;
import com.dynamous.imoveis.dto.LandingPageDTO;
import com.dynamous.imoveis.services.EmpreendimentoService;
import com.dynamous.imoveis.services.LandingPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/empreendimentos")
public class EmpreendimentoController {

    @Autowired
    private EmpreendimentoService service;

    @Autowired
    private LandingPageService landingPageService;

    @GetMapping
    public ResponseEntity<List<EmpreendimentoDTO>> findAll() {
        List<EmpreendimentoDTO> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<EmpreendimentoDTO> findById(@PathVariable Long id) {
        EmpreendimentoDTO obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<EmpreendimentoDTO> insert(@RequestBody EmpreendimentoDTO dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<EmpreendimentoDTO> update(@PathVariable Long id, @RequestBody EmpreendimentoDTO dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Rotas de Landing Page aninhadas no Empreendimento
    @GetMapping(value = "/{id}/paginas")
    public ResponseEntity<List<LandingPageDTO>> findPaginasByEmpreendimento(@PathVariable Long id) {
        List<LandingPageDTO> list = landingPageService.findByEmpreendimento(id);
        return ResponseEntity.ok().body(list);
    }

    @PostMapping(value = "/{id}/paginas")
    public ResponseEntity<LandingPageDTO> insertPagina(@PathVariable Long id, @RequestBody LandingPageDTO dto) {
        dto = landingPageService.insert(id, dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/paginas/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }
}
