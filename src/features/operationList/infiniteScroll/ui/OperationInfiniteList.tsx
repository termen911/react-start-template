import { Alert, Col, Divider, Flex, Row, Spin, Typography } from 'antd';
import React, { useEffect, useRef } from 'react';
import { OperationCard } from 'src/entities/operation/ui/OperationCard';
import { useInfiniteOperations } from '../model/useInfiniteOperations';

export const OperationInfiniteList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteOperations();

  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Ошибка загрузки операций" description={(error as Error).message} type="error" showIcon />;
  }

  const operations = data?.pages.flatMap((page) => page.data) || [];

  return (
    <Flex vertical>
      <Row align="stretch" gutter={[16, 16]}>
        {operations.length ? (
          operations.map((operation) => (
            <Col key={operation.id} xs={24} sm={12} md={8} lg={6}>
              <OperationCard operation={operation} />
            </Col>
          ))
        ) : (
          <Col xs={24}>
            <Alert message="Нет операций" type="info" showIcon />
          </Col>
        )}
      </Row>

      {hasNextPage && (
        <div ref={loader} style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Divider>
            <Spin size="small" /> Загружаем ещё...
          </Divider>
        </div>
      )}

      {!hasNextPage && operations.length > 0 && (
        <Divider dashed>
          <Typography.Text type="secondary">Выведены все операции</Typography.Text>
        </Divider>
      )}
    </Flex>
  );
};
