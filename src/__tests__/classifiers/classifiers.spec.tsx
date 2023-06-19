
import 'jest-localstorage-mock'

import nokori from '../../index'
const nk = new nokori(process.env.NOKORI_API_KEY)

describe('Classifiers', () => {
  let classifierId = ''

  it('Should create a classifier', async () => {
    const { data, error } = await nk.classifiers.create({
      name: 'Jest Test Classifier',
    })

    expect(error).toBe(null)
    expect(data).toHaveProperty('id')

    classifierId = data.id
  })

  it('Should get all classifiers', async () => {
    const { data, error } = await nk.classifiers.getMany()

    expect(error).toBe(null)
    expect(data).toBeTruthy()
  })

  it('Should get a classifier', async () => {
    const { data, error } = await nk.classifiers.getOne({
      classifierId,
    })

    expect(error).toBe(null)
    expect(data).toBeTruthy()
    expect(data).toHaveProperty('classifierId')
    expect(data).toHaveProperty('name')
    expect(data).toHaveProperty('classes')
  })

  it('Should train a classifier', async () => {
    const { data, error } = await nk.classifiers.train({
      classifierId,
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
      classifierId,
      context: 'two buns with meat in the middle',
    })

    expect(error).toBe(null)

    expect(data).toHaveProperty('classId')
    expect(data).toHaveProperty('label')
    expect(data).toHaveProperty('confidence')
  })

  it('Should delete a classifier', async () => {
    const { data, error } = await nk.classifiers.delete({
      classifierId,
    })

    expect(error).toBe(null)
  })
})
