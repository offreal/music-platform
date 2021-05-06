import { ITrack } from './tracks';

export interface PlayerState {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
}

export enum PlayerActionTypes {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  SET_ACTIVE = 'SET_ACTIVE',
  SET_DURATION = 'SET_DURATION',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_VOLUME = 'SET_VOLUME',
}

interface playAction {
  type: PlayerActionTypes.PLAY;
}

interface pauseAction {
  type: PlayerActionTypes.PAUSE;
}

interface setActiveAction {
  type: PlayerActionTypes.SET_ACTIVE;
  payload: ITrack;
}

interface setDurationAction {
  type: PlayerActionTypes.SET_DURATION;
  payload: number;
}

interface setCurrentTimeAction {
  type: PlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
}

interface setVolumeAction {
  type: PlayerActionTypes.SET_VOLUME;
  payload: number;
}

export type PlayerAction =
  | playAction
  | pauseAction
  | setActiveAction
  | setDurationAction
  | setCurrentTimeAction
  | setVolumeAction;
