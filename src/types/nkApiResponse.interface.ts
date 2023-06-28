interface nkAPIResponse {
  data: any | null
  error: Error | null 
  statusCode?: number | null 
}

export default nkAPIResponse
