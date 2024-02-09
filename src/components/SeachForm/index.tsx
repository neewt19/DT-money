import { MagnifyingGlass } from 'phosphor-react'
import * as S from './styles'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const SeachFormSchema = z.object({
  query: z.string(),
})

type SeachFormImputs = z.infer<typeof SeachFormSchema>

export function SeachForm() {
  const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SeachFormImputs>({
    resolver: zodResolver(SeachFormSchema),
  })


  async function handleSeachTransactions(data: SeachFormImputs) {
    await fetchTransactions(data.query)
  }

  return (
    <S.SeachFormConteiner onSubmit={handleSubmit(handleSeachTransactions)}>
      <input
        type="text"
        placeholder="Busque uma transação"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SeachFormConteiner>
  )
}
