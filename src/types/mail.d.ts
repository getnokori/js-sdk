export interface SendMailRequestDTO {
  scenario?: 'verify-email' | 'reset-password'
  templateId: string
  settings: {
    to: string
    from?: string
    bcc?: string
    cc?: string
    replyTo?: string
    subject?: string
  }
  context?: {
    [key: string]: string
  }
  headers?: {
    [key: string]: string
  }
}

export default SendMailRequestDTO
