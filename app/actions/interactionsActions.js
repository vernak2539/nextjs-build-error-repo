
const getInteractions = () => ({
  type: 'GET_INTERACTIONS',
  endpoint: '/ringaroo/api/v1/interactions',
});

const clearActiveInteractionId = () => (dispatch) =>
  dispatch({
    type: 'CLEAR_ACTIVE_INTERACTION_ID',
  });

export { getInteractions, clearActiveInteractionId };
