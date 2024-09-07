"use client";
import { Button, Flex, Typography } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import MouseIcon from "@public/assets/images/mouse.svg";
import SwiperSlider from "../swiper/swiperSlider";
import SearchField from "@shared/components/desktop/header/searchField";
import "@shared/components/desktop/header/_header.scss";
import { HomeFiltersContextProvider } from "@shared/hooks/homeFiltersContext";
import { DEFAULT_CATEGORY_ID, SearchCategories } from "@shared/constants/home";
import FiltersModal from "@shared/components/desktop/filtersModal/filterModal";
import useToggle from "@shared/hooks/useToggle";
import Icon from "@shared/components/common/icons";
import colors from "@shared/theme/colors";

const HomeHero = () => {
  const [openFilter, toggleOpenFilter] = useToggle();

  const props = {
    categoryId: DEFAULT_CATEGORY_ID,
    subCategoryIds: null,
    search: null,
    searchCategory: SearchCategories.All,
    filter: null,
  };
  return (
    <div>
      <Flex align='center' justify='center'>
        <Button type='text' style={{ color: "white", padding: "20px" }}>
          Experiences
        </Button>
        <Button
          type='text'
          style={{
            color: "#A37B7B",
            borderBottom: "1px solid #A37B7B",
            borderRadius: 0,
            padding: "20px",
          }}
        >
          Holidays with Cavago
        </Button>
        <Button type='text' style={{ color: "white", padding: "20px" }}>
          Competitions
        </Button>
      </Flex>
      <Title style={{ textAlign: "center", fontSize: "60px", color: "white" }}>
        What are you looking for?
      </Title>
      <Title
        level={2}
        style={{ textAlign: "center", fontSize: "28px", color: "white" }}
      >
        Plan an equestrian holiday you&apos;ll never forget!
      </Title>
      <Flex justify='center' gap={20} className='px-40'>
        <HomeFiltersContextProvider {...props}>
          <div className='serch-head-holder'>
            <SearchField />
            <button
              className='filtersButton btn-outline bg-white h-full'
              onClick={() => toggleOpenFilter()}
            >
              Filters
              <Icon
                name='filters'
                color={colors.neutrals[500]}
                width={24}
                height={24}
              />
            </button>
            <FiltersModal open={openFilter} toggleOpen={toggleOpenFilter} />
          </div>
        </HomeFiltersContextProvider>
      </Flex>

      <Flex vertical align='center'>
        <Typography
          style={{
            fontSize: "18px",
            color: "white",
            // textAlign: "center",
            marginTop: "34px",
            marginBottom: "8px",
          }}
        >
          Discover Holiday Packages
        </Typography>
        <MouseIcon />
      </Flex>
      <Flex
        align='center'
        className='bg-[#F7F3F2] md:w-9/12 w-full md:mx-auto mx-3'
        style={{
          borderRadius: "16px",
          maxWidth: "1103px",
          // height: "211px",
          marginTop: "44px",
          padding: "24px",
          position: "relative",
          zIndex: 5,
        }}
        gap={24}
      >
        <SwiperSlider />
      </Flex>
    </div>
  );
};

export default HomeHero;
