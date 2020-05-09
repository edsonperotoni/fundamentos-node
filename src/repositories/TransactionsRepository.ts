import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface Report {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO

    return this.transactions.reduce(
      function (totals: Balance, obj: Transaction): Balance {
        if (obj.type === 'income') {
          totals.income += obj.value;
        }
        if (obj.type === 'outcome') {
          totals.outcome += obj.value;
        }
        totals.total = totals.income - totals.outcome;
        return totals;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    // TODO
    if (!(type === 'income' || type === 'outcome')) {
      throw Error("The type of transaction must be 'income' or 'outcome'");
    }

    if (type === 'outcome') {
      const currentBalance = this.getBalance().total;
      if (currentBalance < value) {
        throw Error('There is not enough balance');
      }
    }
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }

  public report(): Report {
    // TODO
    return {
      transactions: this.all(),
      balance: this.getBalance(),
    };
  }
}

export default TransactionsRepository;
