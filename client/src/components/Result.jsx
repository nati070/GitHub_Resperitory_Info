import styled from "styled-components";
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Result = (props) => {
    const navigate = useNavigate()
    const respReducer = useSelector(state => state.resperitory_data)
    const navigateToSearch = ()=>{
        navigate("/")
    }


    useEffect(()=>{
        if(Object.keys(respReducer).length == 0){
            navigate("/")
        }
    },[respReducer])
    
    let  contributorsList
    if(Object.keys(respReducer).length != 0){
    contributorsList = respReducer['five_contributors_data'].map( (contributor,index) =>  <tr key = {index}>
        <Th> <img src={contributor.avatar} width="50px" height="50px"/> </Th>
        <Th> {contributor.name} </Th>
        <Th> {contributor.added}</Th>
        <Th> {contributor.removed}</Th>
      </tr>)
    }

  
  return (
    <Div>
      <IconRestart onClick={navigateToSearch}/>
      <DivLeft>
        <UlRespDetails>
          <Li> Organztion Name :  {respReducer['organztion_name']};</Li>
          <Li> Respository Name : {respReducer['respeitory_name']}</Li>
          <Li> Number of Stars : {respReducer['stars']}</Li>
          <Li> Number Of Subscribers : {respReducer['number_of_subscribers']}</Li>
          <Li> Number Of Issues: {respReducer['issues']}</Li>
          <Li> Total Contributer : {respReducer['total_contributors']}</Li>
        </UlRespDetails>
      </DivLeft>
      <DivRight>
        <DivWrapper>
          <Header> 5 Contributors Table</Header>
          <TableContribters>
          <tbody>
            <tr>
              <Th> Avatar </Th>
              <Th> Full Nname </Th>
              <Th> Code Added</Th>
              <Th> Code Removed</Th>
            </tr>
            {contributorsList}
            </tbody>
          </TableContribters>
        </DivWrapper>
      </DivRight>
    </Div>
  );
};
export default Result;

const Div = styled.div`
  display: flex;
  color: white;
  height: 100%;
  width: 100%;
`;
const DivLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
`;

const DivRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  border-left: 1px solid white;
`;

const UlRespDetails = styled.ul`
  list-style-type: square;
`;
const Li = styled.li`
  padding: 10px;
  font-size: 20px;
`;

const Header = styled.h1`
  display: flex;
  justify-content: center;
`;

const TableContribters = styled.table``;
const Th = styled.th`
  padding: 5px;
`;

const Td = styled.td`
  padding: 5px;
`;
const DivWrapper = styled.div``;

const IconRestart = styled(VscDebugRestart)`
  padding: 20px;
  font-size: 25px;
  cursor: pointer;

`;
