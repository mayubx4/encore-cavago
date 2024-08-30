import React from 'react';
import {
  Row, Col, Button, Typography,
} from 'antd';
import './_mainCategoryFilter.scss';

interface SubCategoriesType {
  title: string;
  id: number | null | undefined;
  equine_main_activity_id: number;
}

interface MainCategoryFilterProps {
  categories: {
    title: string;
    id: number;
    sub_categories: SubCategoriesType[];
  }[] | undefined;
  selectedCategoryId: number | null | undefined;
  onChangeSelectedCategoryId: (id: number) => void;
}

function MainCategoryFilter({
  categories, selectedCategoryId, onChangeSelectedCategoryId,
}: MainCategoryFilterProps) {
  return (
    <Row gutter={[0, 16]} className="mainCategoryFilterContainer">
      <Col span={24}>
        <Typography.Title level={5} className="mainCategoryFilterHeading">
          Activity Type
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]} className="mainCategoriesContainer">
          {categories?.map((link, i) => (
            <Col xs={12} sm={12} md={{ flex: 'auto' }} lg={{ flex: 'auto' }} xl={{ flex: 'auto' }} key={i}>
              <Button
                type="default"
                onClick={() => onChangeSelectedCategoryId(link.id)}
                className={`mainCategoryFilterButton ${link.id === selectedCategoryId ? 'activeMainCategoryFilter' : ''}`}
              >
                {link.title}
              </Button>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default MainCategoryFilter;
