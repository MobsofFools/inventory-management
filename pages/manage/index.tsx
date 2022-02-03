import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import { DisplayItem } from "../../common/types";
import { getItems } from "../../db/calls";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  Input,
  TableCaption,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
const ListItems: NextPage = () => {
  const [itemArray, setItemArray] = useState<DisplayItem[]>();
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const itemsPerPage = 9;
  const router = useRouter();
  const incrementPage = () => {
    if (page < numPages) {
      setPage(page + 1);
    }
  };
  const decrementPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const goToFirstPage = () => {
    setPage(1);
  };
  const goToLastPage = () => {
    setPage(numPages);
  };
  const pushToItem = (id:string|undefined) => {
    const pathname = router.pathname;
    if(id && id.length>1)
    {
      router.push(`${pathname}/${id}`);
    }
  };
  useEffect(() => {
    const arrayLength = itemArray?.length;
    if (arrayLength) {
      if (arrayLength < itemsPerPage) {
        setNumPages(1);
      } else {
        var num = Math.ceil(arrayLength / itemsPerPage);
        setNumPages(num);
      }
    }
  }, [itemArray]);
  useEffect(() => {
    getItems().then((data) => setItemArray(data));
  }, []);

  useEffect(() => {
    console.log(itemArray);
  }, [itemArray]);
  const displayData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return itemArray?.slice(start, start + itemsPerPage);
  }, [itemArray, page]);
  return (
    <Box border={"1px solid black"} borderRadius={16} bg="white">
      <Head>
        <title>Item List</title>
      </Head>
      <Table variant="simple">
        <TableCaption>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <IconButton
              variant={"ghost"}
              size="xs"
              aria-label="Edit Item"
              icon={<ArrowLeftIcon />}
              onClick={goToFirstPage}
            />
            <IconButton
              variant={"ghost"}
              size="xs"
              aria-label="Edit Item"
              icon={<ChevronLeftIcon />}
              onClick={decrementPage}
            />
            Page {page} of {numPages}
            <IconButton
              variant={"ghost"}
              size="xs"
              aria-label="Edit Item"
              icon={<ChevronRightIcon />}
              onClick={incrementPage}
            />
            <IconButton
              variant={"ghost"}
              size="xs"
              aria-label="Edit Item"
              icon={<ArrowRightIcon />}
              onClick={goToLastPage}
            />
          </div>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Description</Th>
            <Th>Functions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayData?.map((item) => {
            return (
              <Tr key={item.id}>
                <Td>{item.itemname}</Td>
                <Td>{item.price}</Td>
                <Td>{item.description}</Td>
                <Td>
                  <IconButton aria-label="Edit Item" icon={<EditIcon />} onClick={()=>pushToItem(item.id)}/>
                  
                  <IconButton
                    marginLeft={2}
                    aria-label="Delete Item"
                    icon={<DeleteIcon />}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
export default ListItems;
