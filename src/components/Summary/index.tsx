import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import * as S from './styles'
import { priceFormatter } from '../../utils/formatter'
import { useSummary } from '../../hooks/useSummary'

export function Summary(){
    const sumary = useSummary()

    return (
        <S.SumaryContainer>
            <S.SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e"/>
                </header>
                <strong>{priceFormatter.format(sumary.income)}</strong>
            </S.SummaryCard>  

            <S.SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68"/>
                </header>
                <strong>{priceFormatter.format(sumary.outcome)}</strong>
            </S.SummaryCard>

            <S.SummaryCard variant='green'>
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff"/>
                </header>
                <strong>{priceFormatter.format(sumary.total)}</strong>
            </S.SummaryCard>
        </S.SumaryContainer>
    )
}