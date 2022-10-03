export enum NetworkFailure {
  ERROR_MESSAGE = 'Request Failed',
  MAX_RETRIES = 10,
  RETRY_INTERVAL = 2, // in deciseconds
}

export default NetworkFailure
