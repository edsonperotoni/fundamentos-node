import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

transactionRouter.get('/', (request, response) => {
  try {
    // TODO

    const report = transactionsRepository.report();
    return response.status(200).json(report);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO

    const { title, value, type } = request.body;

    const transactionRequest: Request = { title, value, type };

    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransactionService.execute(transactionRequest);

    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
