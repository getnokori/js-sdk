import StorageService from '@/services/storage.service'
import BillingHTTP from '@/services/billing/billing.http'
import StorageEnums from '@/enums/storage/storage.enum'

class BillingService {

  protected api: BillingHTTP
  protected storage = new StorageService()
  protected accountId: string | null = null

  constructor(HTTPService, settings: any) {
    this.api = new BillingHTTP(HTTPService)
  }

  public setAccount(accountId: string): void {
    this.accountId = accountId
  }

  public async getPlans(args: any = { freq: null, groupId: null }) {
    const { data, error } = await this.api.getPlans(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

  public async getAccountSubscription(args: any = { accountId: null }) {}

  public async subscribe(args: any = { accountId: null, planId: null }) {
    const { data, error } = await this.api.subscribe(args)
    if(!data)
      return { data: null, error: error }

    return { data: data, error: null }
  }

  public async unsubscribe(args: any = { accountId: null }) {}

  public async updateSubscription(args: any = { accountId: null, planId: null }) {}

  public async getAccountInvoices(args: any = { accountId: null }) {}

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

export default BillingService
