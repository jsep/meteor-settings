class MissingSettingsError extends Error {

  constructor(setting){
    let message = `Missing setting or env var ${setting}. Make sure you are running meteor with --settings flag`;
    super(message)
  }

}

export { MissingSettingsError }