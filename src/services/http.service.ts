const DEFAULT_HOST = 'api.loladb.io'
const DEFAULT_PORT = '443'
const DEFAULT_BASE_PATH = '/v1/'
const DEFAULT_API_VERSION = null

const DEFAULT_TIMEOUT = 80000

export const POST = (endpoint: string, body: any) => {}

export const GET = (endpoint: string, body: any) => {}

const _request = (method: string, endpoint: string, body: any) => {}

export default {
  GET,
  POST,
}
