package org.jhipster.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A UserSetting.
 */
@Entity
@Table(name = "user_setting")
public class UserSetting implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_setting_value", nullable = false)
    private String userSettingValue;

    @ManyToOne
    private GlobalSetting settingName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserSettingValue() {
        return userSettingValue;
    }

    public UserSetting userSettingValue(String userSettingValue) {
        this.userSettingValue = userSettingValue;
        return this;
    }

    public void setUserSettingValue(String userSettingValue) {
        this.userSettingValue = userSettingValue;
    }

    public GlobalSetting getSettingName() {
        return settingName;
    }

    public UserSetting settingName(GlobalSetting globalSetting) {
        this.settingName = globalSetting;
        return this;
    }

    public void setSettingName(GlobalSetting globalSetting) {
        this.settingName = globalSetting;
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
        UserSetting userSetting = (UserSetting) o;
        if (userSetting.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userSetting.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserSetting{" +
            "id=" + getId() +
            ", userSettingValue='" + getUserSettingValue() + "'" +
            "}";
    }
}
