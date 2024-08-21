import React, { Component } from "react";
import { Box, Text, FlatList, VStack, Pressable, Image } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header } from "../components";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      bookmarkList: [],
      isFetching: false,
    };
  }

  onRefresh() {
    this.setState({ isFetching: true }, () => {
      this.getBookmarkedList();
    });
  }

  getBookmarkedList = async () => {
    try {
      const value = await AsyncStorage.getItem("@influencer");
      if (value !== null) {
        const allData = JSON.parse(value);
        this.setState({ bookmarkList: allData });
      } else {
        console.log("tidak ada data");
      }
    } catch (e) {
      console.log("Error");
      console.error(e);
    } finally {
      this.setState({ isFetching: false });
    }
  };

  componentDidMount() {
    this.getBookmarkedList();
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <VStack py={"5px"}>
        <Pressable
          shadow="1"
          w="97%"
          h="40px"
          py={"5px"}
          px={"15px"}
          borderRadius="70"
          bg="#FFFFFF"
          alignSelf="center"
        >
          <Text fontSize={"16px"} color="#bf7cbf">
            {item.username}
          </Text>
        </Pressable>
      </VStack>
    );
  };

  render() {
    return (
      <Box flex={1} bg="#FFFFFF" safeArea={true}>
        <Header title="Wishlist" />
        {this.state.bookmarkList.length > 0 ? (
          <Box px={"20px"} pt={"25px"} pb={"20px"} marginTop={"1px"}>
            <FlatList
              data={this.state.bookmarkList}
              keyExtractor={(item) => item.username}
              renderItem={this.renderItem}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
            />
          </Box>
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Image
              source={require("../assets/wishlist.png")}
              style={{ width: 200, height: 200 }}
            />
            <Text
              fontStyle="normal"
              fontSize={"12px"}
              color="#E8D0E8"
              textAlign="center"
            >
              Anda belum memiliki wishlist!
            </Text>
          </Box>
        )}
      </Box>
    );
  }
}

export default Wishlist;
