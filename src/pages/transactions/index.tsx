import { Header } from '../../components/Header'
import { SeachForm } from '../../components/SeachForm'
import { Summary } from '../../components/Summary'
import * as S from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })
  return (
    <div>
      <Header></Header>
      <Summary></Summary>
      <S.TransactionsConteiner>
        <SeachForm></SeachForm>
        <S.TransactionsTable>
          {transactions.map((transaction) => {
            return (
              <tbody key={transaction.id}>
                <tr>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <S.PriceHighLight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </S.PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              </tbody>
            )
          })}
        </S.TransactionsTable>
      </S.TransactionsConteiner>
    </div>
  )
}
