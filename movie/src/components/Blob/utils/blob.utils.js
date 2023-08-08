import generator from 'blobshape';
import { parseURLParams, updateUrl } from './url.utils';
import animate from './animation.utils';
import store from '../../../store/index';

const { blobStore } = store;

const generateBlob = (props) => generator({ ...props, size: 500 });

const updateStore = (state) => {
  blobStore.setStaticBlobData(state);
};

const createRandomBlobFromDefault = (storeProps) => {
  const { path: svgPath, seedValue: seed } = generateBlob(storeProps);
  return { svgPath, seed };
};

const createFixedBlobFromURLParams = (params) => {
  const { path: svgPath } = generateBlob(params);
  return { svgPath };
};

const createFixedBlobFromProps = (props) => {
  const { path: svgPath } = generateBlob(props);
  return { svgPath };
};

const createRandomBlobFromProps = (props) => {
  const { path: svgPath, seedValue: seed } = generateBlob({
    ...props,
    seed: null,
  });
  return { svgPath, seed };
};

export const createInitialBlob = (defaultProps) => {
  let state = {};
  const params = parseURLParams();
  if (Object.keys(params).length) {
    state = createFixedBlobFromURLParams(params);
  } else {
    state = createRandomBlobFromDefault(defaultProps);
    updateUrl({ ...defaultProps, ...state });
  }
  updateStore({ ...params, ...state });
  animate(state.svgPath);
};

export const createFixedBlob = (props, shouldAnimate = true) => {
  const state = createFixedBlobFromProps(props);
  updateStore(state);
  if (shouldAnimate) animate(state.svgPath);
  updateUrl({ ...props, ...state });
};

export const createRandomBlob = () => {
  const currentState = blobStore.getState();
  const state = createRandomBlobFromProps(currentState);
  updateStore(state);
  animate(state.svgPath);
  updateUrl({ ...currentState, ...state });
};

export const setBlobTheme = (props) => {
  // const currentState = store.getState();
  // updateStore(props);
  // updateUrl({ ...currentState, ...props });
};
