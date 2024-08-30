import React from 'react';
import {
  Row, Col, Typography, Checkbox,
} from 'antd';
import { useWhichDeviceContext } from '@shared/hooks/whichDeviceContext';
import CustomCheckbox from '../customCheckbox/customCheckbox';
import './_subCategoryFilter.scss';

interface SubCategoriesType {
  title: string;
  id: number;
  equine_main_activity_id: number;
}

const { Title } = Typography;

interface SubCategoryFilterProps {
  mainCategoryTitle: string;
  selectedSubCategories: number[] | null | undefined;
  subCategories: SubCategoriesType[];
  onChangeSubCategory: (value: number[]) => void;
}

function SubCategoryFilter({
  subCategories, mainCategoryTitle, onChangeSubCategory, selectedSubCategories,
}: SubCategoryFilterProps) {
  const device = useWhichDeviceContext();

  const handleCheckboxChange = (value: number, remove = false) => {
    if (remove) {
      onChangeSubCategory(selectedSubCategories?.filter((element) => element !== value) || []);
    } else {
      onChangeSubCategory(selectedSubCategories ? [...selectedSubCategories, value] : [value]);
    }
  };

  return (
    <div className="subCategoryCheckboxTextContainer">
      <Title level={5} className="subCategoryFilterHeading">{mainCategoryTitle}</Title>
      <Row
        gutter={device === 'mobile' ? [0, 0] : [40, 12]}
        align="middle"
      >
        {subCategories?.map(({ title, id }) => (
          <Col className={`customCheckboxRow ${mainCategoryTitle === 'Lessons & Clinics' ? 'customCheckboxLongRow' : ''}`} key={id}>
            <CustomCheckbox
              title={title}
              id={id}
              onChange={handleCheckboxChange}
              value={selectedSubCategories?.includes(id)}
              spaceBetween={device === 'mobile'}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SubCategoryFilter;
