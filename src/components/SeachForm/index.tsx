import { MagnifyingGlass } from 'phosphor-react'
import * as S from './styles'

export function SeachForm(){
  return (
    <S.SeachFormConteiner>
      <input type="text" placeholder='Busque uma transação'/>
      <button>
        <MagnifyingGlass size={20}/>
        Buscar
      </button>
    </S.SeachFormConteiner>
  )
}