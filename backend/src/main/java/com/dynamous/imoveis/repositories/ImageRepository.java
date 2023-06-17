package com.dynamous.imoveis.repositories;


import com.dynamous.imoveis.entities.Image;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ImageRepository extends JpaRepository<Image,Long> {

	List<Image> findAllByIdTenant(Long id);
	
	@Query("SELECT i FROM Image i where i.idTenant = :idTenant")
	Page<Image> findPageByTenant(Long idTenant, Pageable pageRequest);
	

}
