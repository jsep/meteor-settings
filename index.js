import { MissingSettingsError } from "./MissingSettingsError"
import { SettingsReader } from "./SettingsReader";

let Settings = SettingsReader.makeReader(Meteor.settings);
let RequiredSetting = SettingsReader.makeRequiredSettingsReader(Settings);

export default Settings;
export { Settings };
export { SettingsReader };
export { RequiredSetting };
export { MissingSettingsError };
