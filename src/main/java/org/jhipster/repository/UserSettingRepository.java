package org.jhipster.repository;

import org.jhipster.domain.UserSetting;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the UserSetting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSettingRepository extends JpaRepository<UserSetting, Long> {

}
