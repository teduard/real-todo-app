import React, { useState, useEffect } from "react";
import FetchService from "../../services/fetchservice";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Container,
  Typography,
  TextareaAutosize,
  Hidden,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Trash as TrashIcon } from "react-feather";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

//class TodoList extends React.Component<{},IMyComponentState> {
function TodoList() {
  const [newItem, setNewItem] = React.useState("");
  const [newItemDescription, setNewItemDescription] = React.useState("");
  const [items, setItems] = React.useState<string[]>([]);
  const [initialFetch, setInitialFetch] = React.useState<Boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    if (initialFetch === false) {
      fetchItems();
      setInitialFetch(true);
    }
  });

  function fetchItems() {
    FetchService.fetchAuth("/items/all", (data: any) => {
      setItems(data);

      var newChecked: number[] = [];
      data.map((value: any) => {
        if (value.status === "Completed") {
          newChecked.push(value.id);
        }
      });

      setChecked(newChecked);
    });
  }

  function handleChange(event: any) {}

  function handleAddItemChange(event: any) {
    const payload = {
      newItem: newItem,
    };
    FetchService.postAuth("/items/add", payload, (res: any) => {
      fetchItems();
    });
    setNewItem("");
  }

  function handleNewItemChange(event: any) {
    setNewItem(event.target.value);
  }
  function handleNewItemDescriptionChange(event: any) {
    setNewItemDescription(event.target.value);
  }

  function deleteItem(itemId: number) {
    FetchService.postAuth("/items/delete", { id: itemId }, (res: any) => {
      fetchItems();
    });
  }

  function handleFormSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
  }

  const [checked, setChecked] = React.useState([0]);
  const [descriptionChange, setDescriptionChange] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      //disable item
      FetchService.postAuth(
        "/items/updateStatus",
        { id: value, status: "Completed" },
        (res: any) => {
          fetchItems();
        }
      );
    } else {
      newChecked.splice(currentIndex, 1);
      //enable item
      FetchService.postAuth(
        "/items/updateStatus",
        { id: value, status: "Active" },
        (res: any) => {
          fetchItems();
        }
      );
    }

    setChecked(newChecked);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadPDF = () => {
    setAnchorEl(null);
  };

  const handleDownloadJSON = () => {
    setAnchorEl(null);
  };

  const todoList = (
    <List>
      {items.map((value: any) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem key={value.id} role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value.id) !== -1}
                tabIndex={-1}
                disableRipple
                onClick={handleToggle(value.id)}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>

            <Grid container>
              <Grid item xs={12}>
                <ListItemText id={labelId} primary={value.todo} />
                <TextField
                  id="filled-multiline-static"
                  label="Todo: Description"
                  multiline
                  rows={3}
                  fullWidth
                  variant="filled"
                  value={value.description}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>

            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => deleteItem(value.id)}
              >
                <TrashIcon size="16px" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "100%",
            py: 3,
          }}
        >
          <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
            <Card>
              <CardHeader
                title="Todos"
                action={
                  <>
                    <IconButton
                      aria-label="settings"
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleDownloadPDF}>
                        Todo: Download as PDF
                      </MenuItem>
                      <MenuItem onClick={handleDownloadJSON}>
                        Todo: Download as JSON
                      </MenuItem>
                    </Menu>
                  </>
                }
              />

              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={9}>
                    <TextField
                      name="newItem"
                      fullWidth
                      margin="dense"
                      label="New item"
                      onChange={handleNewItemChange}
                      value={newItem}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Button
                      className={classes.margin}
                      fullWidth
                      size="medium"
                      color="primary"
                      variant="contained"
                      onClick={handleAddItemChange}
                    >
                      Add
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    {todoList}
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                }}
              >
                <Typography>Total: {items.length}</Typography>
              </Box>
            </Card>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default TodoList;
