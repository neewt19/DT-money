import { useContext} from 'react'
import { Header } from '../../components/Header'
import { SeachForm } from '../../components/SeachForm'
import { Summary } from '../../components/Summary'
import * as S from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'

export function Transactions(){
  const {transactions} = useContext(TransactionsContext)
  return (
    <div>
      <Header></Header>
      <Summary></Summary>
      <S.TransactionsConteiner>
        <SeachForm></SeachForm>
        <S.TransactionsTable>
          {transactions.map(transaction => {
            return (
              <tbody key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <S.PriceHighLight variant={transaction.type}>
                   R$ {transaction.price},00
                  </S.PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tbody>
            )
          })}
        </S.TransactionsTable>
      </S.TransactionsConteiner>
    </div>
    )
}