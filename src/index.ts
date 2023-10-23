import * as core from "@actions/core";

type Layer = "major" | "minor" | "patch";

core.debug(typeof core.getInput("version"));
const run = () => {
  try {
    const targetLayer = core.getInput("layer") as Layer;
    const currentVersion = core.getInput("version");
    const updatedVersion = getUpdatedVersion(targetLayer, currentVersion);

    core.debug(targetLayer);
    core.debug(currentVersion);
    core.debug(updatedVersion);
    core.setOutput("version", updatedVersion);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};

const getUpdatedVersion = (layer: Layer, currentVersion: string) => {
  const currentVersionArr = currentVersion.split(".");
  let updatedVersionArr = currentVersionArr;
  switch (layer) {
    case "major":
      updatedVersionArr[0] = String(Number(updatedVersionArr[0]) + 1);
      core.debug(String(Number(updatedVersionArr[0]) + 1));
      updatedVersionArr[1] = "0";
      updatedVersionArr[2] = "0";
      break;
    case "minor":
      updatedVersionArr[1] = String(Number(updatedVersionArr[1]) + 1);
      updatedVersionArr[2] = "0";
      break;
    case "patch":
      updatedVersionArr[2] = String(Number(updatedVersionArr[2]) + 1);
      break;
  }
  return updatedVersionArr.join(".");
};

run();
