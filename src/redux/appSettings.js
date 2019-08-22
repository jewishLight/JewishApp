import { createReducer, createActions } from "reduxsauce";

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  clearSettings: [],
  updateDeviceStatus: ["isDeviceTurnON"],
  updateLightStatus: ["isLightTurnON"]
});

export const AppSettingsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const defaultState = {
  isDeviceTurnON: false,
  isLightTurnON: true
};

/* ------------- Reducers ------------- */

const clear = () => ({ ...defaultState });
const updateDeviceStatus = (state, { isDeviceTurnON }) => ({
  ...state,
  isDeviceTurnON
});
const updateLightStatus = (state, { isLightTurnON }) => ({
  ...state,
  isLightTurnON
});

/* ---------------- Hookup Reducers to Types --------------- */

export const appSettingsReducer = createReducer(defaultState, {
  [Types.CLEAR_SETTINGS]: clear,
  [Types.UPDATE_DEVICE_STATUS]: updateDeviceStatus,
  [Types.UPDATE_LIGHT_STATUS]: updateLightStatus
});
