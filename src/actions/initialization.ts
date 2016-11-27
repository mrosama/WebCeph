import { Event } from '../utils/constants';
import { createAction } from 'redux-actions';

export const checkBrowserCompatibility = createAction<void>(Event.BROWSER_COMPATIBLITY_CHECK_REQUESTED);

export const compatiblityCheckSucceeded = createAction(Event.BROWSER_COMPATIBLITY_CHECK_SUCCEEDED);
export const compatiblityCheckFailed = createAction(Event.BROWSER_COMPATIBLITY_CHECK_FAILED);

export const foundMissingFeature:
  (payload: Payloads.foundMissingFeature) => Action<Payloads.foundMissingFeature> =
    createAction<Payloads.foundMissingFeature>(
      Event.BROWSER_COMPATIBLITY_CHECK_MISSING_FEATURE_DETECTED,
    );

export const appIsReady = createAction<void>(Event.APP_IS_READY);