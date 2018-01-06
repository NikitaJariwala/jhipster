package org.jhipster.repository;

import org.jhipster.domain.UserSetting;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the UserSetting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserSettingRepository extends JpaRepository<UserSetting, Long> {

    @Query("select user_setting from UserSetting user_setting where user_setting.userId.login = ?#{principal.username}")
    List<UserSetting> findByUserIdIsCurrentUser();

}
