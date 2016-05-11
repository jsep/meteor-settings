import { MochaRunner, describe, it, before, after, beforeEach, afterEach, xdescribe, xit, specify, xspecify, context, xcontext } from "meteor/practicalmeteor:mocha"
import { expect } from "chai"
import { SettingsReader } from "../SettingsReader"
import { RequiredSetting, MissingSettingsError } from "../index"
let Settings = null;

describe("Settings", ()=>{

  beforeEach(()=>{
    process.env.MY_ENV_VAR = "env var";
    this.settings = {
      my: {
        "privateSetting":  "private setting value",
        "otherPrivateSetting": {
          "key": "value"
        },
        "repeatedSetting": "repeated setting value"
      },
      MY_ENV_VAR: "value from Meteor.settings",
      public: {
        my: {
          publicSetting: "public setting value",
          otherPublicSetting: {
              "key": "value"
          },
          "repeatedSetting": "repeated setting value"
          }
        }
      };

    Settings = SettingsReader.makeReader(this.settings);
  });

  it("makeReader()");
  it("makeRequiredSettingsReader()");
  
  describe("private", ()=>{

    it("should get settings", ()=>{
      let settingValue = Settings("my.privateSetting", "default value");
      expect(settingValue).to.equal(this.settings.my.privateSetting);

      settingValue = Settings("my.otherPublicSetting", "default value");
      expect(settingValue).to.equal(this.settings.my.otherPrivateSetting);

      settingValue = Settings("my.otherPublicSetting.key", "default value");
      expect(settingValue).to.equal(this.settings.my.otherPrivateSetting.key);
    });

    it("should get default value of settings", ()=>{
      var defaultValue = "default value";
      let settingValue = Settings("my.missingPrivateSetting", defaultValue);
      expect(settingValue).to.equal(defaultValue);
    });
  });

  describe("public", ()=>{

    it("should get settings", ()=>{
      let settingValue = Settings("my.publicSetting", "default value");
      expect(settingValue).to.equal(this.settings.public.my.publicSetting);

      settingValue = Settings("my.otherPublicSetting", "default value");
      expect(settingValue).to.equal(this.settings.public.my.otherPublicSetting);

      settingValue = Settings("my.otherPublicSetting.key", "default value");
      expect(settingValue).to.equal(this.settings.public.my.otherPublicSetting.key);
    });

    it("should get default value of settings", ()=>{
      var defaultValue = "default value";
      let settingValue = Settings("my.missingPrivateSetting", defaultValue);
      expect(settingValue).to.equal(defaultValue);
    });
  });


  it("should get settings from env var", ()=>{
    let settingValue = Settings("MY_ENV_VAR", "default value");
    expect(settingValue).to.equal(process.env.MY_ENV_VAR);
  });

  it("should add custom settings", ()=>{
    let customSettingValue = "custom setting value";
    Settings.add("customSetting", customSettingValue);

    expect(Settings("customSetting")).to.equal(customSettingValue);
  });

  it("should add custom settings as object using key with '.'", ()=>{
    let customSettingValue = "custom.setting.value";
    Settings.add("my.customSetting.setting", customSettingValue);

    let customSetting = Settings("my.customSetting");
    expect(customSetting).to.be.an("object");
    expect(customSetting).to.have.keys(["setting"]);
    expect(customSetting.setting).to.equal(customSettingValue);
  });

  it("should throw error with required settings", ()=>{

    expect(()=>{
      Settings.required("my.missingRequiredSetting")
    }).to.throw(MissingSettingsError);

    expect(()=>{
      RequiredSetting("my.missingRequiredSetting")
    }).to.throw(MissingSettingsError)


  });


});