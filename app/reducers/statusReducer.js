export const initialState = {
  error: null,
  loading: false,
  agentStatus: 'offline',
};

export default function statusReducer(state = initialState, action = {}) {
  const newAction = { ...action };
  switch (newAction.type) {
    case 'SET_AGENT_ONLINE':
      return {
        ...state,
        agentStatus: 'online',
      };
    case 'SET_AGENT_OFFLINE':
      return {
        ...state,
        agentStatus: 'offline',
      };
    default:
      return state;
  }
}
