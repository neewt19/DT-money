import * as Dialog from '@radix-ui/react-dialog'
import * as S from './styles'
import * as z from 'zod'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
   //type: z.enum(['income', 'outcome'])
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal(){
    const { 
        register,
        handleSubmit,
        formState: 
        {
         isSubmitting
        }
        } = useForm<newTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema), 
    })

    async function handleCreateNewTransaction(data: newTransactionFormInputs){
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(data)
    }

    return(
        <Dialog.Portal>
            <S.Overlay/>
            <S.Content>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <S.CloseButton>
                    <X size={24}/>
                </S.CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input 
                        type="text" 
                        placeholder='Descrição' 
                        required
                        {...register('description')}
                    />
                    <input 
                        type="number" 
                        placeholder='Preço' 
                        required
                        {...register('price', { valueAsNumber: true})}
                    />
                    <input 
                        type="text" 
                        placeholder='Categoria' 
                        required
                        {...register('category')}
                    />
                    
                    <S.TransactionType>
                        <S.TransactionTypeButton variant='income' value='income'>
                            <ArrowCircleUp size={24}/>
                            Entrada
                        </S.TransactionTypeButton>

                        <S.TransactionTypeButton variant='outcome' value='outcome'>
                            <ArrowCircleDown size={24}/>
                            Saida
                        </S.TransactionTypeButton>
                    </S.TransactionType>

                    <button type='submit' disabled={isSubmitting}>Cadastrar</button>
                </form>
            </S.Content>
        </Dialog.Portal>
    )
}