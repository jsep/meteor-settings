// Using the "wrapper package" version format
Package.describe({
  name: "jsep:settings",
  summary: "Handle your meteor project settings the easy way",
  git: "https://github.com/jsep/slick",
  version: '1.5.10'
});

Npm.depends({
  "chai": "3.5.0"
});

Package.onUse(function (api) {
  api.versionsFrom("1.3");

  api.use("meteor");
  api.use('ecmascript');

  api.mainModule('Settings.js');
});


Package.onTest(function (api) {
  api.use([
    'jsep:settings',
    'ecmascript',
    'practicalmeteor:mocha@2.4.5_2'
  ]);

  api.addFiles('tests/settings.js');
});
