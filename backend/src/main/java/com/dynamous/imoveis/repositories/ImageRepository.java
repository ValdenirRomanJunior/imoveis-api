package com.dynamous.imoveis.repositories;


import com.dynamous.imoveis.entities.Image;
import com.dynamous.imoveis.entities.Property;

import java.util.List;
import java.util.Optional;

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

	List<Image> findAllByIdAccount(Long id);
	
	@Query("SELECT i FROM Image i where i.idAccount = :idAccount")
	Page<Image> findPageByAccount(Long idAccount, Pageable pageRequest);

	List<Image> findAllByProperty(Property property);

	Image findByUrl(String url);

	void save(Optional<Image> image);

	List<Image> findByIdIn(List<Long> ids);
	

}
