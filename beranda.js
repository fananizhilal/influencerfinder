import React, { Component } from "react";
import {
  Text,
  Box,
  HStack,
  ScrollView,
  VStack,
  Pressable,
  Image,
  FlatList,
  Avatar,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Separator from "../components/separator";
import { Header } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Beranda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rekomendasi: [],
      populer: [],
      bookmarkList: [], // buat nyimpan list yang sudah dibookmark, yang nanti dimasukan ke asyncstorage
      isFetching: false,
    };
  }

  onRefresh() {
    this.setState({ isFetching: true }, () => {
      this.getinfluencer();
    });
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
        isFetching: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // tambah item yang
  // item ini data dari apinya
  handleAddToBookmark = (item) => {
    const prevList = this.state.bookmarkList;
    // jadi konsepnya setelah setState, maka jalankan fungsi async storage
    this.setState(
      {
        // jadi tiap item pada asyncstorage atau bookmarklist strukturnya ada 2 key
        // username selaku id unik penanda data
        // data yaitu data dari api
        bookmarkList: [...prevList, { username: item.username, data: item }],
      },
      () => {
        try {
          console.log("try to add");
          console.log(this.state.bookmarkList);
          AsyncStorage.setItem(
            "@influencer",
            JSON.stringify(this.state.bookmarkList) // karena asyncstorage nyimpanya string maka perlu kita ubah ke string
          );
        } catch (e) {
          console.log("Error add bookmark: in beranda.js");
          console.error(e.message);
        }
      }
    );
  };

  // buat delete data dari bookmarklist sekaligus dari asyncstorage
  //
  handleDeleteBookmark = (index) => {
    // filter bookmarklist berdasarkan index, index ini
    // nanti didapatkan dari fungsi lain
    // filter ini akan menghasilkan list baru
    const deletedList = this.state.bookmarkList.filter(
      (list, listIndex) => listIndex !== index
    );
    this.setState({ bookmarkList: deletedList }, () => {
      try {
        AsyncStorage.setItem(
          "@influencer",
          JSON.stringify(this.state.bookmarkList)
        );
        console.log("delete item");
        console.log(this.state.bookmarkList);
      } catch (e) {
        console.log("Error delete bookmark: in beranda.js");
        console.error(e.message);
      }
    });
  };

  // buat nyari index pada item berdasarkan username
  // menggunakan username sebagai id unik nya
  // return index berupa integer
  findItemIndex = (id) => {
    const data = this.state.bookmarkList;
    return data.findIndex((el) => el.username == id);
  };

  // buat nyari apakah username ada pada bookmarklist
  // return true jika ada return false jika tidak ada
  // digunakan untuk menentukan apakah item yang diklik
  // harus di delete atau di tambah
  // dan juga digunakan untuk menentukan bentuk icon bookmark OR borkmark-outline
  findItemUsername = (id) => {
    const data = this.state.bookmarkList;
    return !!data.find((el) => el.username == id);
  };

  // fungsi ini yang menghandle item dibookmark atau tidak
  // dipanggil pada icon atau button bookmark
  handleBookmark = (item) => {
    const isItemInList = this.findItemUsername(item.username);

    // console.log(isItemInList);
    // jika item ada dalam whislist maka hapus item tersebut
    if (isItemInList) {
      const indexItem = this.findItemIndex(item.username);
      this.handleDeleteBookmark(indexItem);
      return;
    }

    // jika belum ada maka tambahkan item
    this.handleAddToBookmark(item);
  };

  // get list bookmark pada async storage
  // nanti dipanggil di component didmount
  getBookmarkedList = async () => {
    try {
      const value = await AsyncStorage.getItem("@influencer");
      if (value !== null) {
        const allData = JSON.parse(value);
        // console.log(allData);
        this.setState({ bookmarkList: allData });
      } else {
        console.log("tidak ada data");
      }
    } catch (e) {
      console.log("Error get ");
      console.error(e);
    } finally {
      this.setState({ isFetching: false });
    }
  };

  componentDidMount() {
    this.getBookmarkedList();
    this.getinfluencer();
    // console.log(this.findItemUsername("farida.nurhan"));
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <Pressable
        w="97%"
        h="60px"
        p={"5px"}
        borderRadius="70"
        bg="#FFFFF"
        alignSelf="center"
        onPress={() =>
          navigation.navigate("Profil Influencer", { populer: item })
        }
      >
        <HStack>
          <Box width={"15%"} height={"100%"} py={"2px"}>
            <Avatar
              source={{ uri: item.fotoprofil }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 500,
                borderWidth: 2,
                borderColor: "#C689B0",
                marginLeft: 12,
              }}
              alt="Thumbnail foto profil"
            ></Avatar>
          </Box>
          <VStack width={"75%"} px={"25px"}>
            <Text fontStyle="normal" fontSize={"16px"} color="#bf7cbf">
              {item.name}
            </Text>
            <HStack>
              <Ionicons name="person-sharp" size={19} color="#bf7cbf" />
              <Text
                fontStyle="normal"
                fontSize={"14px"}
                color="#bf7cbf"
                px={"5px"}
              >
                {item.followers}
              </Text>
              <Ionicons name="heart" size={20} color="#bf7cbf" />
              <Text
                fontStyle="normal"
                fontSize={"14px"}
                color="#bf7cbf"
                px={"5px"}
              >
                {item.countlike}
              </Text>
            </HStack>
          </VStack>
          <Pressable
            width={"50%"}
            height={"100%"}
            py={"12px"}
            onPress={() => this.handleBookmark(item)}
          >
            <Ionicons
              name={
                this.findItemUsername(item.username)
                  ? "bookmark"
                  : "bookmark-outline"
              }
              size={22}
              color="#bf7cbf"
            />
          </Pressable>
        </HStack>
      </Pressable>
    );
  };

  renderItem2 = ({ item }) => {
    const { navigation } = this.props;
    return (
      <Pressable
        w="97%"
        h="60px"
        p={"5px"}
        borderRadius="70"
        bg="#FFFFF"
        alignSelf="center"
        onPress={() =>
          navigation.navigate("Profil Influencer", { rekomendasi: item })
        }
      >
        <HStack>
          <Box width={"15%"} height={"100%"} py={"2px"}>
            <Image
              source={{ uri: item.fotoprofil }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 500,
                borderWidth: 2,
                borderColor: "#C689B0",
                marginLeft: 12,
              }}
              alt="Thumbnail foto profil"
            />
          </Box>
          <VStack width={"75%"} px={"35px"}>
            <Text fontStyle="normal" fontSize={"16px"} color="#bf7cbf">
              {item.name}
            </Text>
            <HStack>
              <Ionicons name="person-sharp" size={19} color="#bf7cbf" />
              <Text
                fontStyle="normal"
                fontSize={"14px"}
                color="#bf7cbf"
                px={"5px"}
              >
                {item.followers}
              </Text>
              <Ionicons name="heart" size={20} color="#bf7cbf" />
              <Text
                fontStyle="normal"
                fontSize={"14px"}
                color="#bf7cbf"
                px={"5px"}
              >
                {item.countlike}
              </Text>
            </HStack>
          </VStack>
          <Pressable
            width={"50%"}
            height={"100%"}
            py={"12px"}
            onPress={() => this.handleBookmark(item)}
          >
            <Ionicons
              name={
                this.findItemUsername(item.username)
                  ? "bookmark"
                  : "bookmark-outline"
              }
              size={22}
              color="#bf7cbf"
            />
          </Pressable>
        </HStack>
      </Pressable>
    );
  };

  render() {
    return (
      <Box flex={1} bg="#FFFFFF" safeArea={true}>
        <Header title="Beranda" />
        <ScrollView px={"20px"} pt={"10px"} pb={"20px"} marginTop={"1px"}>
          <Text
            color="#bf7cbf"
            fontSize={"16px"}
            textAlign="left"
            fontWeight={"bold"}
            fontStyle="normal"
          >
            Rekomendasi
          </Text>
        </ScrollView>

        <Separator height={"3"} />

        <FlatList
          data={this.state.rekomendasi}
          keyExtractor={({ link }) => link}
          renderItem={this.renderItem2}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
        />
        <ScrollView px={"20px"} pt={"10px"} pb={"23px"}>
          <Text
            color="#bf7cbf"
            fontSize={"16px"}
            textAlign="left"
            fontWeight={"bold"}
            fontStyle="normal"
          >
            Populer
          </Text>
        </ScrollView>
        <Separator height={"3"} />
        <FlatList
          data={this.state.populer}
          keyExtractor={({ link }) => link}
          renderItem={this.renderItem}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
        />
      </Box>
    );
  }
}

export default Beranda;
