import { SET_AGENT_ONLINE, SET_AGENT_OFFLINE } from '../actions/types';

import reducer, { initialState } from './statusReducer';

describe('statusReducer', () => {
  it('returns the initial state if no action is matched', () => {
    const state = {
      ...initialState,
    };

    const action = {
      type: 'UNKNOWN',
    };

    const result = {
      ...initialState,
    };
    expect(reducer(state, action)).toEqual(result);
  });

  describe('SET_AGENT_ONLINE', () => {
    it('sets the agent status to online', () => {
      const state = {
        ...initialState,
      };

      const action = {
        type: SET_AGENT_ONLINE,
      };

      const result = {
        ...initialState,
        agentStatus: 'online',
      };

      expect(reducer(state, action)).toEqual(result);
    });
  });

  describe('SET_AGENT_OFFLINE', () => {
    it('sets the agent status to offline', () => {
      const state = {
        ...initialState,
        agentStatus: 'online',
      };

      const action = {
        type: SET_AGENT_OFFLINE,
      };

      const result = {
        ...initialState,
        agentStatus: 'offline',
      };

      expect(reducer(state, action)).toEqual(result);
    });
  });
});
