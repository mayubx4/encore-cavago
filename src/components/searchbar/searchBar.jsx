"use client";
import React, { useState } from "react";
import { AutoComplete, Input, Tabs, List } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const AutoCompleteWithTabsStyled = () => {
  const [options, setOptions] = useState([]);
  //   const [activeTab, setActiveTab] = useState("locations");

  const data = {
    locations: [
      { value: "London, United Kingdom" },
      { value: "Lahore, Pakistan" },
      { value: "Los Angeles, California, USA" },
      { value: "Lisbon, Portugal" },
      { value: "Lima, Peru" },
    ],
    activities: [
      { value: "Hiking in the Alps" },
      { value: "Snorkeling in the Caribbean" },
      { value: "Skiing in Aspen" },
    ],
  };

  const handleSearch = searchText => {
    const filteredLocations = data["locations"].filter(option =>
      option.value.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredActivities = data["activities"].filter(option =>
      option.value.toLowerCase().includes(searchText.toLowerCase())
    );
    setOptions([
      {
        locations: filteredLocations,
        activities: filteredActivities,
      },
    ]);
  };

  //   const handleTabChange = key => {
  //     setActiveTab(key);
  //     setOptions([]); // Clear options when tab changes
  //   };

  return (
    <div style={{ width: 400 }}>
      <AutoComplete
        dropdownRender={obj => {
          console.log(options);
          const [activeTab, setActiveTab] = useState("locations");

          return (
            <Tabs
              defaultActiveKey='locations'
              activeKey={activeTab}
              onChange={setActiveTab}
            >
              <TabPane tab='Locations' key='locations'>
                {options[0]?.locations?.map(item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<EnvironmentOutlined />}
                      title={item.value}
                    />
                  </List.Item>
                ))}
              </TabPane>
              <TabPane tab='Activities' key='activities'>
                {options[0]?.activities?.map(item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<EnvironmentOutlined />}
                      title={item.value}
                    />
                  </List.Item>
                ))}
              </TabPane>
              <TabPane tab='Cities' key='tab3'>
                <p>Content related to cities.</p>
              </TabPane>
            </Tabs>
          );
        }}
        
        options={options}
        style={{ width: "100%" }}
        onSearch={handleSearch}
        placeholder='Discover locations, hosts, or activities'
      >
        <Input
          size='large'
          suffix={<SearchOutlined />}
          style={{ borderRadius: 20 }}
        />
      </AutoComplete>

      {/* <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab='All' key='all' />
        <TabPane tab='Locations' key='locations' />
        <TabPane tab='Activities' key='activities' />
      </Tabs> */}
    </div>
  );
};

export default AutoCompleteWithTabsStyled;
