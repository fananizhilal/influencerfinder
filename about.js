import React from "react";
import {
  Text,
  VStack,
  HStack,
  ScrollView,
  Image,
  Box,
  Divider,
} from "native-base";
import { Header } from "../components";
import { Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const About = () => {
  return (
    <Box flex={1} bg="#fff" safeArea={true}>
      <Header title="About App" />
      <ScrollView p={"15px"}>
        <Image
          source={require("../assets/InfluencerFinder.png")}
          w={"160px"}
          h={"145px"}
          alignSelf="center"
          alignItems="center"
          alt="Avatar"        />
        <Text
          fontStyle="normal"
          fontSize={"12px"}
          color="#bf7cbf"
          textAlign="center"
        >
          Influencer Finder 1.0
        </Text>
        <Box py="10px">
          <VStack>
            <VStack p={"17px"}>
              <Text
                fontStyle="normal"
                fontSize={"13px"}
                color="#bf7cbf"
                fontWeight={"bold"}
              >
                Tentang Aplikasi
              </Text>
              <Text fontStyle="normal" fontSize={"13px"} color="#bf7cbf">
                Influencer Finder adalah aplikasi yang dapat membantu pelaku
                UMKM mencari influencer untuk mempromosikan produk mereka.
                Aplikasi ini menggunakan informasi dari Instagram dan API untuk
                membuat profil influencer terkini.
              </Text>
            </VStack>
            <Divider my={"0"} />
            <VStack p={"17px"}>
              <Text
                fontStyle="normal"
                fontSize={"13px"}
                color="#bf7cbf"
                fontWeight={"bold"}
              >
                Referensi API
              </Text>
              <Text
                fontStyle="normal"
                fontSize={"13px"}
                color="#bf7cbf"
                onPress={() =>
                  Linking.openURL(
                    "https://raw.githubusercontent.com/fananizhilal/APIstatic-influencer/main/influencerr.json"
                  )
                }
              >
                Endpoint API yang digunakan pada aplikasi ini diantaranya
                sebagai berikut.
                {"\n"}
                <Ionicons name="star" size={14} color="#bf7cbf" />{" "}
                https://raw.githubusercontent.com/fananizhilal/APIstatic-influencer/main/influencerr.json
              </Text>
              <Text fontStyle="normal" fontSize={"13px"} color="#bf7cbf">
                <Ionicons name="star" size={14} color="#bf7cbf" />{" "}
                https://instagram-profile1.p.rapidapi.com/getpr
                ofile/%7Busername%7D
              </Text>
            </VStack>
            <Divider my={0} />
            <VStack p={"17px"}>
              <Text
                fontStyle="normal"
                fontSize={"13px"}
                color="#bf7cbf"
                fontWeight={"bold"}
              >
                Tim Pengembang
              </Text>
              <HStack space={2} px={"1px"} pt={"5px"}>
                <Box width={"45%"}>
                  <Text fontStyle="normal" fontSize={"13px"} color="#bf7cbf">
                    <Ionicons name="star" size={14} color="#bf7cbf" />
                    {"  "}
                    Siwi Wiratna P.
                  </Text>
                  <Text fontStyle="normal" fontSize={"13px"} color="#bf7cbf">
                    <Ionicons name="star" size={14} color="#bf7cbf" />
                    {"  "}
                    Ahmad Zhilal F.
                  </Text>
                  <Text fontStyle="normal" fontSize={"13px"} color="#bf7cbf">
                    <Ionicons name="star" size={14} color="#bf7cbf" />
                    {"  "}
                    Luthfiah Syahfitri
                  </Text>
                </Box>
                <Box width={"45%"}>
                  <Text fontStyle="normal" fontSize={"13px"} color="#bf7cbf">
                    <Ionicons name="star" size={14} color="#bf7cbf" />
                    {"  "}
                    Vania Martha A. L.
                  </Text>
                  <Text fontStyle="normal" fontSize={"13px"} color="#bf7cbf">
                    <Ionicons name="star" size={14} color="#bf7cbf" />
                    {"  "}
                    Rifdah Alifia
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default About;
