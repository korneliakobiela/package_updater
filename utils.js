const parseName = (name) => {
  const [package, version] = name.split('@');
  return {
    package,
    version: version ? version : "latest"
  };
}

const getNewPackageJson = (data, options) => {
  const packageJsonContent = JSON.parse(data);
  const packageData = parseName(options.n);
  packageJsonContent.dependencies[packageData.package] = packageData.version;
  return JSON.stringify(packageJsonContent, null, 4);
}
// TODO: Check if version of package exists in npm registry
const ifVersionExists = () => {};
module.exports = {
  parseName,
  getNewPackageJson
}