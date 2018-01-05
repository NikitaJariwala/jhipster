package org.jhipster.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A GlobalSetting.
 */
@Entity
@Table(name = "global_setting")
public class GlobalSetting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "setting_name", nullable = false)
    private String setting_name;

    @NotNull
    @Column(name = "setting_value", nullable = false)
    private String setting_value;

    @Column(name = "setting_type")
    private String settingType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSetting_name() {
        return setting_name;
    }

    public GlobalSetting setting_name(String setting_name) {
        this.setting_name = setting_name;
        return this;
    }

    public void setSetting_name(String setting_name) {
        this.setting_name = setting_name;
    }

    public String getSetting_value() {
        return setting_value;
    }

    public GlobalSetting setting_value(String setting_value) {
        this.setting_value = setting_value;
        return this;
    }

    public void setSetting_value(String setting_value) {
        this.setting_value = setting_value;
    }

    public String getSettingType() {
        return settingType;
    }

    public GlobalSetting settingType(String settingType) {
        this.settingType = settingType;
        return this;
    }

    public void setSettingType(String settingType) {
        this.settingType = settingType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GlobalSetting globalSetting = (GlobalSetting) o;
        if (globalSetting.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), globalSetting.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GlobalSetting{" +
            "id=" + getId() +
            ", setting_name='" + getSetting_name() + "'" +
            ", setting_value='" + getSetting_value() + "'" +
            ", settingType='" + getSettingType() + "'" +
            "}";
    }
}
