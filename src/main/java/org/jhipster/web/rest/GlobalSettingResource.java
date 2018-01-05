package org.jhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.domain.GlobalSetting;

import org.jhipster.repository.GlobalSettingRepository;
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
 * REST controller for managing GlobalSetting.
 */
@RestController
@RequestMapping("/api")
public class GlobalSettingResource {

    private final Logger log = LoggerFactory.getLogger(GlobalSettingResource.class);

    private static final String ENTITY_NAME = "globalSetting";

    private final GlobalSettingRepository globalSettingRepository;

    public GlobalSettingResource(GlobalSettingRepository globalSettingRepository) {
        this.globalSettingRepository = globalSettingRepository;
    }

    /**
     * POST  /global-settings : Create a new globalSetting.
     *
     * @param globalSetting the globalSetting to create
     * @return the ResponseEntity with status 201 (Created) and with body the new globalSetting, or with status 400 (Bad Request) if the globalSetting has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/global-settings")
    @Timed
    public ResponseEntity<GlobalSetting> createGlobalSetting(@Valid @RequestBody GlobalSetting globalSetting) throws URISyntaxException {
        log.debug("REST request to save GlobalSetting : {}", globalSetting);
        if (globalSetting.getId() != null) {
            throw new BadRequestAlertException("A new globalSetting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GlobalSetting result = globalSettingRepository.save(globalSetting);
        return ResponseEntity.created(new URI("/api/global-settings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /global-settings : Updates an existing globalSetting.
     *
     * @param globalSetting the globalSetting to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated globalSetting,
     * or with status 400 (Bad Request) if the globalSetting is not valid,
     * or with status 500 (Internal Server Error) if the globalSetting couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/global-settings")
    @Timed
    public ResponseEntity<GlobalSetting> updateGlobalSetting(@Valid @RequestBody GlobalSetting globalSetting) throws URISyntaxException {
        log.debug("REST request to update GlobalSetting : {}", globalSetting);
        if (globalSetting.getId() == null) {
            return createGlobalSetting(globalSetting);
        }
        GlobalSetting result = globalSettingRepository.save(globalSetting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, globalSetting.getId().toString()))
            .body(result);
    }

    /**
     * GET  /global-settings : get all the globalSettings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of globalSettings in body
     */
    @GetMapping("/global-settings")
    @Timed
    public ResponseEntity<List<GlobalSetting>> getAllGlobalSettings(Pageable pageable) {
        log.debug("REST request to get a page of GlobalSettings");
        Page<GlobalSetting> page = globalSettingRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/global-settings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /global-settings/:id : get the "id" globalSetting.
     *
     * @param id the id of the globalSetting to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the globalSetting, or with status 404 (Not Found)
     */
    @GetMapping("/global-settings/{id}")
    @Timed
    public ResponseEntity<GlobalSetting> getGlobalSetting(@PathVariable Long id) {
        log.debug("REST request to get GlobalSetting : {}", id);
        GlobalSetting globalSetting = globalSettingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(globalSetting));
    }

    /**
     * DELETE  /global-settings/:id : delete the "id" globalSetting.
     *
     * @param id the id of the globalSetting to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/global-settings/{id}")
    @Timed
    public ResponseEntity<Void> deleteGlobalSetting(@PathVariable Long id) {
        log.debug("REST request to delete GlobalSetting : {}", id);
        globalSettingRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
