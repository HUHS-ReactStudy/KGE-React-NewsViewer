import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import { useEffect, useState } from 'react';
import usePromise from '../lib/usePromise';

// API를 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환하여 렌더링해주는 컴포넌트

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `$category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=eef7a76de4a640d4b4d28b04892e40e7`
    );
  }, [category]);

  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  } // 대기 중일 때

  if (!response) {
    return null;
  } // response 값이 아직 설정되지 않았을 때

  if (error) {
    return <NewsListBlock>에러 발생</NewsListBlock>;
  } // 에러가 발생했을 때

  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  ); // response 값이 유효할 때
}; // usePromise 커스텀 Hook을 사용

// const NewsList = ({ category }) => {
//   const [articles, setArticles] = useState(null);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const query = category === 'all' ? '' : `&category=${category}`;
//         const response = await axios.get(
//           `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=eef7a76de4a640d4b4d28b04892e40e7`
//         );
//         // 현재 category 값에 따라 요청할 주소가 동적으로 바뀜
//         setArticles(response.data.articles);
//       } catch (e) {
//         console.log(e);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, [category]);
//   // useEffect를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API 요청
//   // useEffect에 등록하는 함수에 async x, 함수 내부에 async 키워드가 붙은 또 다른 함수 만들어서 사용
//   // category 값이 바뀔 때마다 뉴스를 새로 불러와야 하기 때문에, useEffect의 의존배열(두 번째 파라미터)에 category 넣음

//   if (loading) {
//     return <NewsListBlock>대기중...</NewsListBlock>;
//   } // 대기중일 때

//   if (!articles) {
//     return null;
//   }
//   // articles 값이 아직 설정되지 않았을 때
//   // 이 작업을 하지 않으면 렌더링 과정에서 오류가 발생

//   return (
//     <NewsListBlock>
//       {articles.map((article) => (
//         <NewsItem key={article.url} article={article} />
//       ))}
//     </NewsListBlock>
//   );
// };

export default NewsList;
