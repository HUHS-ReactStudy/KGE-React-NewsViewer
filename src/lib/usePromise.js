import { useState, useEffect } from 'react';

// usePromise 커스텀 Hook
// Promise의 대기중, 완료 결과, 실패 결과에 대한 상태 관리
// usePromise의 의존배열 deps를 파라미터로 받음

export default function usePromise(promiseCreator, deps) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);
  // 대기중, 완료, 실패에 대한 상태 관리

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const resolved = await promiseCreator();
        setResolved(resolved);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error];
}
