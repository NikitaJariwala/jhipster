package org.jhipster.web.rest;

import org.jhipster.JipsterDemoApp;

import org.jhipster.domain.GlobalSetting;
import org.jhipster.repository.GlobalSettingRepository;
import org.jhipster.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GlobalSettingResource REST controller.
 *
 * @see GlobalSettingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JipsterDemoApp.class)
public class GlobalSettingResourceIntTest {

    private static final String DEFAULT_SETTING_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SETTING_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SETTING_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_SETTING_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_SETTING_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_SETTING_TYPE = "BBBBBBBBBB";

    @Autowired
    private GlobalSettingRepository globalSettingRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGlobalSettingMockMvc;

    private GlobalSetting globalSetting;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GlobalSettingResource globalSettingResource = new GlobalSettingResource(globalSettingRepository);
        this.restGlobalSettingMockMvc = MockMvcBuilders.standaloneSetup(globalSettingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GlobalSetting createEntity(EntityManager em) {
        GlobalSetting globalSetting = new GlobalSetting()
            .setting_name(DEFAULT_SETTING_NAME)
            .setting_value(DEFAULT_SETTING_VALUE)
            .settingType(DEFAULT_SETTING_TYPE);
        return globalSetting;
    }

    @Before
    public void initTest() {
        globalSetting = createEntity(em);
    }

    @Test
    @Transactional
    public void createGlobalSetting() throws Exception {
        int databaseSizeBeforeCreate = globalSettingRepository.findAll().size();

        // Create the GlobalSetting
        restGlobalSettingMockMvc.perform(post("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isCreated());

        // Validate the GlobalSetting in the database
        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeCreate + 1);
        GlobalSetting testGlobalSetting = globalSettingList.get(globalSettingList.size() - 1);
        assertThat(testGlobalSetting.getSetting_name()).isEqualTo(DEFAULT_SETTING_NAME);
        assertThat(testGlobalSetting.getSetting_value()).isEqualTo(DEFAULT_SETTING_VALUE);
        assertThat(testGlobalSetting.getSettingType()).isEqualTo(DEFAULT_SETTING_TYPE);
    }

    @Test
    @Transactional
    public void createGlobalSettingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = globalSettingRepository.findAll().size();

        // Create the GlobalSetting with an existing ID
        globalSetting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGlobalSettingMockMvc.perform(post("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isBadRequest());

        // Validate the GlobalSetting in the database
        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSetting_nameIsRequired() throws Exception {
        int databaseSizeBeforeTest = globalSettingRepository.findAll().size();
        // set the field null
        globalSetting.setSetting_name(null);

        // Create the GlobalSetting, which fails.

        restGlobalSettingMockMvc.perform(post("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isBadRequest());

        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSetting_valueIsRequired() throws Exception {
        int databaseSizeBeforeTest = globalSettingRepository.findAll().size();
        // set the field null
        globalSetting.setSetting_value(null);

        // Create the GlobalSetting, which fails.

        restGlobalSettingMockMvc.perform(post("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isBadRequest());

        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGlobalSettings() throws Exception {
        // Initialize the database
        globalSettingRepository.saveAndFlush(globalSetting);

        // Get all the globalSettingList
        restGlobalSettingMockMvc.perform(get("/api/global-settings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(globalSetting.getId().intValue())))
            .andExpect(jsonPath("$.[*].setting_name").value(hasItem(DEFAULT_SETTING_NAME.toString())))
            .andExpect(jsonPath("$.[*].setting_value").value(hasItem(DEFAULT_SETTING_VALUE.toString())))
            .andExpect(jsonPath("$.[*].settingType").value(hasItem(DEFAULT_SETTING_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getGlobalSetting() throws Exception {
        // Initialize the database
        globalSettingRepository.saveAndFlush(globalSetting);

        // Get the globalSetting
        restGlobalSettingMockMvc.perform(get("/api/global-settings/{id}", globalSetting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(globalSetting.getId().intValue()))
            .andExpect(jsonPath("$.setting_name").value(DEFAULT_SETTING_NAME.toString()))
            .andExpect(jsonPath("$.setting_value").value(DEFAULT_SETTING_VALUE.toString()))
            .andExpect(jsonPath("$.settingType").value(DEFAULT_SETTING_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGlobalSetting() throws Exception {
        // Get the globalSetting
        restGlobalSettingMockMvc.perform(get("/api/global-settings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGlobalSetting() throws Exception {
        // Initialize the database
        globalSettingRepository.saveAndFlush(globalSetting);
        int databaseSizeBeforeUpdate = globalSettingRepository.findAll().size();

        // Update the globalSetting
        GlobalSetting updatedGlobalSetting = globalSettingRepository.findOne(globalSetting.getId());
        // Disconnect from session so that the updates on updatedGlobalSetting are not directly saved in db
        em.detach(updatedGlobalSetting);
        updatedGlobalSetting
            .setting_name(UPDATED_SETTING_NAME)
            .setting_value(UPDATED_SETTING_VALUE)
            .settingType(UPDATED_SETTING_TYPE);

        restGlobalSettingMockMvc.perform(put("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGlobalSetting)))
            .andExpect(status().isOk());

        // Validate the GlobalSetting in the database
        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeUpdate);
        GlobalSetting testGlobalSetting = globalSettingList.get(globalSettingList.size() - 1);
        assertThat(testGlobalSetting.getSetting_name()).isEqualTo(UPDATED_SETTING_NAME);
        assertThat(testGlobalSetting.getSetting_value()).isEqualTo(UPDATED_SETTING_VALUE);
        assertThat(testGlobalSetting.getSettingType()).isEqualTo(UPDATED_SETTING_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingGlobalSetting() throws Exception {
        int databaseSizeBeforeUpdate = globalSettingRepository.findAll().size();

        // Create the GlobalSetting

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGlobalSettingMockMvc.perform(put("/api/global-settings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(globalSetting)))
            .andExpect(status().isCreated());

        // Validate the GlobalSetting in the database
        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGlobalSetting() throws Exception {
        // Initialize the database
        globalSettingRepository.saveAndFlush(globalSetting);
        int databaseSizeBeforeDelete = globalSettingRepository.findAll().size();

        // Get the globalSetting
        restGlobalSettingMockMvc.perform(delete("/api/global-settings/{id}", globalSetting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GlobalSetting> globalSettingList = globalSettingRepository.findAll();
        assertThat(globalSettingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GlobalSetting.class);
        GlobalSetting globalSetting1 = new GlobalSetting();
        globalSetting1.setId(1L);
        GlobalSetting globalSetting2 = new GlobalSetting();
        globalSetting2.setId(globalSetting1.getId());
        assertThat(globalSetting1).isEqualTo(globalSetting2);
        globalSetting2.setId(2L);
        assertThat(globalSetting1).isNotEqualTo(globalSetting2);
        globalSetting1.setId(null);
        assertThat(globalSetting1).isNotEqualTo(globalSetting2);
    }
}
