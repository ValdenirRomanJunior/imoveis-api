package com.dynamous.imoveis.repositories;



import com.dynamous.imoveis.entities.UserAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserAdminRepository extends JpaRepository <UserAdmin,Long> {

    @Transactional(readOnly = true)
    UserAdmin findByEmail(String email);

}
