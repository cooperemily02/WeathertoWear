import React, { useEffect, useState } from "react";
import {
  Collapse,
  Alert,
  IconButton,
  Paper,
  Stack,
  Typography,
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import ClothingItem from "../component/ClothingItem";
import Select from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DryCleaning as DryCleaningIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const Laundry = (props) => {
  const userId = props.user.userId;
  const [itemTypeToShow, setItemTypeToShow] = useState("All");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [severity, setSeverity] = useState(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (event) => {
    setItemTypeToShow(event.value);
  };
  const sortClothingItems = (items) => {
    const sortedItems = {
      Tops: [],
      Bottoms: [],
      Shoes: [],
      Outerwear: [],
      Other: [],
      All: [],
    };
    items.forEach((item) => {
      if (item.tags.includes("top")) {
        sortedItems.Tops.push(item);
      } else if (item.tags.includes("bottom")) {
        sortedItems.Bottoms.push(item);
      } else if (item.tags.includes("shoes")) {
        sortedItems.Shoes.push(item);
      } else if (item.tags.includes("outerwear")) {
        sortedItems.Outerwear.push(item);
      } else {
        sortedItems.Other.push(item);
      }
    });
    sortedItems.All = items;
    setSortedClothingItems(sortedItems);
  };
  const [sortedClothingItems, setSortedClothingItems] = useState({
    Tops: [],
    Bottoms: [],
    Shoes: [],
    Outerwear: [],
    Other: [],
    All: [],
  });
  const fetchLaundryItems = async () => {
    try {
      const response = await fetch("/dummy/Laundry", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          user: userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      sortClothingItems(json);
    } catch (error) {
      console.log("error", error);
    }
  };
  const washLaundry = async () => {
    try {
      const response = await fetch("/dummy/washLaundry", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          user: userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      setSortedClothingItems({
        Tops: [],
        Bottoms: [],
        Shoes: [],
        Outerwear: [],
        Other: [],
        All: [],
      });
      setSeverity("success");
      setOpenAlert(true);
    } catch (error) {
      setSeverity("error");
      setOpenAlert(true);
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (userId === -1) {
      navigate("/");
    } else {
      fetchLaundryItems();
    }
  }, [userId, itemTypeToShow, location]);
  return (
    <>
      <Collapse in={openAlert}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {severity == "success"
            ? "Your Laundry Is Washed and Ready!"
            : "Couldn't wash laundry. Try again later."}
        </Alert>
      </Collapse>
      <Typography
        variant="h2"
        textAlign={"center"}
        sx={{ color: "black", fontFamily: "Caudex", pt: 35, paddingTop: "5px" }}
      >
        {" "}
        User {props.userId}'s Laundry Bin{" "}
      </Typography>
      <Paper
        elevation={6}
        style={{
          backgroundColor: "#f5f5f5",
          margin: "5px",
          width: "75%",
          display: "block",
          marginInline: "auto",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingBottom: "5%",
          paddingInline: "10%",
        }}
      >
        <Button
          startIcon={<DryCleaningIcon />}
          onClick={washLaundry}
          sx={{ color: "blue", justifyContent: "center", margin: "5%" }}
        >
          Do Laundry (send all items to closet)
        </Button>
        <Box
          sx={{
            flexGrow: 1,
            marginTop: "5%",
          }}
        >
          <div style={{ padding: "5px" }}>
            <Typography
              variant="h4"
              textAlign={"center"}
              sx={{
                color: "black",
                fontFamily: "Caudex",
                pt: 35,
                paddingTop: "8px",
              }}
            >
              {" "}
              <b>{itemTypeToShow}</b>{" "}
            </Typography>
            <hr style={{ marginInline: "20%", padding: "5px" }} />
            <div
              style={{
                width: "50%",
                margin: "auto",
                padding: "5%",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Select
                closeMenuOnSelect={true}
                onChange={handleChange}
                placeholder={"Select Laundry Type"}
                options={[
                  { value: "Tops", label: "Tops" },
                  { value: "Bottoms", label: "Bottoms" },
                  { value: "Shoes", label: "Shoes" },
                  { value: "Outerwear", label: "Outerwear" },
                  { value: "Other", label: "Other" },
                  { value: "All", label: "All" },
                ]}
              ></Select>
            </div>
            <Grid container justifyContent="center" spacing={5}>
              {sortedClothingItems[itemTypeToShow].map((item) => (
                <Grid item xs={2} sm={4} md={4}>
                  <ClothingItem
                    item={item}
                    parent={{
                      type: "laundry",
                      updateFunction: fetchLaundryItems,
                    }}
                    userId={userId}
                  ></ClothingItem>
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>
      </Paper>
    </>
  );
};
export default Laundry;
