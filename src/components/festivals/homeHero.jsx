"use client";
import { Button, Flex, Typography } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import MouseIcon from "@public/assets/images/mouse.svg";
import SwiperSlider from "../swiper/swiperSlider";
import SearchFieldMobile from "@shared/components/mobile/searchField/searchField";
import SearchField from "@shared/components/desktop/header/searchField";
import "@shared/components/desktop/header/_header.scss";
import { HomeFiltersContextProvider } from "@shared/hooks/homeFiltersContext";
import { DEFAULT_CATEGORY_ID, SearchCategories } from "@shared/constants/home";
import FiltersModalMobile from "@shared/components/mobile/filtersModal/filterModal";
import FiltersModal from "@shared/components/desktop/filtersModal/filterModal";
import useToggle from "@shared/hooks/useToggle";
import Icon from "@shared/components/common/icons";
import colors from "@shared/theme/colors";
import "./_homeMobile.scss";
import SearchScreen from "@shared/components/common/searchScreen/searchScreen";

const HomeHero = ({ children }) => {
  const [openFilter, toggleOpenFilter] = useToggle();
  const [openFilterMobile, toggleOpenFilterMobile] = useToggle();
  const [searchBy, setSearchBy] = useState("");
  const [showSearchScreen, setShowSearchScreen] = useState(false);

  const props = {
    categoryId: DEFAULT_CATEGORY_ID,
    subCategoryIds: null,
    search: null,
    searchCategory: SearchCategories.All,
    filter: null,
  };
  const onChangeSearchBy = value => {
    setSearchBy(value);
  };

  // useEffect(() => {
  //   if(showSearchScreen)
  //     document.q
  // }, [showSearchScreen]);
  return (
    <>
      {" "}
      <div>
        <Flex align='center' justify='center' className='md:gap-8 gap-3'>
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

        <Flex
          vertical
          justify='space-between'
          className='xxldesktop:mt-10 mt-7'
        >
          <Title
            style={{ textAlign: "center", color: "white", fontWeight: 500 }}
            className='xxldesktop:!text-6xl desktop:!text-[42px] !text-[32px] '
          >
            What are
            <br className='block md:hidden' /> you looking for?
          </Title>
          <Title
            level={2}
            style={{ textAlign: "center", color: "white" }}
            className='xxldesktop:!text-[28px] desktop:!text-[20px] !text-base !m-0'
          >
            Plan an equestrian holiday
            <br className='block md:hidden' /> you&apos;ll never forget!
          </Title>
          <Flex justify='center' gap={20} className='lg:px-40'>
            <HomeFiltersContextProvider {...props}>
              <div className='serch-head-holder !hidden lg:!flex'>
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
              <div className='headerContainer !flex lg:!hidden w-full mt-4 px-5'>
                <SearchFieldMobile
                  onChangeSearchBy={onChangeSearchBy}
                  toggleOpenFilter={toggleOpenFilterMobile}
                  showSearchScreen={showSearchScreen}
                  setShowSearchScreen={setShowSearchScreen}
                  onCancelLink='/holidays'
                />
                <FiltersModalMobile
                  open={openFilterMobile}
                  toggleOpen={toggleOpenFilterMobile}
                />
              </div>
              {showSearchScreen && (
                <div className='searchScreenContainerHome absolute bg-white z-20 w-full  mt-16'>
                  <SearchScreen
                    searchBy={searchBy}
                    setShowSearchScreen={setShowSearchScreen}
                  />
                </div>
              )}
            </HomeFiltersContextProvider>
          </Flex>

          <Flex
            vertical
            align='center'
            gap={8}
            className='xxldesktop:mt-8 mt-4'
          >
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
          className='bg-[#F7F3F2] md:w-9/12 md:mx-auto mx-3 xxldesktop:mt-11 mt-4 p-4 md:p-6'
          style={{
            borderRadius: "16px",
            maxWidth: "1103px",
            position: "relative",
            zIndex: 5,
          }}
          gap={24}
        >
          <SwiperSlider />
        </Flex>
      </div>
      <div className='bg-[#F7F3F2] -mt-24 !pt-24'>
        {!showSearchScreen ? children : <div className="h-64 bg-white"/>}
      </div>
    </>
  );
};

export default HomeHero;
