import LolaDB from '../../index'

const loladb = new LolaDB('lola_pk_prod_YDzGnSnlLt2xnrnXedJ3hjXOWbWzjQAcbtOc')

describe('loladb Billing', () => {
  
  it('should successfully get all active plans', async () => {
    const plansResponse = await loladb.billing.getPlans()

    expect(plansResponse).toBeTruthy()
    expect(plansResponse.status).toBe('success')
    expect(plansResponse.statusCode).toBe(200)
  })

  it('should successfully get all active plans in plan group', async () => {
    const plansResponse = await loladb.billing.getPlans({
      groupId: 'loladb.bgrp.KifiX1hf9hCq0tIFXuP',
    })

    expect(plansResponse).toBeTruthy()
    expect(plansResponse.status).toBe('success')
    expect(plansResponse.statusCode).toBe(200)
    expect(plansResponse.data.length).toBe(6)
  })

  it('should successfully get all active plans in plan group w/ freq', async () => {
    const plansResponse = await loladb.billing.getPlans({
      freq: 'monthly',
      groupId: 'loladb.bgrp.KifiX1hf9hCq0tIFXuP',
    })

    expect(plansResponse).toBeTruthy()
    expect(plansResponse.status).toBe('success')
    expect(plansResponse.statusCode).toBe(200)
    expect(plansResponse.data.length).toBe(3)
  })

  it('should successfully get all active plans w/ freq', async () => {
    const plansResponse = await loladb.billing.getPlans({
      freq: 'monthly',
    })

    expect(plansResponse).toBeTruthy()
    expect(plansResponse.status).toBe('success')
    expect(plansResponse.statusCode).toBe(200)
    expect(plansResponse.data.length).toBe(3)
  })
})
