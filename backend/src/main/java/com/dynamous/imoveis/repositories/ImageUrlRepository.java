package com.dynamous.imoveis.repositories;



import com.dynamous.imoveis.entities.ImageUrl;
import com.dynamous.imoveis.entities.Property;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ImageUrlRepository extends JpaRepository<ImageUrl,Long> {
	
	void deleteByPropertyId(Long id);

	List<ImageUrl> findDistinctByIdAccountAndUrl(Long idAccount, String url);

	List<ImageUrl> findAllByProperty(Property property);

	
	
	
}
