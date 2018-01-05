package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.domain.UserSetting;

import org.jhipster.repository.UserSettingRepository;
import org.jhipster.web.rest.errors.BadRequestAlertException;
import org.jhipster.web.rest.util.HeaderUtil;
import org.jhipster.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserSetting.
 */
@RestController
@RequestMapping("/api")
public class UserSettingResource {

    private final Logger log = LoggerFactory.getLogger(UserSettingResource.class);

    private static final String ENTITY_NAME = "userSetting";

    private final UserSettingRepository userSettingRepository;

    public UserSettingResource(UserSettingRepository userSettingRepository) {
        this.userSettingRepository = userSettingRepository;
    }

    /**
     * POST  /user-settings : Create a new userSetting.
     *
     * @param userSetting the userSetting to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userSetting, or with status 400 (Bad Request) if the userSetting has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-settings")
    @Timed
    public ResponseEntity<UserSetting> createUserSetting(@Valid @RequestBody UserSetting userSetting) throws URISyntaxException {
        log.debug("REST request to save UserSetting : {}", userSetting);
        if (userSetting.getId() != null) {
            throw new BadRequestAlertException("A new userSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserSetting result = userSettingRepository.save(userSetting);
        return ResponseEntity.created(new URI("/api/user-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-settings : Updates an existing userSetting.
     *
     * @param userSetting the userSetting to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userSetting,
     * or with status 400 (Bad Request) if the userSetting is not valid,
     * or with status 500 (Internal Server Error) if the userSetting couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-settings")
    @Timed
    public ResponseEntity<UserSetting> updateUserSetting(@Valid @RequestBody UserSetting userSetting) throws URISyntaxException {
        log.debug("REST request to update UserSetting : {}", userSetting);
        if (userSetting.getId() == null) {
            return createUserSetting(userSetting);
        }
        UserSetting result = userSettingRepository.save(userSetting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userSetting.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-settings : get all the userSettings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userSettings in body
     */
    @GetMapping("/user-settings")
    @Timed
    public ResponseEntity<List<UserSetting>> getAllUserSettings(Pageable pageable) {
        log.debug("REST request to get a page of UserSettings");
        Page<UserSetting> page = userSettingRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-settings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-settings/:id : get the "id" userSetting.
     *
     * @param id the id of the userSetting to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userSetting, or with status 404 (Not Found)
     */
    @GetMapping("/user-settings/{id}")
    @Timed
    public ResponseEntity<UserSetting> getUserSetting(@PathVariable Long id) {
        log.debug("REST request to get UserSetting : {}", id);
        UserSetting userSetting = userSettingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userSetting));
    }

    /**
     * DELETE  /user-settings/:id : delete the "id" userSetting.
     *
     * @param id the id of the userSetting to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-settings/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserSetting(@PathVariable Long id) {
        log.debug("REST request to delete UserSetting : {}", id);
        userSettingRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
