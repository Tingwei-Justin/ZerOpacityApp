import React from "react";
import Link from "next/link";
import {
  List,
  ListItem,
  ListIcon,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Text,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

function TransactionList({ payments, publicKey }) {
  console.log(payments);
  return (
    <List>
      {payments.map((value, index) => {
        if (value.type === "payment") {
          return (
            <ListItem
              key={value.id}
              height={24}
              d="flex"
              alignItems="center"
              border="solid 1px"
              borderColor="#4B0082"
              rounded="lg"
              bg="#E6E6FA"
              px="5"
              my="1"
            >
              <Stat>
                <Tag
                  size="lg"
                  variant="subtle"
                  colorScheme={publicKey === value.to ? "green" : "red"}
                >
                  <TagLeftIcon
                    boxSize="12px"
                    as={publicKey === value.to ? AddIcon : MinusIcon}
                  />
                  <TagLabel>
                    <StatNumber>{value.amount}</StatNumber>
                  </TagLabel>
                </Tag>
                <StatHelpText>{value.created_at}</StatHelpText>
                <Link
                  href={`https://stellar.expert/explorer/testnet/tx/${value.transaction_hash}`}
                >
                  View detail
                </Link>
              </Stat>
              <Box>
                <Text>
                  From: {value.from.substr(0, 4)}...{value.from.slice(-4)}
                </Text>
                <Text>
                  To: {value.to.substr(0, 4)}...{value.to.slice(-4)}
                </Text>
              </Box>
            </ListItem>
          );
        }
      })}
    </List>
  );
}

export default TransactionList;
