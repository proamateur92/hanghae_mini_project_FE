import styled from 'styled-components';


const PageNotFound = () => {
  return (
    <NotFoundWrap>
      <img src="https://images.velog.io/images/darkfairy7/post/5a35c211-6b11-4890-b192-2efcdd9ea246/banner-rtan.png" alt="르탄이" />
      <h1>해당 페이지를 찾을 수 없습니다.</h1>
    </NotFoundWrap>
  );
};

export default PageNotFound;

const NotFoundWrap = styled.div`
  display: flex;
  flex-direction:column;
  width:100vw;
  height:100vh;
  text-align:center;
  align-items: center;
  justify-content:center;
`;