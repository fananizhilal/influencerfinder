import React, { Component } from "react";
import {
  Text,
  Pressable,
  Box,
  HStack,
  Image,
  Input,
  Center,
  FlatList,
} from "native-base";

import { Header } from "../components";
import { Ionicons } from "@expo/vector-icons";

class Pencarian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      searchText: "",
      searchResults: [],
      rekomendasi: [],
      populer: [],
    };
  }

  async getinfluencer() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/fananizhilal/staticinfluncerAPI/main/listInfluencerrr"
      );
      const json = await response.json();
      this.setState({
        populer: json.influencer2,
        rekomendasi: json.influencer,
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getinfluencer();
  }

  searchFilterFunction = (text) => {
    if (text === "") {
      this.setState({ searchResults: [] });
    } else {
      const newData = this.state.populer
        .concat(this.state.rekomendasi)
        .filter((item) => {
          const itemData = `${item.name}`;
          const textData = text;
          return itemData.indexOf(textData) > -1;
        });
      this.setState({ searchResults: newData, searchText: text });
    }
  };

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <Box px={"10px"}>
        <Pressable
          w="100%"
          h="45px"
          p={"5px"}
          borderRadius="70"
          alignSelf="center"
          onPress={() =>
            navigation.navigate(
              "Profil Influencer",
              { rekomendasi: item },
              { populer: item }
            )
          }
        >
          <HStack>
            <Box w="90%">
              <Text
                marginLeft={"15px"}
                marginTop={"6px"}
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.name}
              </Text>
            </Box>
            <Box py={"8px"}>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="#C689C6"
              />
            </Box>
          </HStack>
        </Pressable>
      </Box>
    );
  };
  render() {
    const { searchResults } = this.state;
    return (
      <Box flex={1} bg="#FFFFFF" safeArea={true}>
        <Box flex="1">
          <Header title="Pencarian" />
          <Input
            placeholder="  Cari influencer"
            backgroundColor={"#E8D0E8"}
            onChangeText={(text) => {
              this.setState({ search: text });
              if (text === "") {
                this.setState({ searchResults: [] });
              } else {
                this.searchFilterFunction(text);
              }
            }}
            variant="filled"
            width="90%"
            alignSelf={"center"}
            borderRadius="70"
            py="1"
            px="2"
            marginTop={"25px"}
            marginBottom={"10px"}
            InputRightElement={
              <Ionicons
                as={<Ionicons name="search" />}
                size={18}
                mr="2"
                color="#FFFFF"
              />
            }
          />
          {!searchResults || searchResults.length === 0 ? (
            <Center flex={1}>
              <Image
                source={require("../assets/pencarian.png")}
                w={"217px"}
                h={"200px"}
                alignSelf="center"
                alignItems="center"
                alt="Avatar"
              />
              <Text
                fontStyle="normal"
                fontSize={"12px"}
                color="#E8D0E8"
                textAlign="center"
              >
                Cari influencer berdasarkan nama
              </Text>
            </Center>
          ) : (
            <FlatList
              data={searchResults}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
            />
          )}
        </Box>
      </Box>
    );
  }
}

export default Pencarian;
