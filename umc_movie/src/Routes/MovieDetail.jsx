import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCredit, getDetail } from "../api";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0, 0.7);
  position: fixed;
  z-index: 90;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-direction: center;
  padding: 50px;
`;
const Poster = styled.img`
  display: flex;
  width: 270px;
  height: 400px;
  margin-left: 50px;
`;
const Content = styled.div`
  padding: 60px;
  margin: 20px;
  margin-right: 60px;
`;
const Title = styled.h2`
  color: white;
  font-size: 24px;
`;
const Text = styled.p`
  color: white;
  font-size: 18px;
  display: flex;
  flex-wrap: wrap;
`;
const SubText = styled.div`
  color: white;
  font-weight: bolder;
`;
const CloseButton = styled.button`
  position: absolute;
  display: flex;
  text-align: right;
`;
const CreditWrapper = styled.div`
  margin-top: 20px;
`;
const CreditItem = styled.div`
  color: white;
  font-size: 18px;
  margin-bottom: 10px;
`;

export function Detail() {
  const [detail, setDetail] = useState({});
  const [credit, setCredit] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getDetails = async () => {
    const result = await getDetail(id);
    setDetail(result);
  };

  const getCredits = async () => {
    const result = await getCredit();
    if (result && result.credits) {
      setCredit(result.credits);
    }
  };

  useEffect(() => {
    getDetails();
    getCredits();
  }, [id]);

  const closeDetail = () => {
    navigate(-1); // 뒤로가기
  };
  const renderStars = (rating) => {
    const numStars = Math.floor(rating); // 평점을 2로 나누어서 별의 개수를 결정
    return "⭐".repeat(numStars); // 별의 개수만큼 별 표시
  };
  return (
    <Wrapper>
      {detail && (
        <>
          <Poster
            src={`https://image.tmdb.org/t/p/w1280/${detail.backdrop_path}`}
          />
          <Content>
            <Title>{detail.title}</Title>
            <SubText>평점</SubText>
            <Text>{renderStars(detail.vote_average)}</Text>
            <Text>개봉일 {detail.release_date}</Text>

            {detail.overview ? (
              <>
                <SubText>줄거리</SubText>
                <Text>{detail.overview}</Text>
              </>
            ) : (
              <Text>TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다.</Text>
            )}

            <CreditWrapper>
              <SubText>출연진</SubText>
              {credit.map((actor) => (
                <CreditItem key={actor.id}>
                  {" "}
                  <img src={actor.profile_path} alt={actor.name} />
                  <div>{actor.name}</div>
                </CreditItem>
              ))}
            </CreditWrapper>
          </Content>
          <CloseButton onClick={closeDetail}>닫기</CloseButton>
        </>
      )}
    </Wrapper>
  );
}
