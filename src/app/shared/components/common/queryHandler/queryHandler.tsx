'use client';

import React, { ReactNode } from 'react';
import { Button } from 'antd';
import Animations from '../animations';

export type QueryType = {
  isFetching: boolean; isLoading: boolean; refetch: () => void; error: unknown
}

interface Props {
  children: ReactNode;
  showLoaderOnRefetch?: boolean;
  onRetry?: () => void;
  retryLabel?: string;
  queries: QueryType[];
}

export default function QueryHandler({
  children, queries, showLoaderOnRefetch, retryLabel = 'Retry', onRetry,
}: Props) {
  const hasError = queries.some((e) => !!e.error);

  if (queries.some((e) => !!e.isFetching) && hasError) {
    return <Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />;
  }

  if (hasError) {
    return (
      <>
        Error Occured
        <Button type="link" onClick={onRetry}>{retryLabel}</Button>
      </>
    );
  }

  if (queries.some((e) => !!e.isLoading)
    || (showLoaderOnRefetch && queries.some((e) => !!e.isFetching))) {
    return <Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />;
  }

  return children;
}
