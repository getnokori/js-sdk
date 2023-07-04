import type MailScenarios from '@/enums/mail/MailScenarios'

export interface SendMailRequestDTO {
  scenario?: MailScenarios
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
