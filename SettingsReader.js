
class SettingsReader {

  constructor(settings){
    this.settings = settings;
  }

  get(key, defaultValue){
    return defaultValue;
  }

  add(){

  }

  required(){

  }

  static makeReader(settings = {}){
    let settingsReader = new SettingsReader(settings);

    let reader = (key, defaultValue)=>{
      return settingsReader.get(key, defaultValue);
    };

    reader.get = settingsReader.get.bind(settingsReader);
    reader.add = settingsReader.add.bind(settingsReader);
    reader.required = settingsReader.required.bind(settingsReader);
    return reader;
  }

  static makeRequiredSettingsReader(reader){
    let requiredSettingsReader = (key)=>{
      return reader.required(key)
    };

    requiredSettingsReader.get = (key)=> {
      return requiredSettingsReader(key);
    };
    return requiredSettingsReader
  }
}

export { SettingsReader };