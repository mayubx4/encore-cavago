'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Space } from 'antd';
import Text from '@shared/wrappers/Text';
import parse from 'html-react-parser';
import './_collpasedText.scss';

export default function CollapsedText({
  description,
  maxHeight,
  side,
}: {
  description: string;
  maxHeight: number;
  side: string;
}) {
  const [showExpand, setShowExpand] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && contentRef.current.scrollHeight > maxHeight) {
      setShowExpand(true);
    }
  }, [maxHeight, description]);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Space direction="vertical">
      <div
        ref={contentRef}
        className={expanded ? 'expanded' : 'collapsed'}
        style={{ maxHeight: expanded ? 'none' : maxHeight, overflow: 'hidden' }}
      >
        <Text>
          {parse(description)}
        </Text>
      </div>
      {showExpand && (
        <div>
          <p onClick={handleToggleExpand} className={`expand ${side}`}>
            {expanded ? 'See less' : 'See more'}
          </p>
        </div>
      )}
    </Space>
  );
}
