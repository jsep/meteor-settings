import { MissingSettingsError } from "./MissingSettingsError"
import { SettingsReader } from "./SettingsReader";

let Settings = new SettingsReader(Meteor.settings || {});

let RequiredSettings = (key)=>{
  return Settings.required(key)
};

export default Settings;
export { Settings };
export { RequiredSettings };
export { MissingSettingsError };
