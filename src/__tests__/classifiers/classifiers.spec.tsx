
import 'jest-localstorage-mock'

import nokori from '../../index'
const nk = new nokori('lola_pk_prod_ZsbfD2gAMB6T8hZMFdTzNSwMeTR5wAXtuxC1')

describe('Classifiers', () => {
  it('Should create a classifier', async () => {
    const { data, error } = await nk.classifiers.create({
      name: 'Jest Test Classifier',
    })

    expect(error).toBe(null)
    expect(data).toHaveProperty('id')
  })

  it('Should train a classifier', async () => {
    const { data, error } = await nk.classifiers.train({
      classifierId: 'nk.clfr.14xRyjyvtnGhquMr4to',
      label: 'hot dog',
      context: 'two buns with meat in the middle',
    })

    expect(error).toBe(null)
    expect(data).toHaveProperty('classId')
    expect(data).toHaveProperty('observations')
    expect(data.observations).toBeGreaterThan(0)
  })

  it('Should predict a class', async () => {
    const { data, error } = await nk.classifiers.predict({
      classifierId: 'nk.clfr.14xRyjyvtnGhquMr4to',
      context: 'two buns with meat in the middle',
    })

    expect(error).toBe(null)

    expect(data).toHaveProperty('classId')
    expect(data).toHaveProperty('label')
    expect(data).toHaveProperty('confidence')
  })
})
