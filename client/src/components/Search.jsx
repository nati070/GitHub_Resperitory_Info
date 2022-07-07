import styled, { keyframes, css } from "styled-components";
import { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { MdErrorOutline, MdOpenInFull } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getResperitory } from "../features/resperitory/resperitoySlice";

const searchUtils = require("../utils/searchUtil");

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const respReducer = useSelector((state) => state);

  const [numTryFetchData, setNumTryFetchData] = useState(0);
  const [resperitory, setResperitory] = useState("");
  const [syntexErr, setSyntexErr] = useState(false);
  const [dataFetchError, setDataFetchError] = useState(false);

  useEffect(() => {
    let time;
    if (numTryFetchData != 0) {
      time = setTimeout(() => {
        if (respReducer.status == "success") {
          navigate("/result");
        } else if (respReducer.status == "loading") {
          setNumTryFetchData(numTryFetchData + 1);
        } else if (respReducer.status == "failed") {
          setDataFetchError(true);
        }
      }, 300);
    }

    return () => {
      clearTimeout(time);
    };
  }, [numTryFetchData]);

  const searchResperitory = async () => {
    if (searchUtils.isValidResperitoy(resperitory)) {
      dispatch(getResperitory(resperitory));
      setNumTryFetchData(numTryFetchData + 1);
    } else {
      setSyntexErr(true);
    }
  };
  const isEnterClick = (key) => {
    if (key == "Enter") searchResperitory();
  };

  const errorMsgSyntex = syntexErr ? (
    <DivError>
      <IconError /> incoreect syntex , example: username/resperitory
    </DivError>
  ) : (
    <></>
  );
  const errorMsgFetchData = dataFetchError ? (
    <DivError>
      <IconError />
      Problem to fetch data
    </DivError>
  ) : (
    <></>
  );

  return (
    <Div>
      <DivWrapContext>
        <Header>Statistic For A Given Github Repository</Header>
        <Div>
          <DivWrapSearch>
            <DivSearch>
              <ButtonSearch
                onClick={() => searchResperitory()}
                status={respReducer.status}
              >
                <IconSearch />
              </ButtonSearch>
              <InputSearch
                placeholder="Github Resperitory"
                onChange={(e) => setResperitory(e.target.value)}
                onKeyDown={(e) => isEnterClick(e.key)}
              />
            </DivSearch>
            {errorMsgSyntex}
            {errorMsgFetchData}
          </DivWrapSearch>
        </Div>

        <SubHeader> Note: The resperitory most be public </SubHeader>
      </DivWrapContext>
    </Div>
  );
};

export default Search;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  color: white;
`;
const DivSearch = styled.div`
  position: relative;
  border: 2px solid white;
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const InputSearch = styled.input`
  padding: 10px;
  box-sizing: border-box;
  width: 89%;
  background-color: #282c34;
  color: #d9d9d9;
  border: none;
  font-size: 20px;

  &: focus {
    outline: none;
  }
`;
const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}

`;
const ButtonSearch = styled.button`
  position: absolute;
  padding: 5px;
  width: 10%;
  top: 5px;
  right: 3px;
  border-radius: 50%;
  background-color: none;
  background-color: #282c34;
  border-color: #d9d9d9;
  cursor: pointer;

  animation: ${(props) =>
    props.status == "loading"
      ? css`
          ${rotate} 2s linear infinite
        `
      : ""};
`;
//  ${props => (props.state == "loading") ?
const IconSearch = styled(AiFillGithub)`
  padding: 1px;
  width: 20px;
  height: 100%;
  color: #d9d9d9;
`;

const IconGitHub = styled(AiFillGithub)`
  posiotion: absolute;
  cursor: pointer;
`;
const Header = styled.h1`
  text-align: center;
`;
const SubHeader = styled.h3`
  text-align: center;
`;
const DivWrapContext = styled.div`
  height: 150px;
`;

const DivError = styled.div`
  padding: 3px;
`;

const IconError = styled(MdErrorOutline)`
  width: 20px;
  height: 100%;
`;

const DivWrapSearch = styled.div``;
