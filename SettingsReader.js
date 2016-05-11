
class SettingsReader {

  constructor(settings){
    let self = this;

    let Settings = (key, defaultValue)=>{
      return self.get(key, defaultValue);
    };

    Settings.get = self.get.bind(self);
    Settings.add = self.add.bind(self);
    Settings.required = self.required.bind(self);
    return Settings;
  }

  get(key, defaultValue){
    return defaultValue;
  }

  add(){

  }

  required(){

  }

}

export { SettingsReader };