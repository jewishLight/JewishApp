import { createSelector } from "reselect";

const appSettings$ = state => state.appSettings;
export const appSettingsSelector = createSelector(
  appSettings$,
  appSettings => ({
    appSettings
  })
);
