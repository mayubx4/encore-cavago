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
      <Flex align='center' justify='center' gap={32}>
        <Button
          type='text'
          className='!text-sm desktop:!text-base'
          style={{
            color: "white",
            padding: 0,
            paddingBottom: "10px",
            fontWeight: 500,
          }}
        >
          Experiences
        </Button>
        <Button
          type='text'
          className='!text-sm desktop:!text-lg'
          style={{
            color: "#E3B8AF",
            borderBottom: "2px solid #E3B8AF",
            borderRadius: 0,
            padding: 0,
            paddingBottom: "10px",
            fontWeight: 600,
          }}
        >
          Holidays with Cavago
        </Button>
        <Button
          type='text'
          className='!text-sm desktop:!text-base'
          style={{
            color: "white",
            padding: 0,
            paddingBottom: "10px",
            fontWeight: 500,
          }}
        >
          Competitions
        </Button>
      </Flex>

      <Flex vertical justify='space-between' className='xxldesktop:mt-10 mt-7'>
        <Title
          style={{ textAlign: "center", color: "white", fontWeight: 500 }}
          className='xxldesktop:!text-6xl desktop:!text-[42px] !text-[32px]'
        >
          What are you looking for?
        </Title>
        <Title
          level={2}
          style={{ textAlign: "center", color: "white" }}
          className='xxldesktop:!text-[28px] desktop:!text-[20px] !text-base !m-0'
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

        <Flex vertical align='center' gap={8} className='xxldesktop:mt-8 mt-4'>
          <Typography
            className='desktop:!text-lg !text-base'
            style={{
              color: "white",
            }}
          >
            Discover Holiday Packages
          </Typography>
          <MouseIcon />
        </Flex>
      </Flex>
      <Flex
        align='center'
        className='bg-[#F7F3F2] md:w-9/12 w-full md:mx-auto mx-3 xxldesktop:mt-11 mt-4'
        style={{
          borderRadius: "16px",
          maxWidth: "1103px",
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
