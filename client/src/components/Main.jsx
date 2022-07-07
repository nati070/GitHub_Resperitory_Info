import styled from 'styled-components'
import {Route , Routes} from 'react-router-dom'
import Search from './Search'
import Result from './Result'

const Main = ()=>{
   


    return <Div>
        <Routes>
        <Route path='/' element = {<Search/>} />
        <Route path='/result' element = {<Result/>}/>
        </Routes>
    </Div>
}

export default Main

const Div = styled.div`
    height: 100vh;
    background-color: #282c34;

`