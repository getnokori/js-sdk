import StorageService from '@/services/storage.service'
import PaymentsHTTP from '@/services/payments/payments.http'
import StorageEnums from '@/enums/storage/storage.enum'

class PaymentsService {

  protected api: PaymentsHTTP
  protected storage = new StorageService()
  protected accountId: string | null = null

  constructor(HTTPService, settings: any) {
    this.api = new PaymentsHTTP(HTTPService)
  }

  public setAccount(accountId: string): void {
    this.accountId = accountId
  }

  public async createPaymentMethod(args: any = { accountId: null, paymentMethodId: null }) {
    const { data, error } = await this.api.createPaymentMethod(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

  public async getPaymentMethods(args: any = { accountId: null }) {}

  public async getDefaultPaymentMethod(args: any = { accountId: null }) {}

  public async setDefaultPaymentMethod(args: any = { accountId: null, paymentMethodId: null }) {}
  
}

export default PaymentsService
