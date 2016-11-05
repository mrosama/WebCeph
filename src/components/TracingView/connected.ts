import {
  connect,
  MapStateToProps,
  MapDispatchToPropsFunction,
  MergeProps,
} from 'react-redux';

import TracingView from './index';

import {
  ConnectableProps,
  StateProps,
  DispatchProps,
  OwnProps,
} from './props';

import {
  getImageSizeByStageId,
  getImageDataByStageId,
  getImageBrightnessByStageId,
  getImageContrastByStageId,
  issImageForStageFlippedX,
  isImageForStageFlippedY,
  isImageForStageInverted,
} from 'store/reducers/workspace/image';

import {
  getCanvasSize,
  getScale,
  getScaleOrigin,
  getActiveToolCreator,
} from 'store/reducers/workspace/canvas';

import {
  getHighlightedLandmarks,
} from 'store/reducers/workspace';
import {
  getAllLandmarks,
} from 'store/reducers/workspace/analysis';

import assign from 'lodash/assign';
import curry from 'lodash/curry';

const mapStateToProps: MapStateToProps<StateProps, OwnProps> =
  (state: FinalState, { stageId }: OwnProps) => {
    const origin = getScaleOrigin(state);
    const { height: canvasHeight, width: canvasWidth } = getCanvasSize(state);
    const { height: imageHeight, width: imageWidth } = getImageSizeByStageId(state)(stageId);
    return {
      canvasHeight,
      canvasWidth,
      src: getImageDataByStageId(state)(stageId) as string,
      imageWidth: imageWidth as number,
      imageHeight: imageHeight as number,
      scale: getScale(state),
      scaleOriginX: origin !== null ? origin.x : null,
      scaleOriginY: origin !== null ? origin.y : null,
      brightness: getImageBrightnessByStageId(state)(stageId),
      contrast: getImageContrastByStageId(state)(stageId),
      isFlippedX: issImageForStageFlippedX(state)(stageId),
      isFlippedY: isImageForStageFlippedY(state)(stageId),
      landmarks: getAllLandmarks(state),
      isInverted: isImageForStageInverted(state)(stageId),
      highlightedLandmarks: getHighlightedLandmarks(state),
      activeTool: curry(getActiveToolCreator(state))(state),
    };
  };

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, OwnProps> =
  (dispatch) => ({ dispatch });

const mergeProps: MergeProps<StateProps, DispatchProps, OwnProps> =
  (stateProps, dispatchProps, ownProps): ConnectableProps => {
    return assign(
      { },
      ownProps,
      stateProps,
      dispatchProps,
      stateProps.activeTool(dispatchProps.dispatch),
    );
  };

const connected = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps, mapDispatchToProps, mergeProps,
)(TracingView);


export default connected;