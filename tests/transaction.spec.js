import UserHelper from '../helpers/user.helper'
import TransactionHelper from '../helpers/transaction.helper'
import {expect} from 'chai'

describe('Transaction', function () {
  const defaultBalance = 1000

  describe('Create', function () {
    describe('With valid data', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = 100
      let createTransactionResponse
      let userIdFrom
      let userIdTo

      before(async function () {
        userIdFrom = (await userHelper.create()).body.id
        userIdTo = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
      })

      after(async function () {
        await userHelper.delete(userIdFrom)
        await userHelper.delete(userIdTo)
      })

      it('Create Transaction response status code is 200', function () {
        expect(createTransactionResponse.statusCode).to.eq(200)
      })

      it('Create Transaction response body contains Transaction ID', function () {
        expect(createTransactionResponse.body.id).to.be.a('string')
      })

      it('Create Transaction response body contains User ID of sender', function () {
        expect(createTransactionResponse.body.from).to.eq(userIdFrom)
      })

      it('Create Transaction response body contains User ID of receiver', function () {
        expect(createTransactionResponse.body.to).to.eq(userIdTo)
      })

      it('Create Transaction response body contains entered amount', function () {
        expect(createTransactionResponse.body.amount).to.eq(amount)
      })

      it("Sender's balance had decreased by 100", async function () {
        const response = await userHelper.get(userIdFrom)
        await expect(response.body.amount).to.eq(defaultBalance - amount)
      })

      it("Receiver's balance has increased by 100", async function () {
        const response = await userHelper.get(userIdTo)
        await expect(response.body.amount).to.eq(defaultBalance + amount)
      })
    })

    describe.skip('With invalid amount', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = -100
      let createTransactionResponse
      let userIdFrom
      let userIdTo

      before(async function () {
        userIdFrom = (await userHelper.create()).body.id
        userIdTo = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
      })

      after(async function () {
        await userHelper.delete(userIdFrom)
        await userHelper.delete(userIdTo)
      })

      it('Create Transaction response status code is 400', function () {
        expect(createTransactionResponse.statusCode).to.eq(400)
      })

      it('Create Transaction response body contains error message', function () {
        expect(createTransactionResponse.body.message).to.eq('Amount must be above zero.')
      })

      it("Sender's balance had not decreased by 100", async function () {
        const response = await userHelper.get(userIdFrom)
        await expect(response.body.amount).to.eq(defaultBalance)
      })

      it("Receiver's balance had not increased by 100", async function () {
        const response = await userHelper.get(userIdTo)
        await expect(response.body.amount).to.eq(defaultBalance)
      })
    })

    describe('With exceeding amount', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = defaultBalance + 1
      let createTransactionResponse
      let userIdFrom
      let userIdTo

      before(async function () {
        userIdFrom = (await userHelper.create()).body.id
        userIdTo = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
      })

      after(async function () {
        await userHelper.delete(userIdFrom)
        await userHelper.delete(userIdTo)
      })

      it('Create Transaction response status code is 400', function () {
        expect(createTransactionResponse.statusCode).to.eq(400)
      })

      it('Create Transaction response body contains error message', function () {
        expect(createTransactionResponse.body.message).to.eq('Sender doesn\'t have enough money.')
      })

      it("Sender's balance had not decreased", async function () {
        const response = await userHelper.get(userIdFrom)
        await expect(response.body.amount).to.eq(defaultBalance)
      })

      it("Receiver's balance had not increased", async function () {
        const response = await userHelper.get(userIdTo)
        await expect(response.body.amount).to.eq(defaultBalance)
      })
    })

    describe('With non-existing sender', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = 100
      let createTransactionResponse
      const userIdFrom = '1'
      let userIdTo

      before(async function () {
        userIdTo = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
      })

      after(async function () {
        await userHelper.delete(userIdTo)
      })

      it('Create Transaction response status code is 400', function () {
        expect(createTransactionResponse.statusCode).to.eq(400)
      })

      it('Create Transaction response body contains error message', function () {
        expect(createTransactionResponse.body.message).to.eq('Sender not found.')
      })

      it("Receiver's balance had not increased", async function () {
        const response = await userHelper.get(userIdTo)
        await expect(response.body.amount).to.eq(defaultBalance)
      })
    })

    describe('With non-existing receiver', function () {
      const userHelper = new UserHelper()
      const transactionHelper = new TransactionHelper()
      const amount = 100
      let createTransactionResponse
      let userIdFrom
      const userIdTo = '1'

      before(async function () {
        userIdFrom = (await userHelper.create()).body.id
        createTransactionResponse = await transactionHelper.create(userIdFrom, userIdTo, amount)
      })

      after(async function () {
        await userHelper.delete(userIdFrom)
      })

      it('Create Transaction response status code is 400', function () {
        expect(createTransactionResponse.statusCode).to.eq(400)
      })

      it('Create Transaction response body contains error message', function () {
        expect(createTransactionResponse.body.message).to.eq('Receiver not found.')
      })

      it("Sender's balance had not decreased", async function () {
        const response = await userHelper.get(userIdFrom)
        await expect(response.body.amount).to.eq(defaultBalance)
      })
    })
  })
})
