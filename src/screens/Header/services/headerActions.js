export const emitEventToReducer = (params) => ({
  type: params.type,
  payload: params.payload,
});
