import React, { Component } from "react";
import { Linking } from "react-native";
import { Text, Pressable, ScrollView, Box, HStack, VStack } from "native-base";
import Separator from "../components/separator";
import { Header } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "native-base";

class ProfilInfluencer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailUser: {},
    };
  }

  handleOpenInstagram = () => {
    const { populer, rekomendasi } = this.props.route.params;
    let instagramUsername;
    if (populer && populer.username) {
      instagramUsername = populer.username;
    } else if (rekomendasi && rekomendasi.username) {
      instagramUsername = rekomendasi.username;
    }

    Linking.openURL(`https://instagram.com/${instagramUsername}`);
  };

  handleOpenPhone = () => {
    const { populer, rekomendasi } = this.props.route.params;
    let phoneNumber;
    if (populer && populer.nomertelpon) {
      phoneNumber = populer.nomertelpon;
    } else if (rekomendasi && rekomendasi.nomertelpon) {
      phoneNumber = rekomendasi.nomertelpon;
    }
    Linking.openURL(`tel:${phoneNumber}`);
  };

  handleOpenEmail = () => {
    const { populer, rekomendasi } = this.props.route.params;
    let Email;
    if (populer && populer.email) {
      Email = populer.email;
    } else if (rekomendasi && rekomendasi.email) {
      Email = rekomendasi.email;
    }
    Linking.openURL(`mailto:${Email}`);
  };

  getData(username) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "36579652a8mshc29bc89a51fa683p13d3e8jsn59ea9587660f",
        "X-RapidAPI-Host": "instagram-profile1.p.rapidapi.com",
      },
    };

    fetch(
      `https://instagram-profile1.p.rapidapi.com/getprofile/${username}`,
      options
    )
      .then((response) => response.json())
      .then((json) => this.setState({ detailUser: json })
      )
      .then(response => console.log(response))
	    .catch(err => console.error(err));
  }

  componentDidMount() {
    const populerUsername = this.props.route.params.populer?.username;
    const rekomendasiUsername = this.props.route.params.rekomendasi?.username;
    const username = populerUsername || rekomendasiUsername;
    this.getData(username);
  }

  render() {
    console.log(this.state.detailUser);
    const { route } = this.props;
    const data = {
      populer: route.params && route.params.populer ? route.params.populer : {},
      rekomendasi:
        route.params && route.params.rekomendasi
          ? route.params.rekomendasi
          : {},
    };
    return (
      <Box flex={1} bg="#FFFFFF" height="100px" safeArea={true}>
        <Header title="Profil Influencer" backButton={true} />
        <ScrollView p={"15px"}>
          <Box weight={"100%"} py="15px" px={"5px"}>
            <HStack>
              <Avatar
                w={"100px"}
                h={"100px"}
                borderWidth="2"
                borderColor="#C689B0"
                source={{
                  uri: this.state.detailUser.profile_pic_url_hd,
                }}
              ></Avatar>
              <VStack px={"10px"} py={"3%"}>
                <Text color="#bf7cbf" fontSize={"20px"} fontStyle="normal">
                  {this.state.detailUser.full_name}
                </Text>
                <Text
                  fontStyle="normal"
                  fontSize={"12px"}
                  color="#bf7cbf"
                  pb={"5px"}
                >
                  {this.state.detailUser.category_name}
                </Text>
                <HStack>
                  <Ionicons name="person-sharp" size={18} color="#bf7cbf" />
                  {data.populer.followers ? (
                    <Text
                      fontStyle="normal"
                      fontSize={"14px"}
                      color="#bf7cbf"
                      px={"5px"}
                    >
                      {data.populer.followers}
                    </Text>
                  ) : null}
                  {data.rekomendasi.followers ? (
                    <Text
                      fontStyle="normal"
                      fontSize={"14px"}
                      color="#bf7cbf"
                      px={"5px"}
                    >
                      {data.rekomendasi.followers}
                    </Text>
                  ) : null}

                  <Ionicons name="heart" size={19} color="#bf7cbf" />
                  {data.populer.countlike ? (
                    <Text
                      fontStyle="normal"
                      fontSize={"14px"}
                      color="#bf7cbf"
                      px={"5px"}
                    >
                      {data.populer.countlike}
                    </Text>
                  ) : null}
                  {data.rekomendasi.countlike ? (
                    <Text
                      fontStyle="normal"
                      fontSize={"14px"}
                      color="#bf7cbf"
                      px={"5px"}
                    >
                      {data.rekomendasi.countlike}
                    </Text>
                  ) : null}

                  <Ionicons name="grid-outline" size={17} color="#bf7cbf" />
                  {data.populer.countpost ? (
                    <Text
                      fontStyle="normal"
                      fontSize={"14px"}
                      color="#bf7cbf"
                      px={"5px"}
                    >
                      {data.populer.countpost}
                    </Text>
                  ) : null}
                  {data.rekomendasi.countpost ? (
                    <Text
                      fontStyle="normal"
                      fontSize={"14px"}
                      color="#bf7cbf"
                      px={"5px"}
                    >
                      {data.rekomendasi.countpost}
                    </Text>
                  ) : null}
                </HStack>
              </VStack>
            </HStack>
            <Text
              fontStyle="normal"
              fontSize={"12px"}
              color="#bf7cbf"
              pb={"5px"}
              py="15px"
              px={"9px"}
            >
              {this.state.detailUser.bio}
            </Text>
          </Box>
          <Separator height={"2"} />
          <Box
            w={"95%"}
            h={"185px"}
            borderRadius="15"
            bg="#E8D0E8"
            alignSelf="center"
            alignItem="center"
            p={"17px"}
            shadow="1"
          >
            <Text
              fontStyle="normal"
              fontSize={"14px"}
              color="#C689C6"
              textAlign="center"
              fontWeight={"bold"}
            >
              Informasi Kontak
            </Text>
            <Separator height={"2"} />
            <VStack>
              <Pressable onPress={this.handleOpenEmail}>
                <HStack p={"5px"}>
                  <Ionicons name="ios-mail" size={24} color="#C689C6" />
                  {data.populer.email ? (
                    <Text
                      fontStyle="normal"
                      fontSize={"12px"}
                      color="#C689C6"
                      px={"10px"}
                      py={"5px"}
                    >
                      {data.populer.email}
                    </Text>
                  ) : null}
                  {data.rekomendasi.email ? (
                    <Text
                      fontStyle="normal"
                      fontSize={"12px"}
                      color="#C689C6"
                      px={"10px"}
                      py={"5px"}
                    >
                      {data.rekomendasi.email}
                    </Text>
                  ) : null}
                </HStack>
              </Pressable>
              <Pressable onPress={this.handleOpenPhone}>
                <HStack p={"5px"}>
                  <Ionicons
                    name="ios-phone-portrait-outline"
                    size={24}
                    color="#C689C6"
                  />
                  {data.populer.nomertelpon ? (
                    <Text
                      fontStyle="normal"
                      fontSize={"12px"}
                      color="#C689C6"
                      px={"10px"}
                      py={"5px"}
                    >
                      {data.populer.nomertelpon}
                    </Text>
                  ) : null}
                  {data.rekomendasi.nomertelpon ? (
                    <Text
                      fontStyle="normal"
                      fontSize={"12px"}
                      color="#C689C6"
                      px={"10px"}
                      py={"5px"}
                    >
                      {data.rekomendasi.nomertelpon}
                    </Text>
                  ) : null}
                </HStack>
              </Pressable>
              <HStack p={"5px"}>
                <Ionicons name="md-location-sharp" size={24} color="#C689C6" />
                {data.populer.lokasi? (
                  <Text
                    fontStyle="normal"
                    fontSize={"12px"}
                    color="#C689C6"
                    px={"10px"}
                    py={"5px"}
                  >
                    {data.populer.lokasi}
                  </Text>
                ) : null}
                {data.rekomendasi.lokasi ? (
                  <Text
                    fontStyle="normal"
                    fontSize={"12px"}
                    color="#C689C6"
                    px={"10px"}
                    py={"5px"}
                  >
                    {data.rekomendasi.lokasi}
                  </Text>
                ) : null}
              </HStack>
            </VStack>
          </Box>
          <Separator height={"8"} />
          <Pressable
            w="180px"
            h="38px"
            p={"9px"}
            borderRadius="70"
            bg="#C689C6"
            alignItems="center"
            alignSelf="center"
            onPress={this.handleOpenInstagram}
          >
            <Text
              justifyContent="center"
              textAlign="center"
              fontStyle="normal"
              fontSize={"14px"}
              color="#ffffff"
            >
              Buka Akun
            </Text>
          </Pressable>
        </ScrollView>
      </Box>
    );
  }
}

export default ProfilInfluencer;
