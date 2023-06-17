import MailHTTP from '@/services/mail/mail.http'
import type SendMailRequestDTO from '@/types/mail.d'

class MailService {

  protected api: MailHTTP
  protected accountId: string | null = null

  constructor(HTTPService, settings: any) {
    this.api = new MailHTTP(HTTPService)
  }

  public async send(args: SendMailRequestDTO) {
    const { data, error } = await this.api.send(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

}

export default MailService
