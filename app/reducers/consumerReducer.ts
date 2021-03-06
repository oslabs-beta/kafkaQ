import { Data } from 'electron';
import { ADD_CONSUMER_DATA } from '../constants/actionTypes';

// Initial state of Consumer Data
const initialState = {
  dataSize: {
    sum: 0,
    numOfDataPoints: 0,
    smallest: Number.POSITIVE_INFINITY,
    largest: Number.NEGATIVE_INFINITY,
  },
  processingTimeInMilliseconds: {
    sum: 0,
    numOfDataPoints: 0,
    smallest: Number.POSITIVE_INFINITY,
    largest: Number.NEGATIVE_INFINITY,
  },
  pendingDuration: {
    sum: 0,
    numOfDataPoints: 0,
    smallest: Number.POSITIVE_INFINITY,
    largest: Number.NEGATIVE_INFINITY,
  },
};

interface NewData {
  size: number;
  pendingDuration: number;
  processingTimeInMilliseconds: number;
}

interface Metrics {
  data: NewData;
}

interface action {
  type: string;
  payload: Metrics;
}

// Reducer of consumer data takes in initial state and action dispatched
// to update the consumer data
const consumerReducer = (state = initialState, action: action) => {
  switch (action.type) {
    case ADD_CONSUMER_DATA:
      const {
        size,
        processingTimeInMilliseconds,
        pendingDuration,
      } = action.payload.data;

      const newDataSize = {
        sum: state.dataSize.sum + size,
        numOfDataPoints: state.dataSize.numOfDataPoints + 1,
        smallest: Math.min(state.dataSize.smallest, size),
        largest: Math.max(state.dataSize.largest, size),
      };

      const newProcessingTimeInMilliseconds = {
        sum:
          state.processingTimeInMilliseconds.sum + processingTimeInMilliseconds,
        numOfDataPoints: state.processingTimeInMilliseconds.numOfDataPoints + 1,
        smallest: Math.min(
          state.processingTimeInMilliseconds.smallest,
          processingTimeInMilliseconds
        ),
        largest: Math.max(
          state.processingTimeInMilliseconds.largest,
          processingTimeInMilliseconds
        ),
      };

      const newPendingDuration = {
        sum: state.pendingDuration.sum + pendingDuration,
        numOfDataPoints: state.pendingDuration.numOfDataPoints + 1,
        smallest: Math.min(state.pendingDuration.smallest, pendingDuration),
        largest: Math.max(state.pendingDuration.largest, pendingDuration),
      };

      return {
        ...state,
        dataSize: newDataSize,
        processingTimeInMilliseconds: newProcessingTimeInMilliseconds,
        pendingDuration: newPendingDuration,
      };

    default:
      return state;
  }
};

export default consumerReducer;
