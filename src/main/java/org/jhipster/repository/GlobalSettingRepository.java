package org.jhipster.repository;

import org.jhipster.domain.GlobalSetting;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the GlobalSetting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GlobalSettingRepository extends JpaRepository<GlobalSetting, Long> {

}
