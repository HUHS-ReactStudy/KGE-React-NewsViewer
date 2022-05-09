import { useCallback, useState } from 'react';
import Categories from './components/Categories';
import NewsList from './components/NewsList';
import { Route, Routes } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NewsPage />} />
      <Route path="/:category" element={<NewsPage />} />
    </Routes>
  );
  // 카테고리 값을 리액트 라우터의 URL 파라미터를 사용하여 관리

  // const [category, setCategory] = useState('all');
  // const onSelect = useCallback((category) => setCategory(category), []); // category 값을 업데이트하는 함수
  // return (
  //   <>
  //     <Categories category={category} onSelect={onSelect} />
  //     <NewsList category={category} />
  //   </>
  // );
  // 카테고리 값을 useState로 관리
};

export default App;
