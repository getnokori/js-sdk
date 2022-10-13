import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

beforeAll(async () => {
  await loladb.auth.login({
    strategy: 'password',
    email: 'wes+2788@loladb.com',
    password: '9j4f19j3d3d9j3d9',
  })
})

describe('loladb Billing', () => {
  
  it('should successfully get all active plans', async () => {
    const { data, error } = await loladb.billing.getPlans()

    expect(data).toBeTruthy()
    expect(error).toBeFalsy()
    expect(data.length).toBeGreaterThan(0)
  })

  it('should successfully get all active plans in plan group', async () => {
    const { data, error } = await loladb.billing.getPlans({
      groupId: 'loladb.bgrp.KifiX1hf9hCq0tIFXuP',
    })

    expect(data).toBeTruthy()
    expect(error).toBeFalsy()
    expect(data.length).toBeGreaterThan(0)
  })

  it('should successfully get all active plans in plan group w/ freq', async () => {
    const { data, error } = await loladb.billing.getPlans({
      freq: 'monthly',
      groupId: 'loladb.bgrp.KifiX1hf9hCq0tIFXuP',
    })

    expect(data).toBeTruthy()
    expect(error).toBeFalsy()
    expect(data.length).toBe(3)
  })

  it('should successfully get all active plans w/ freq', async () => {
    const { data, error } = await loladb.billing.getPlans({
      freq: 'monthly',
    })

    expect(data).toBeTruthy()
    expect(data.length).toBe(3)
  })

  it('should successfully subscribe an account to a plan', async () => {
    
    const { data, error } = await loladb.billing.subscribe({
      accountId: 'lola.acct.892ZJiyOqiArk91Chpl',
      planId: 'loladb.bpln.0R9ChGhrEpX95mXVSfJZ',
    })
    
    expect(data.subscribed).toBeTruthy()
    expect(error).toBeFalsy()
  })

  it('should reject subscription to a plan w/ userId', async () => {
    const { data, error } = await loladb.billing.subscribe({
      accountId: 'lola.user.K9xs9aYns8yTH5SFqud',
      planId: 'loladb.bpln.0R9ChGhrEpX95mXVSfJZ',
    })

    expect(data).toBeFalsy()
    expect(error).toBeTruthy()
  })

  it('should reject subscription to a plan w/o planId', async () => {
    
    const { data, error } = await loladb.billing.subscribe({
      accountId: 'lola.acct.892ZJiyOqiArk91Chpl',
    })
    
    expect(data).toBeFalsy()
    expect(error).toBeTruthy()
  })

  it('should reject subscription to a plan w/o accountId', async () => {
    
    const { data, error } = await loladb.billing.subscribe({
      planId: 'loladb.bpln.0R9ChGhrEpX95mXVSfJZ',
    })
    
    expect(data).toBeFalsy()
    expect(error).toBeTruthy()
  })
})
